import { base, scroll } from 'viem/chains'
import { useChainId, useReadContract } from 'wagmi'
import { LOOTERY_DEPLOYMENT_HELPER_ABI } from '../abi/LooteryDeploymentHelper'

const deploymentHelpers: Record<number, `0x${string}`> = {
    [base.id]: '0x8D8A6E4Bea7d9dE3D65f4CFc0760D89ec2b1714A',
    [scroll.id]: '0x171A53E7AB7da344845E706DDF7D0F67Eb1C9213',
}

export function useLooteryDeploymentHelper() {
    const chainId = useChainId()

    const deploymentHelperAddress = deploymentHelpers[chainId]
    if (!deploymentHelperAddress) {
        return undefined
    }

    const { data: metadataRegistry } = useReadContract({
        address: deploymentHelperAddress,
        abi: LOOTERY_DEPLOYMENT_HELPER_ABI,
        functionName: 'metadataRegistry',
    })

    return {
        config: {
            address: deploymentHelperAddress,
            abi: LOOTERY_DEPLOYMENT_HELPER_ABI,
        } as const,
        metadataRegistry,
    }
}
