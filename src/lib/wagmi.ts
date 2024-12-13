import { METADATA } from '@/config'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { createClient, fallback, webSocket } from 'viem'
import { mainnet } from 'viem/chains'
import { base, scroll } from 'wagmi/chains'
import { cookieStorage, createConfig, createStorage, http, Transport } from 'wagmi'

export const chains = [base, scroll] as const
export type SupportedChainId = (typeof chains)[number]['id']
export function getChain(chainId?: number) {
    return chainId ? chains.find((chain) => chain.id === chainId) : undefined
}

export const wagmiConfig = getDefaultConfig({
    appName: METADATA.name,
    appDescription: METADATA.description,
    appUrl: METADATA.url,
    appIcon: METADATA.icon,
    chains,
    projectId: 'fuck_walletconnect',
    ssr: true,
    transports: {
        [scroll.id]: fallback([webSocket(), http()]),
        [base.id]: fallback([webSocket(), http()]),
    } satisfies Record<SupportedChainId, Transport>,
    storage: createStorage({
        storage: cookieStorage,
    }),
})

export const ensConfig = createConfig({
    chains: [mainnet],
    client({ chain }) {
        return createClient({ chain, transport: http() })
    },
})
