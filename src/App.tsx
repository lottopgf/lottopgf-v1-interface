import { Container } from '@chakra-ui/react'
import { Navbar } from './components/Navbar'
import { Deploy } from './pages/Deploy'

function App() {
    return (
        <>
            <Navbar />
            <Container width="4xl" centerContent={false} pb={16}>
                <Deploy />
            </Container>
        </>
    )
}

export default App
