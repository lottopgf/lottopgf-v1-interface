import { LOOTERY_ABI } from '@/abi/Lootery'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Address, isAddressEqual } from 'viem'
import { useChainId, useConfig } from 'wagmi'
import { base, scroll } from 'wagmi/chains'
import { readContractsQueryOptions } from 'wagmi/query'

const weths: Record<number, Address> = {
    [base.id]: '0x4200000000000000000000000000000000000006',
    [scroll.id]: '0x5300000000000000000000000000000000000004',
}

export function useGameConfig(address: Address) {
    const config = useConfig()
    const options = readContractsQueryOptions(config, {
        contracts: [
            {
                abi: LOOTERY_ABI,
                address,
                functionName: 'maxBallValue',
            },
            {
                abi: LOOTERY_ABI,
                address,
                functionName: 'pickLength',
            },
            {
                abi: LOOTERY_ABI,
                address,
                functionName: 'gamePeriod',
            },
            {
                abi: LOOTERY_ABI,
                address,
                functionName: 'ticketPrice',
            },
            {
                abi: LOOTERY_ABI,
                address,
                functionName: 'prizeToken',
            },
        ] as const,
        allowFailure: false,
    })

    const { data, ...rest } = useSuspenseQuery({
        ...options,
        // Data is immutable, we can cache forever
        staleTime: Infinity,
    })

    const [maxBallValue, pickLength, gamePeriod, ticketPrice, prizeToken] = data

    const chainId = useChainId()
    const weth = weths[chainId as keyof typeof weths]
    const isPrizeTokenNative = Boolean(weth) && isAddressEqual(weth, prizeToken)

    return {
        maxBallValue,
        pickLength,
        gamePeriod,
        ticketPrice,
        prizeToken,
        isPrizeTokenNative,
        ...rest,
    }
}
