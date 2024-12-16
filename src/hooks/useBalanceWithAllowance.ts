import { extractErrorMessages, handleTransactionError } from '@/lib/error'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { erc20Abi, type Address } from 'viem'
import {
    useBalance,
    useChainId,
    usePublicClient,
    useReadContracts,
    useWaitForTransactionReceipt,
    useWriteContract,
} from 'wagmi'
import { useGameConfig } from './useGameConfig'
import { getChain } from '@/lib/wagmi'

export function useBalanceWithAllowance({
    contractAddress,
    address,
    token,
    onAllowanceUpdated,
}: {
    contractAddress: Address
    address?: Address
    token?: Address
    onAllowanceUpdated?: () => void
}) {
    const { isPrizeTokenNative } = useGameConfig(contractAddress)
    const client = usePublicClient()
    const chainId = useChainId()
    const chain = getChain(chainId)
    const { data: tokenBalanceData, refetch } = useReadContracts({
        allowFailure: false,
        contracts: [
            {
                abi: erc20Abi,
                address: token,
                functionName: 'balanceOf',
                args: [address!],
            },
            {
                abi: erc20Abi,
                address: token,
                functionName: 'allowance',
                args: [address!, contractAddress],
            },
        ],
        query: { enabled: !isPrizeTokenNative && !!address },
    })

    const { writeContractAsync } = useWriteContract()

    const {
        data: hash,
        isPending,
        mutateAsync: increaseAllowance,
    } = useMutation({
        async mutationFn({ amount }: { amount: bigint }) {
            if (!address || !token) return

            try {
                const hash = await writeContractAsync({
                    chain,
                    type: 'eip1559',
                    abi: erc20Abi,
                    address: token,
                    functionName: 'approve',
                    args: [contractAddress, amount],
                })

                toast.promise(async () => client?.waitForTransactionReceipt({ hash }), {
                    loading: 'Waiting for confirmation…',
                    action: {
                        label: 'Explorer',
                        onClick(e) {
                            e.preventDefault()
                            window.open(`${chain?.blockExplorers.default.url}/tx/${hash}`, '_blank')
                        },
                    },
                    success: 'Allowance updated successfully',
                    error(error) {
                        const { message } = extractErrorMessages(error)
                        return message
                    },
                    finally() {
                        refetch()
                        onAllowanceUpdated?.()
                    },
                })

                return hash
            } catch (error) {
                handleTransactionError(error)
            }
        },
    })

    const { isFetching: isWaitingForConfirmation } = useWaitForTransactionReceipt({
        hash,
    })

    const { data: nativeBalanceData } = useBalance({ address })

    const [tokenBalance, allowance] = tokenBalanceData ?? []

    const balance = (isPrizeTokenNative ? nativeBalanceData?.value : tokenBalance) ?? 0n

    return {
        balance,
        allowance,
        increaseAllowance,
        isPendingAllowance: isPending || isWaitingForConfirmation,
        refetch,
    }
}
