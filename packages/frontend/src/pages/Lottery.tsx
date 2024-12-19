import { Banner } from '@/components/Banner'
import { LotteryStats, LotteryStatsSkeleton } from '@/components/LotteryStats'
import { PreviousTickets } from '@/components/PreviousTickets'
import { RoundEndAlert } from '@/components/RoundEndAlert'
import { TicketPurchase } from '@/components/TicketPurchase'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { WinnerAlert } from '@/components/WinnerAlert'
import { useCurrentGame } from '@/hooks/useCurrentGame'
import { useGameData } from '@/hooks/useGameData'
import { useLottoPGFMetadata } from '@/hooks/useLottoPGFMetadata'
import { AlertTriangleIcon } from 'lucide-react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Address } from 'viem'
import { useChainId } from 'wagmi'

export interface LotteryProps {
    chainId: number
    address: Address
}

export function Lottery({ chainId, address }: LotteryProps) {
    const selectedChainId = useChainId()
    const { gameState, gameId, refetch: refetchCurrentGame } = useCurrentGame(address)
    const {
        isActive,
        refetch: refetchGameData,
        roundHasEnded,
    } = useGameData({ contractAddress: address, gameId })
    const { metadata } = useLottoPGFMetadata(chainId, address)

    if (selectedChainId !== chainId) {
        return <div>Switch to {chainId} to view this lottery</div>
    }

    if (!isActive) {
        return (
            <div className="mb-4 space-y-14">
                <div className="space-y-8">
                    <Banner
                        name={metadata?.title}
                        longDescription={metadata?.description}
                        bannerImage={metadata?.bannerImage}
                    />
                    <LotteryInactive address={address} />
                </div>
            </div>
        )
    }

    return (
        <div className="mb-4 space-y-14">
            <div className="space-y-8">
                <Banner
                    name={metadata?.title}
                    longDescription={metadata?.description}
                    bannerImage={metadata?.bannerImage}
                />

                {roundHasEnded && (
                    <RoundEndAlert
                        contractAddress={address}
                        gameState={gameState}
                        onDraw={() => {
                            refetchCurrentGame()
                        }}
                        onGameFinalized={() => {
                            refetchCurrentGame()
                        }}
                    />
                )}

                {gameId !== 0n && <WinnerAlert contractAddress={address} gameId={gameId - 1n} />}

                <ErrorBoundary fallback={<p>Error fetching lottery stats…</p>}>
                    <Suspense fallback={<LotteryStatsSkeleton />}>
                        <LotteryStats contractAddress={address} />
                    </Suspense>
                </ErrorBoundary>
            </div>

            <ErrorBoundary fallback={<p>Error fetching tickets…</p>}>
                <TicketPurchase
                    contractAddress={address}
                    onPurchase={() => {
                        refetchGameData()
                    }}
                />
            </ErrorBoundary>
        </div>
    )
}

function LotteryInactive({ address }: { address: Address }) {
    return (
        <>
            <Alert>
                <AlertTriangleIcon className="h-4 w-4" />
                <AlertTitle>Lottery is no longer active</AlertTitle>
                <AlertDescription>
                    The lottery has ended and no longer accepts ticket purchases. <br />
                    You can still view and redeem any previous tickets.
                </AlertDescription>
            </Alert>
            <ErrorBoundary fallback={<p>Error fetching previous tickets…</p>}>
                <PreviousTickets contractAddress={address} />
            </ErrorBoundary>
        </>
    )
}
