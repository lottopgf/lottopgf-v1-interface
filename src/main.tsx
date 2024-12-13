import './globals.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'

import App from './App.tsx'
import { WalletProvider } from './components/WalletProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <WalletProvider>
                <App />
            </WalletProvider>
        </ThemeProvider>
    </StrictMode>,
)
