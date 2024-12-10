import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider, lightTheme, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { base, scroll } from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useColorMode } from './ui/color-mode'

export const chains = [base, scroll] as const

const wagmiConfig = getDefaultConfig({
    appName: 'LottoPGF v1 Deployer',
    projectId: 'fuck_walletconnect',
    chains,
    // transports: [ // TODO
    //   [mainnet.id]: http('url')
    // ],
    ssr: false,
})

const queryClient = new QueryClient()

export function WalletProvider({ children }: { children: React.ReactNode }) {
    const { colorMode } = useColorMode()

    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={colorMode === 'dark' ? darkTheme() : lightTheme()}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
