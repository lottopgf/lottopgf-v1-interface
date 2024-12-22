import { Address } from 'viem'
import { useChainId } from 'wagmi'
import { ErrorBoundary } from 'react-error-boundary'
import { SeedJackpot } from '@/components/SeedJackpot'
import { Kill } from '@/components/Kill'
import { WithdrawAccruedFees } from '@/components/WithdrawAccruedFees'
import { useLootery } from '@/hooks/useLootery'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangleIcon } from 'lucide-react'

export function Admin({ chainId, contractAddress }: { chainId: number; contractAddress: Address }) {
    const currentChainId = useChainId()
    const {
        data: { isConnectedAccountOwner },
    } = useLootery(contractAddress)

    if (currentChainId !== chainId) {
        return <div>Switch to the correct chain ({chainId}) to view tickets</div>
    }

    return (
        <div className="mb-4 space-y-14">
            <h1 className="text-4xl font-normal mt-16">Operator Functions</h1>

            {!isConnectedAccountOwner && (
                <Alert className="bg-red-500 text-white">
                    <AlertTriangleIcon className="h-4 w-4 stroke-white" />
                    <div />
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex-1">
                            <AlertTitle>You are not the operator of this lottery</AlertTitle>
                            <AlertDescription className="space-y-2">
                                You will not be able to perform operator-only functions.
                            </AlertDescription>
                        </div>
                    </div>
                </Alert>
            )}

            <div className="mt-16 space-y-4">
                <h2 className="text-2xl">Seed jackpot</h2>
                <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
                    <SeedJackpot contractAddress={contractAddress} />
                </ErrorBoundary>
            </div>
            <div className="mt-16 space-y-4">
                <h2 className="text-2xl">Kill lottery/activate redistribution mode</h2>
                <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
                    <Kill contractAddress={contractAddress} />
                </ErrorBoundary>
            </div>
            <div className="mt-16 space-y-4">
                <h2 className="text-2xl">Withdraw accrued fees</h2>
                <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
                    <WithdrawAccruedFees contractAddress={contractAddress} />
                </ErrorBoundary>
            </div>
        </div>
    )
}
