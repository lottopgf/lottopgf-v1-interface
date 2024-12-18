import './globals.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { WalletProvider } from './components/WalletProvider.tsx'
import { RouterProvider, createRouter, createHashHistory } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'

const history = createHashHistory()
const router = createRouter({ routeTree, history })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="system">
            <WalletProvider>
                <RouterProvider router={router} />
            </WalletProvider>
        </ThemeProvider>
    </StrictMode>,
)
