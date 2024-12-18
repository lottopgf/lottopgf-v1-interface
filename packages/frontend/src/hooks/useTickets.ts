import { gqlApiUrl } from '@/config'
import { useSuspenseQuery } from '@tanstack/react-query'
import request, { gql } from 'graphql-request'
import type { Address } from 'viem'
import { useChainId } from 'wagmi'

const ticketsQuery = gql`
    query tickets($gameId: String!, $whomst: String!) {
        tickets(where: { whomstId: $whomst, gameId: $gameId }) {
            items {
                tokenId
                pick
            }
        }
    }
`

interface TicketsData {
    tickets: {
        items: {
            tokenId: string
            pick: number[]
        }[]
    }
}

export function useTickets({
    address,
    contractAddress,
    gameId,
}: {
    address: Address | undefined
    contractAddress: Address
    gameId: bigint | undefined
}) {
    const chainId = useChainId()
    const apiEndpoint = gqlApiUrl[chainId]
    const { data, ...rest } = useSuspenseQuery<TicketsData | null>({
        queryKey: [
            'tickets',
            { lotteryId: contractAddress, apiEndpoint, address, gameId: gameId?.toString() },
        ],
        queryFn: async () => {
            if (!address || !apiEndpoint) return null

            return request(apiEndpoint, ticketsQuery, {
                gameId: `${contractAddress}-${gameId?.toString()}`,
                whomst: address,
            })
        },
        retry: false,
    })

    const tickets = data?.tickets.items

    return {
        ...rest,
        data,
        tickets,
    }
}
