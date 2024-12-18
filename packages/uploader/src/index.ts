import { fastify } from './server'

// Run the server!
async function main() {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

main()
