import { CurrentTickets } from '@/components/CurrentTickets'
import { PreviousTickets } from '@/components/PreviousTickets'
import { useCurrentGame } from '@/hooks/useCurrentGame'
import { ErrorBoundary } from 'react-error-boundary'
import { Address } from 'viem'
import { useChainId } from 'wagmi'

export function Tickets({ chainId, address }: { chainId: number; address: Address }) {
    const { gameId } = useCurrentGame(address)
    const currentChainId = useChainId()

    if (currentChainId !== chainId) {
        return <div>Switch to the correct chain ({chainId}) to view tickets</div>
    }

    return (
        <div className="mb-4 space-y-14">
            <ErrorBoundary fallback={<p>Error</p>}>
                <CurrentTickets contractAddress={address} />
            </ErrorBoundary>
            {gameId !== 0n && (
                <ErrorBoundary fallback={<p>Error</p>}>
                    <PreviousTickets contractAddress={address} />
                </ErrorBoundary>
            )}
        </div>
    )
}
