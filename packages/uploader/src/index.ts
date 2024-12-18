import { fastify } from './server'

// Run the server!
async function main() {
    try {
        await fastify.listen({
            host: '0.0.0.0',
            port: Number(process.env.PORT) || 3000,
        })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

main()
