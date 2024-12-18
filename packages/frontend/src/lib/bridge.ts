import { formatEther } from 'viem'
import { getChain } from './wagmi'

export function makeBridgeUrl(chainId: number, amount: bigint) {
    const chain = getChain(chainId)
    if (chain) {
        const chainName = chain.name.toLowerCase()
        return `https://relay.link/bridge/${chainName}?fromChainId=1&amount=${formatEther(amount)}&currency=eth&tradeType=EXACT_OUTPUT&lockToChain=true&lockCurrency=true`
    } else {
        return undefined
    }
}
