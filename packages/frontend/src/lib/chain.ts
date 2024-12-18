import { parseGwei } from 'viem'
import { scroll } from 'viem/chains'
import { getPublicClient } from '@wagmi/core'
import { wagmiConfig } from './wagmi'

const SCROLL_MINIMUM_MAX_FEE_PER_GAS = parseGwei('0.3')

export async function estimateFeesPerGas() {
    const publicClient = getPublicClient(wagmiConfig)
    const estimatedFees = await publicClient.estimateFeesPerGas()
    let maxFeePerGas = estimatedFees.maxFeePerGas
    const maxPriorityFeePerGas = estimatedFees.maxPriorityFeePerGas

    if ((publicClient.chain.id as number) === scroll.id) {
        maxFeePerGas =
            maxFeePerGas < SCROLL_MINIMUM_MAX_FEE_PER_GAS
                ? SCROLL_MINIMUM_MAX_FEE_PER_GAS
                : maxFeePerGas
    }

    return { maxFeePerGas, maxPriorityFeePerGas }
}
