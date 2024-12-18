import { FastifyRequest, FastifyReply } from 'fastify'
import { LottoPGFMetadataV1Schema } from '@common/metadata'
import { hash } from 'crypto'
import { s3 } from '../s3'
import jsonStableStringify from 'json-stable-stringify'

// Upload & pin files to IPFS
export async function upload(request: FastifyRequest, reply: FastifyReply) {
    const isJson = request.headers['content-type'] === 'application/json'
    if (!isJson) {
        return reply.status(400).send({ error: 'Invalid content type' })
    }

    // Validate the metadata
    const { success, error, data: metadata } = LottoPGFMetadataV1Schema.safeParse(request.body)
    if (!success) {
        return reply.status(400).send({
            error: `Invalid metadata: ${error.message}`,
        })
    }

    const stableMetadata = jsonStableStringify(metadata)
    const id = hash('sha256', Buffer.from(stableMetadata))

    // All valid - continue to upload & pin
    try {
        const request = s3.putObject({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: id,
            Body: stableMetadata,
            Metadata: {
                'Content-Type': 'application/json',
            },
        })
        let cid: string | undefined
        request.on('httpHeaders', (_statusCode, headers) => {
            cid = headers['x-amz-meta-cid']
        })
        await request.promise()

        console.log(`Uploaded metadata to IPFS: ${cid}`)
        return reply.status(200).send({
            cid,
        })
    } catch (error) {
        console.error(`Failed to upload metadata: ${error}`)
        return reply.status(500).send({
            error: 'Failed to upload metadata',
        })
    }
}
