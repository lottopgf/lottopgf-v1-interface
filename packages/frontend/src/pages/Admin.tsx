import { Address } from 'viem'
import { useChainId } from 'wagmi'
import { ErrorBoundary } from 'react-error-boundary'
import { SeedJackpot } from '@/components/SeedJackpot'
import { Kill } from '@/components/Kill'
import { WithdrawAccruedFees } from '@/components/WithdrawAccruedFees'

export function Admin({ chainId, address }: { chainId: number; address: Address }) {
    const currentChainId = useChainId()

    if (currentChainId !== chainId) {
        return <div>Switch to the correct chain ({chainId}) to view tickets</div>
    }

    return (
        <div className="mb-4 space-y-14">
            <h1 className="text-4xl font-normal mt-16">Operator Functions</h1>
            <div className="mt-16 space-y-4">
                <h2 className="text-2xl">Seed jackpot</h2>
                <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
                    <SeedJackpot contractAddress={address} />
                </ErrorBoundary>
            </div>
            <div className="mt-16 space-y-4">
                <h2 className="text-2xl">Kill lottery/activate redistribution mode</h2>
                <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
                    <Kill contractAddress={address} />
                </ErrorBoundary>
            </div>
            <div className="mt-16 space-y-4">
                <h2 className="text-2xl">Withdraw accrued fees</h2>
                <ErrorBoundary fallbackRender={({ error }) => <div>{error.message}</div>}>
                    <WithdrawAccruedFees contractAddress={address} />
                </ErrorBoundary>
            </div>
        </div>
    )
}
