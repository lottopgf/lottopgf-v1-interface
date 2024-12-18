import { erc20Abi } from 'viem'
import { useReadContracts } from 'wagmi'

export function useERC20(address?: `0x${string}`) {
    const contract = {
        address,
        abi: erc20Abi,
    } as const

    const { data, isLoading, error, status } = useReadContracts({
        contracts: [
            {
                ...contract,
                functionName: 'name',
            },
            {
                ...contract,
                functionName: 'symbol',
            },
            {
                ...contract,
                functionName: 'decimals',
            },
        ],
    })

    const name = data?.[0].result
    const symbol = data?.[1].result
    const decimals = data?.[2].result

    return {
        name,
        symbol,
        decimals,
        isLoading,
        status,
        error,
    }
}
