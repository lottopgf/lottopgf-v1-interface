import { useWatchContractEvent } from 'wagmi'
import { useWriteContract } from 'wagmi'
import { LOOTERY_ABI } from '@/abi/Lootery'
import { Address } from 'viem'
import { useSimulateContract } from 'wagmi'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { Loader2Icon } from 'lucide-react'
import { useLootery } from '@/hooks/useLootery'

export function Kill({ contractAddress }: { contractAddress: Address }) {
    const killConfig = {
        abi: LOOTERY_ABI,
        address: contractAddress,
        functionName: 'kill',
    } as const

    const {
        data: { isConnectedAccountOwner },
    } = useLootery(contractAddress)

    const { status: simulationSuccess } = useSimulateContract(killConfig)

    const { writeContractAsync: _kill, status: killStatus } = useWriteContract()
    const kill = async () => {
        await _kill(killConfig)
    }

    useWatchContractEvent({
        address: contractAddress,
        abi: LOOTERY_ABI,
        eventName: 'ApocalypseModeActivated',
        onLogs: (logs) => {
            if (logs.find((log) => log.eventName === 'ApocalypseModeActivated')) {
                toast.success('Redistribution mode activated')
            }
        },
    })

    return (
        <div className="space-y-4">
            <div>
                End the lottery after the current game ends and activate redistribution mode. When
                redistribution mode is activated, the jackpot will be distributed equally between
                all tickets ever bought if there are no winners.
            </div>
            <Button
                disabled={
                    simulationSuccess !== 'success' ||
                    !kill ||
                    killStatus !== 'idle' ||
                    !isConnectedAccountOwner
                }
                onClick={kill}
            >
                {(simulationSuccess === 'pending' || killStatus === 'pending') && (
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Kill
            </Button>
        </div>
    )
}
