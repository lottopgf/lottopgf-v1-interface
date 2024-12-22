import { LOOTERY_ABI } from '@/abi/Lootery'
import { Button } from '@/components/ui/button'
import { useERC20 } from '@/hooks/useERC20'
import { useGameConfig } from '@/hooks/useGameConfig'
import { Address, formatUnits } from 'viem'
import { useReadContract, useWatchContractEvent, useWriteContract } from 'wagmi'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'

export function WithdrawAccruedFees({ contractAddress }: { contractAddress: Address }) {
    const { prizeToken } = useGameConfig(contractAddress)
    const { decimals, symbol } = useERC20(prizeToken)

    const { data: accruedFees } = useReadContract({
        abi: LOOTERY_ABI,
        address: contractAddress,
        functionName: 'accruedCommunityFees',
    })

    const { writeContractAsync: _withdrawAccruedFees, status: withdrawAccruedFeesStatus } =
        useWriteContract()
    const withdrawAccruedFees = async () => {
        await _withdrawAccruedFees({
            abi: LOOTERY_ABI,
            address: contractAddress,
            functionName: 'withdrawAccruedFees',
        })
    }

    useWatchContractEvent({
        address: contractAddress,
        abi: LOOTERY_ABI,
        eventName: 'AccruedCommunityFeesWithdrawn',
        onLogs: (logs) => {
            if (logs.find((log) => log.eventName === 'AccruedCommunityFeesWithdrawn')) {
                toast.success('Completed withdrawal of accrued fees')
            }
        },
    })

    return (
        <div className="space-y-4">
            <div>
                <div>Withdraw funds accrued from ticket sales.</div>
                <div>
                    Currently accrued fees: {formatUnits(accruedFees || 0n, decimals || 0)} {symbol}
                </div>
            </div>
            <Button
                disabled={!withdrawAccruedFees || withdrawAccruedFeesStatus !== 'idle'}
                onClick={withdrawAccruedFees}
            >
                {withdrawAccruedFeesStatus === 'pending' && (
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Withdraw
            </Button>
        </div>
    )
}
