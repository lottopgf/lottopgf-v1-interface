import { base, scroll } from 'viem/chains'
import { useChainId } from 'wagmi'
import LooteryFactoryABI from '../abis/LooteryFactory'

/** LottoPGF v1 deployed factory proxies */
const factories: Record<number, `0x${string}`> = {
    [scroll.id]: '0xca90207F3632C27BAeabe381eB5a6772D75C11A5',
    [base.id]: '0x0f246F0a251664d924002626Db6F856060a6B816',
}

export function useLooteryFactory() {
    const chainId = useChainId()

    const factoryAddress = factories[chainId]
    if (!factoryAddress) {
        return undefined
    }

    return {
        address: factoryAddress,
        abi: LooteryFactoryABI,
    } as const
}
