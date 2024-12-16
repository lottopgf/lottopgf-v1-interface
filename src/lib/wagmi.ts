import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { metaMaskWallet, injectedWallet } from '@rainbow-me/rainbowkit/wallets'
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
    appName: 'LottoPGF v1',
    appDescription: 'LottoPGF v1 interface',
    appUrl: 'https://create.lottopgf.com',
    /** TODO: appIcon */
    chains,
    projectId: 'fuck_walletconnect',
    ssr: true,
    transports: {
        [scroll.id]: fallback([webSocket(), http()]),
        [base.id]: fallback([http('https://mainnet.base.org')]),
    } satisfies Record<SupportedChainId, Transport>,
    storage: createStorage({
        storage: cookieStorage,
    }),
    wallets: [
        {
            groupName: 'Default',
            wallets: [metaMaskWallet, injectedWallet],
        },
    ],
})

export const ensConfig = createConfig({
    chains: [mainnet],
    client({ chain }) {
        return createClient({ chain, transport: http() })
    },
})
