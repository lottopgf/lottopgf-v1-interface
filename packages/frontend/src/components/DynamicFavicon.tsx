import { useLotteryRouteMetadata } from '@/hooks/useLotteryRouteMetadata'
import { viaIpfsGateway } from '@/lib/viaIpfsGateway'
import { useEffect } from 'react'

export function DynamicFavicon() {
    const { hasRouteMetadata, metadata } = useLotteryRouteMetadata()
    const logoUri = metadata.icon ? viaIpfsGateway(metadata.icon) : undefined

    useEffect(() => {
        let link: HTMLLinkElement | null = document.querySelector('link[rel="icon"]')
        if (!link) {
            link = document.createElement('link')!
            link.rel = 'icon'
            document.head.appendChild(link)
        }
        if (hasRouteMetadata && logoUri) {
            link.href = logoUri
        } else {
            link.href = '/salute.svg'
        }
    }, [hasRouteMetadata, logoUri])

    return <link rel="icon" href={logoUri} />
}
