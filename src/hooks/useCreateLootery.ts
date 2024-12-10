import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { useLooteryFactory } from './useLooteryFactory'
import { parseEventLogs } from 'viem'
import { useMemo } from 'react'

export function useCreateLootery() {
    const { writeContractAsync, reset, status, error, data: hash } = useWriteContract()
    const factory = useLooteryFactory()

    if (!factory) {
        return {}
    }

    const { data: receipt } = useWaitForTransactionReceipt({
        hash,
    })
    const looteryLaunchedEvent = useMemo(() => {
        if (!receipt) {
            return undefined
        }
        const events = parseEventLogs({
            abi: factory.abi,
            logs: receipt.logs,
            eventName: 'LooteryLaunched',
        })
        if (events.length === 0) {
            return undefined
        }
        return events[0]
    }, [factory.abi, receipt])

    const write = async (
        name: string,
        symbol: string,
        pickLength: number,
        maxBallValue: number,
        gamePeriod: bigint,
        ticketPrice: bigint,
        communityFeeBps: bigint,
        prizeToken: `0x${string}`,
        seedJackpotDelay: bigint,
        seedJackpotMinValue: bigint,
    ) =>
        writeContractAsync({
            ...factory,
            functionName: 'create',
            args: [
                name,
                symbol,
                pickLength,
                maxBallValue,
                gamePeriod,
                ticketPrice,
                communityFeeBps,
                prizeToken,
                seedJackpotDelay,
                seedJackpotMinValue,
            ],
        })

    return {
        write,
        reset,
        status,
        error,
        hash,
        receipt,
        looteryLaunchedEvent,
    }
}
