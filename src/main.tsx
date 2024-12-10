import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from './components/ui/provider'

import App from './App.tsx'
import { WalletProvider } from './components/WalletProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider>
            <WalletProvider>
                <App />
            </WalletProvider>
        </Provider>
    </StrictMode>,
)