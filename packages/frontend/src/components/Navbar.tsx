import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ThemeToggle } from './ThemeToggle'
import { Logo } from './Logo'
import { useLotteryRouteMetadata } from '@/hooks/useLotteryRouteMetadata'
import { viaIpfsGateway } from '@/lib/viaIpfsGateway'

export function Navbar() {
    const { hasRouteMetadata, metadata } = useLotteryRouteMetadata()
    const logoUri = metadata.logo ? viaIpfsGateway(metadata.logo) : undefined

    return (
        <div className="flex h-16 items-center justify-between px-4">
            <div className="h-full flex flex-col justify-center p-2">
                {hasRouteMetadata ? (
                    <img className="h-[100%]" src={logoUri} />
                ) : (
                    <Logo className="h-[100%]" />
                )}
            </div>
            <div className="flex items-center gap-4">
                <ConnectButton />
                <ThemeToggle />
            </div>
        </div>
    )
}
