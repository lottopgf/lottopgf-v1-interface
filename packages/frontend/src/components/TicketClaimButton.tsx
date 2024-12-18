import { LOOTERY_ABI } from '@/abi/Lootery'
import { Button } from '@/components/ui/button'
import { extractErrorMessages, handleTransactionError } from '@/lib/error'
import { getChain } from '@/lib/wagmi'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { Address, ContractFunctionExecutionError } from 'viem'
import {
    useChainId,
    usePublicClient,
    useSimulateContract,
    useWaitForTransactionReceipt,
    useWriteContract,
} from 'wagmi'

export function TicketClaimButton({
    contractAddress,
    tokenId,
    onClaim,
}: {
    contractAddress: Address
    tokenId: bigint
    onClaim?: () => void
}) {
    const client = usePublicClient()
    const chainId = useChainId()
    const chain = getChain(chainId)

    const {
        data,
        error,
        isError,
        isPending: isSimulating,
    } = useSimulateContract({
        chainId,
        abi: LOOTERY_ABI,
        address: contractAddress,
        functionName: 'claimWinnings',
        args: [tokenId],
    })

    const { writeContractAsync, data: hash, isPending } = useWriteContract()

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })

    const isLoading = isPending || isConfirming

    const hasBeenClaimed =
        error instanceof ContractFunctionExecutionError && error.message.includes('AlreadyClaimed')

    async function handleClaim() {
        if (!data?.request) return

        try {
            const hash = await writeContractAsync(data?.request)

            toast.promise(async () => client?.waitForTransactionReceipt({ hash }), {
                loading: 'Waiting for confirmation…',
                action: {
                    label: 'Explorer',
                    onClick(e) {
                        e.preventDefault()
                        window.open(`${chain?.blockExplorers.default.url}/tx/${hash}`, '_blank')
                    },
                },
                success: 'Prize has been claimed!',
                error(error) {
                    const { message } = extractErrorMessages(error)
                    return message
                },
                finally: () => onClaim?.(),
            })
        } catch (error) {
            handleTransactionError(error)
        }
    }

    if (hasBeenClaimed) {
        return <p className="py-3.5 text-sm text-muted-foreground">Claimed already</p>
    }

    return (
        <Button
            size="lg"
            className="w-full"
            onClick={handleClaim}
            disabled={isSimulating || isLoading || isConfirmed || isError}
        >
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            Claim
        </Button>
    )
}
