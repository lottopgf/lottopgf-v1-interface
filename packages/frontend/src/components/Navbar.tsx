import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ThemeToggle } from './ThemeToggle'
import { Logo } from './Logo'

export function Navbar() {
    return (
        <div className="flex h-16 items-center justify-between px-4">
            <div className="h-full flex flex-col justify-center">
                <Logo className="h-[60%]" />
            </div>
            <div className="flex items-center gap-4">
                <ConnectButton />
                <ThemeToggle />
            </div>
        </div>
    )
}
