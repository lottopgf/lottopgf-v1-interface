import Fastify from 'fastify'
import { upload } from './routes/upload'

export const fastify = Fastify({
    logger: true,
})

fastify.post('/upload', upload)
