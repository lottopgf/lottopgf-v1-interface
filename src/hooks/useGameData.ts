import { LOOTERY_ABI } from '@/abi/Lootery'
import { getNowInSeconds } from '@/lib/time'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Address } from 'viem'
import { useConfig } from 'wagmi'
import { readContractsQueryOptions } from 'wagmi/query'

export function useGameData({
    contractAddress,
    gameId,
    refetchInterval,
}: {
    contractAddress: Address
    gameId: bigint
    refetchInterval?: number
}) {
    const config = useConfig()
    const options = readContractsQueryOptions(config, {
        contracts: [
            {
                abi: LOOTERY_ABI,
                address: contractAddress,
                functionName: 'jackpot',
            },
            {
                abi: LOOTERY_ABI,
                address: contractAddress,
                functionName: 'isApocalypseMode',
            },
            {
                abi: LOOTERY_ABI,
                address: contractAddress,
                functionName: 'isGameActive',
            },
            {
                abi: LOOTERY_ABI,
                address: contractAddress,
                functionName: 'gamePeriod',
            },
            {
                abi: LOOTERY_ABI,
                address: contractAddress,
                functionName: 'gameData',
                args: [gameId],
            },
            {
                abi: LOOTERY_ABI,
                address: contractAddress,
                functionName: 'accruedCommunityFees',
            },
        ] as const,
        allowFailure: false,
    })

    const { data, ...rest } = useSuspenseQuery({
        ...options,
        refetchInterval,
    })

    const [jackpot, isApocalypseMode, isActive, roundDuration, gameData, accruedCommunityFees] =
        data

    const [ticketsSold, startedAt, winningPickId] = gameData

    const roundEndTime = startedAt + roundDuration
    const roundHasEnded = BigInt(getNowInSeconds()) > roundEndTime

    return {
        jackpot,
        ticketsSold,
        startedAt,
        winningPickId,
        isActive,
        isApocalypse: isApocalypseMode,
        roundDuration,
        roundEndTime,
        roundHasEnded,
        accruedCommunityFees,
        ...rest,
    }
}
