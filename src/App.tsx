import { Navbar } from './components/Navbar'
import { Deploy } from './pages/Deploy'

function App() {
    return (
        <>
            <Navbar />
            <main className="container mx-auto max-w-7xl px-4 pb-16">
                <Deploy />
            </main>
        </>
    )
}

export default App
