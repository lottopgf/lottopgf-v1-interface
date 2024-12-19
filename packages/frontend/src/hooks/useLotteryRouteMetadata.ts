import { useMatch } from '@tanstack/react-router'
import { useLottoPGFMetadata } from '@/hooks/useLottoPGFMetadata'

export function useLotteryRouteMetadata() {
    const lotteryRouteMatch = useMatch({
        from: '/lottery/$chainId/$address',
        shouldThrow: false,
    })
    const ticketsRouteMatch = useMatch({
        from: '/tickets/$chainId/$address',
        shouldThrow: false,
    })
    const hasRouteMetadata = Boolean(lotteryRouteMatch || ticketsRouteMatch)
    const params = lotteryRouteMatch?.params || ticketsRouteMatch?.params

    const { metadata } = useLottoPGFMetadata(
        params?.chainId ? Number(params?.chainId) : undefined,
        params?.address as `0x${string}` | undefined,
    )

    return {
        hasRouteMetadata,
        metadata,
    }
}
