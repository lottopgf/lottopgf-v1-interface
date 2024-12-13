import { CHAIN, CHAIN_NAME_MAPPING } from '@/config'
import { formatEther } from 'viem'

export function makeBridgeUrl(amount: bigint) {
    const chainName = CHAIN_NAME_MAPPING[CHAIN.id]
    return `https://relay.link/bridge/${chainName}?fromChainId=1&amount=${formatEther(amount)}&currency=eth&tradeType=EXACT_OUTPUT&lockToChain=true&lockCurrency=true`
}
