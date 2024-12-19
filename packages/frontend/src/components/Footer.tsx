import { DiscordIcon } from './icons/DiscordIcon'
import { DocsIcon } from './icons/DocsIcon'
import { FarcasterIcon } from './icons/FarcasterIcon'
import { GitHubIcon } from './icons/GitHubIcon'
import { TelegramIcon } from './icons/TelegramIcon'
import { TwitterIcon } from './icons/TwitterIcon'

export function Footer() {
    return (
        <footer className="flex flex-col items-center justify-center py-8 space-y-4">
            <div>
                Powered by{' '}
                <a
                    href="https://lottopgf.org"
                    target="_blank"
                    className="inline-flex items-center gap-1 underline decoration-dotted underline-offset-2 hover:no-underline"
                >
                    <span>LottoPGF V1</span>
                    <img src="/salute.svg" alt="Otto" width={14} height={14} />
                </a>
            </div>
            <div className="flex items-center justify-center text-sm space-x-2">
                <nav className="flex items-center justify-center gap-4 text-foreground">
                    <a
                        href="https://warpcast.com/lottopgf"
                        target="_blank"
                        className="flex aspect-square w-7"
                    >
                        <FarcasterIcon className="m-auto" />
                    </a>
                    <a
                        href="https://x.com/LottoPGF"
                        target="_blank"
                        className="flex aspect-square w-7"
                    >
                        <TwitterIcon className="m-auto" />
                    </a>
                    <a
                        href="https://t.me/lottopgf"
                        target="_blank"
                        className="flex aspect-square w-7"
                    >
                        <TelegramIcon className="m-auto" />
                    </a>
                    <a
                        href="https://discord.com/invite/BkE6ZX9fAA"
                        target="_blank"
                        className="flex aspect-square w-7"
                    >
                        <DiscordIcon className="m-auto size-5" />
                    </a>
                    <a
                        href="https://github.com/lottopgf"
                        target="_blank"
                        className="flex aspect-square w-7"
                    >
                        <GitHubIcon className="m-auto" />
                    </a>
                    <a
                        href="https://docs.lottopgf.org"
                        target="_blank"
                        className="flex aspect-square w-7"
                    >
                        <DocsIcon className="m-auto" />
                    </a>
                </nav>
            </div>
        </footer>
    )
}
