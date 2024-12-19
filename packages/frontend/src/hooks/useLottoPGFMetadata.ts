import { Address, isAddressEqual } from 'viem'
import { useLooteryDeploymentHelper } from './useLooteryDeploymentHelper'
import { useReadContract } from 'wagmi'
import { LOTTOPGF_METADATA_REGISTRY_ABI } from '@/abi/LottoPGFMetadataRegistry'
import { LottoPGFMetadataV1Schema } from '@common/metadata'
import { useQuery } from '@tanstack/react-query'
import { viaIpfsGateway } from '@/lib/viaIpfsGateway'
import { LOOTERY_ABI } from '@/abi/Lootery'
import { FullBeneficiaryInfo } from './useCreateLooteryWithMetadata'
import { useMemo } from 'react'

export function useLottoPGFMetadata(chainId?: number, address?: Address) {
    const deploymentHelper = useLooteryDeploymentHelper(chainId)
    const metadataRegistry = deploymentHelper?.metadataRegistry
    const { data: looteryMetadata } = useReadContract({
        address: metadataRegistry,
        abi: LOTTOPGF_METADATA_REGISTRY_ABI,
        functionName: 'looteryMetadata',
        args: [address!],
        query: {
            enabled: Boolean(metadataRegistry && address),
        },
    })
    const metadataUri = looteryMetadata?.[1]
    const { data: metadata } = useQuery({
        queryKey: ['lottery-metadata', chainId, address],
        queryFn: async () =>
            LottoPGFMetadataV1Schema.parse(
                await fetch(viaIpfsGateway(metadataUri!)).then((res) => res.json()),
            ),
        enabled: Boolean(metadataUri),
    })

    // Reconcile beneficiaries onchain <> offchain metadata
    const { data: _beneficiaries } = useReadContract({
        address,
        abi: LOOTERY_ABI,
        functionName: 'beneficiaries',
    })
    const beneficiaries = useMemo(() => {
        const [addresses, names] = _beneficiaries || [[], []]
        const bs: FullBeneficiaryInfo[] = []
        for (let i = 0; i < addresses.length; i++) {
            const meta = metadata?.beneficiaries.find((b) =>
                isAddressEqual(b.address, addresses[i]),
            )
            bs.push({
                address: addresses[i],
                name: names[i],
                description: meta?.description || '',
                goal: meta?.goal || '0',
            })
        }
        return bs
    }, [_beneficiaries])

    return {
        metadata: {
            ...metadata,
            beneficiaries,
        },
    }
}
