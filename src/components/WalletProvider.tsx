import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, lightTheme, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import { wagmiConfig } from '@/lib/wagmi'
const queryClient = new QueryClient()

export function WalletProvider({ children }: { children: React.ReactNode }) {
    const { resolvedTheme } = useTheme()

    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={resolvedTheme === 'dark' ? darkTheme() : lightTheme()}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
