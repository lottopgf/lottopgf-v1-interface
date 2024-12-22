import { LOOTERY_ABI } from '@/abi/Lootery'
import { LOOTERY_ETH_ADAPTER_ABI } from '@/abi/LooteryETHAdapter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { looteryEthAdapterAddress } from '@/config'
import { useBalanceWithAllowance } from '@/hooks/useBalanceWithAllowance'
import { useERC20 } from '@/hooks/useERC20'
import { useGameConfig } from '@/hooks/useGameConfig'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'
import { Address, formatUnits } from 'viem'
import { useAccount, useBalance, useChainId, useReadContracts, useWriteContract } from 'wagmi'
import { formatDistance } from 'date-fns'
import { ErrorBoundary } from 'react-error-boundary'

function SeedJackpot({ contractAddress }: { contractAddress: Address }) {
    const chainId = useChainId()
    const [amount, setAmount] = useState<bigint>(0n)
    const { address } = useAccount()

    const { prizeToken, isPrizeTokenNative } = useGameConfig(contractAddress)
    const { balance, allowance, increaseAllowance, isPendingAllowance } = useBalanceWithAllowance({
        contractAddress,
        address,
        token: prizeToken,
    })
    const { decimals, symbol } = useERC20(prizeToken)

    // Either:
    //  1. The token has allowance approved already; or
    //  2. It's using the native token, so we don't need to approve
    const isApproved = (allowance && allowance >= amount) || isPrizeTokenNative

    const { data: _jackpotData } = useReadContracts({
        contracts: [
            {
                abi: LOOTERY_ABI,
                address: contractAddress,
                functionName: 'jackpotLastSeededAt',
            },
            {
                abi: LOOTERY_ABI,
                address: contractAddress,
                functionName: 'seedJackpotDelay',
            },
            {
                abi: LOOTERY_ABI,
                address: contractAddress,
                functionName: 'seedJackpotMinValue',
            },
        ],
    })
    const jackpotLastSeededAt = _jackpotData?.[0].result
    const seedJackpotDelay = _jackpotData?.[1].result
    const seedJackpotMinValue = _jackpotData?.[2].result
    const now = BigInt(Math.floor(Date.now() / 1000))
    const nextSeedTime = (jackpotLastSeededAt || 0n) + (seedJackpotDelay || 0n)
    const timeLeft = nextSeedTime - now
    const isRateLimited = timeLeft ? timeLeft > 0n : true
    const isMinValueMet = seedJackpotMinValue ? amount >= seedJackpotMinValue : false

    const ethAdapterAddress = looteryEthAdapterAddress[chainId]

    const { writeContractAsync: _seedJackpot, status: seedJackpotStatus } = useWriteContract()
    const seedJackpot = async () => {
        // Either:
        //  1. It's a native token; in which case we just use the ETHAdapter
        if (isPrizeTokenNative) {
            if (!ethAdapterAddress) {
                throw new Error(`ETH adapter not found for chain ${chainId}`)
            }
            await _seedJackpot({
                abi: LOOTERY_ETH_ADAPTER_ABI,
                address: ethAdapterAddress,
                functionName: 'seedJackpot',
                args: [contractAddress],
                value: amount,
            })
        } else {
            //  2. It's a ERC20 token; in which case we call seedJackpot(uint256) directly
            await _seedJackpot({
                abi: LOOTERY_ABI,
                address: contractAddress,
                functionName: 'seedJackpot',
                args: [amount],
            })
        }
    }

    const { data: nativeBalance } = useBalance({
        address,
    })
    const hasEnoughBalance = isPrizeTokenNative
        ? Boolean(nativeBalance && nativeBalance.value >= amount)
        : Boolean(balance && balance >= amount)

    return (
        <div className="mt-4 space-y-4">
            <div>
                <div>
                    {timeLeft && timeLeft > 0n
                        ? `You can seed the jackpot again in  ${formatDistance(Date.now() + Number(timeLeft) * 1000, Date.now())}.`
                        : ''}{' '}
                    The minimum amount you can seed at a time is{' '}
                    {decimals && seedJackpotMinValue && formatUnits(seedJackpotMinValue, decimals)}{' '}
                    {symbol}.
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="seed-jackpot-amount" className="text-sm font-medium">
                    Amount
                </Label>
                <Input
                    id="seed-jackpot-amount"
                    type="text"
                    value={amount.toString()}
                    onChange={(e) => {
                        try {
                            setAmount(BigInt(e.target.value))
                        } catch (error) {
                            //
                        }
                    }}
                />
                <div className="text-sm text-muted-foreground">
                    {decimals && formatUnits(amount, decimals)} {symbol}
                </div>
            </div>
            {isApproved || seedJackpotStatus === 'success' ? (
                <Button
                    disabled={
                        !seedJackpot ||
                        seedJackpotStatus !== 'idle' ||
                        isRateLimited ||
                        !hasEnoughBalance ||
                        !isMinValueMet
                    }
                    onClick={seedJackpot}
                >
                    {seedJackpotStatus === 'pending' && (
                        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Seed
                </Button>
            ) : (
                <Button
                    disabled={
                        isPendingAllowance || isRateLimited || !hasEnoughBalance || !isMinValueMet
                    }
                    onClick={() => increaseAllowance({ amount })}
                >
                    {isPendingAllowance && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                    Approve
                </Button>
            )}
        </div>
    )
}

export function Admin({ chainId, address }: { chainId: number; address: Address }) {
    const currentChainId = useChainId()

    if (currentChainId !== chainId) {
        return <div>Switch to the correct chain ({chainId}) to view tickets</div>
    }

    return (
        <div className="mb-4 space-y-14">
            <h1 className="text-4xl font-normal mt-16">Operator Functions</h1>
            <div className="mt-16">
                <h2 className="text-2xl">Seed jackpot</h2>
                <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
                    <SeedJackpot contractAddress={address} />
                </ErrorBoundary>
            </div>
        </div>
    )
}
