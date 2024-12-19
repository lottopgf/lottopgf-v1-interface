import { base, scroll } from 'viem/chains'
import { useReadContract } from 'wagmi'
import { LOOTERY_DEPLOYMENT_HELPER_ABI } from '../abi/LooteryDeploymentHelper'

const deploymentHelpers: Record<number, `0x${string}`> = {
    [base.id]: '0x4A8D55012894a7DbaEFc5c5183Ea7b921bc4a3C1',
    [scroll.id]: '0x4A8D55012894a7DbaEFc5c5183Ea7b921bc4a3C1',
}

export function useLooteryDeploymentHelper(chainId?: number) {
    const deploymentHelperAddress = chainId ? deploymentHelpers[chainId] : undefined
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
