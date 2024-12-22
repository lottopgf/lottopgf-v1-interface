import { Banner } from '@/components/Banner'
import { LotteryStats, LotteryStatsSkeleton } from '@/components/LotteryStats'
import { PreviousTickets } from '@/components/PreviousTickets'
import { RoundEndAlert } from '@/components/RoundEndAlert'
import { TicketPurchase } from '@/components/TicketPurchase'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { WinnerAlert } from '@/components/WinnerAlert'
import { useCurrentGame } from '@/hooks/useCurrentGame'
import { useGameData } from '@/hooks/useGameData'
import { useLootery } from '@/hooks/useLootery'
import { useLottoPGFMetadata } from '@/hooks/useLottoPGFMetadata'
import { Link } from '@tanstack/react-router'
import { AlertCircleIcon, AlertTriangleIcon, ChevronRight } from 'lucide-react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Address } from 'viem'
import { useChainId } from 'wagmi'

export interface LotteryProps {
    chainId: number
    contractAddress: Address
}

export function Lottery({ chainId, contractAddress }: LotteryProps) {
    const selectedChainId = useChainId()
    const { gameState, gameId, refetch: refetchCurrentGame } = useCurrentGame(contractAddress)
    const {
        isActive,
        refetch: refetchGameData,
        roundHasEnded,
    } = useGameData({ contractAddress: contractAddress, gameId })
    const { metadata } = useLottoPGFMetadata(chainId, contractAddress)
    const {
        data: { isConnectedAccountOwner },
    } = useLootery(contractAddress)

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
                    <LotteryInactive address={contractAddress} />
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

                {isConnectedAccountOwner && (
                    <Alert className="bg-yellow-500 text-black">
                        <AlertCircleIcon className="h-4 w-4 stroke-black" />
                        <div />
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex-1">
                                <AlertTitle>Looking for operator functions?</AlertTitle>
                                <AlertDescription className="space-y-2">
                                    Navigate to the operator functions page to seed the jackpot, end
                                    the game, withdraw fees or perform other operator functions.
                                </AlertDescription>
                            </div>
                            <div>
                                <Link
                                    to="/admin/$chainId/$address"
                                    params={{
                                        chainId: chainId.toString(),
                                        address: contractAddress,
                                    }}
                                >
                                    <Button>
                                        Operator <ChevronRight />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Alert>
                )}

                {roundHasEnded && (
                    <RoundEndAlert
                        contractAddress={contractAddress}
                        gameState={gameState}
                        onDraw={() => {
                            refetchCurrentGame()
                        }}
                        onGameFinalized={() => {
                            refetchCurrentGame()
                        }}
                    />
                )}

                {gameId !== 0n && (
                    <WinnerAlert contractAddress={contractAddress} gameId={gameId - 1n} />
                )}

                <ErrorBoundary fallback={<p>Error fetching lottery stats…</p>}>
                    <Suspense fallback={<LotteryStatsSkeleton />}>
                        <LotteryStats contractAddress={contractAddress} />
                    </Suspense>
                </ErrorBoundary>
            </div>

            <ErrorBoundary fallback={<p>Error fetching tickets…</p>}>
                <TicketPurchase
                    contractAddress={contractAddress}
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
