import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, lightTheme, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useTheme } from '@/components/ThemeProvider'
import { wagmiConfig } from '@/lib/wagmi'
const queryClient = new QueryClient()

export function WalletProvider({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme()

    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={theme === 'dark' ? darkTheme() : lightTheme()}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
