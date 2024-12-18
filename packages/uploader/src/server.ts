import Fastify from 'fastify'
import cors from '@fastify/cors'
import { upload } from './routes/upload'

export const fastify = Fastify({
    logger: true,
})
fastify.register(cors, {
    origin: '*',
})

fastify.post('/upload', upload)
