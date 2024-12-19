import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useWinner } from '@/hooks/useWinner'
import { Link } from '@tanstack/react-router'
import { PartyPopperIcon } from 'lucide-react'
import ConfettiExplosion from 'react-confetti-explosion'
import { withErrorBoundary } from 'react-error-boundary'
import { Address, isAddressEqual } from 'viem'
import { useAccount, useChainId } from 'wagmi'

function WinnerAlertComponent({
    contractAddress,
    gameId,
}: {
    contractAddress: Address
    gameId: bigint
}) {
    const chainId = useChainId()
    const { address } = useAccount()
    const { winningIds, winningAddresses, isOverWithApocalypse } = useWinner({
        contractAddress,
        gameId,
    })

    if (isOverWithApocalypse) {
        return (
            <>
                <ConfettiExplosion />
                <Alert>
                    <PartyPopperIcon className="size-4" />
                    <div />
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex-1">
                            <AlertTitle>Everyone wins!</AlertTitle>
                            <AlertDescription className="space-y-4">
                                <p>Every ticket holder wins an equal share of the jackpot!</p>
                            </AlertDescription>
                        </div>
                        <Button asChild>
                            <Link
                                to="/tickets/$chainId/$address"
                                params={{
                                    chainId: chainId.toString(),
                                    address: contractAddress,
                                }}
                                className="text-base text-green-500"
                            >
                                View your tickets &gt;
                            </Link>
                        </Button>
                    </div>
                </Alert>
            </>
        )
    }

    if (!winningIds || !winningIds.length || !winningAddresses) return null

    const userIsWinner =
        !!address &&
        winningAddresses.some((winnerAddress) => isAddressEqual(address, winnerAddress))

    return (
        <>
            <ConfettiExplosion />
            <Alert>
                <PartyPopperIcon className="m-auto size-4" />
                <div />
                <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                        <AlertTitle>
                            We have {winningIds.length} winning{' '}
                            {winningIds.length === 1 ? 'ticket' : 'tickets'} in the last draw!
                        </AlertTitle>
                        <AlertDescription className="space-y-4">
                            {userIsWinner ? (
                                <p>You won! Congratulations! 🎉</p>
                            ) : (
                                <p>Check your tickets to see if you won</p>
                            )}
                        </AlertDescription>
                    </div>
                    <Button asChild>
                        <Link
                            to="/tickets/$chainId/$address"
                            params={{
                                chainId: chainId.toString(),
                                address: contractAddress,
                            }}
                            className="text-base text-green-500"
                        >
                            View your tickets &gt;
                        </Link>
                    </Button>
                </div>
            </Alert>
        </>
    )
}

export const WinnerAlert = withErrorBoundary(WinnerAlertComponent, {
    fallback: null,
})
