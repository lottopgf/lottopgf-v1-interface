import { gqlApiUrl } from '@/config'
import { useSuspenseQuery } from '@tanstack/react-query'
import request, { gql } from 'graphql-request'
import type { Address } from 'viem'
import { useChainId } from 'wagmi'

const winningNumbersQuery = gql`
    query winningPick($lotteryId: String!, $gameId: String!) {
        lootery(id: $lotteryId) {
            id
            games(where: { id: $gameId }) {
                items {
                    id
                    gameId
                    winningPick
                }
            }
        }
    }
`

interface WinningNumbersData {
    lootery: {
        games: {
            items: {
                winningPick: number[]
            }[]
        }
    } | null
}

export function useWinningNumbers({
    gameId,
    contractAddress,
}: {
    gameId: bigint | undefined
    contractAddress: Address
}) {
    const chainId = useChainId()
    const apiEndpoint = gqlApiUrl[chainId]
    const { data, ...rest } = useSuspenseQuery<WinningNumbersData | null>({
        queryKey: ['winningNumbers', contractAddress, gameId?.toString()],
        queryFn: async () => {
            if (gameId === undefined || !apiEndpoint) return null

            return request(apiEndpoint, winningNumbersQuery, {
                lotteryId: contractAddress,
                gameId: `${contractAddress}-${gameId?.toString()}`,
            })
        },
    })

    const numbers = data?.lootery?.games.items.at(0)?.winningPick

    return {
        ...rest,
        numbers,
        data,
    }
}
