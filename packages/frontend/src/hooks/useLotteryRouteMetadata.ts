import { useParams } from '@tanstack/react-router'
import { useLottoPGFMetadata } from '@/hooks/useLottoPGFMetadata'
import { z } from 'zod'
import { EthereumAddressSchema } from '@common/EthereumAddressSchema'

const RouteMetadataParams = z.object({
    chainId: z.string().regex(/^\d+$/),
    address: EthereumAddressSchema,
})

export function useLotteryRouteMetadata() {
    const _params = useParams({
        strict: false,
    })
    const { success: hasRouteMetadata, data: params } = RouteMetadataParams.safeParse(_params)

    const { metadata } = useLottoPGFMetadata(
        hasRouteMetadata ? Number(params.chainId) : undefined,
        params?.address,
    )

    return {
        hasRouteMetadata,
        metadata,
    }
}
