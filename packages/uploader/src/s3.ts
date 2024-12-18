import { S3 } from 'aws-sdk'

// In reality, we use Filebase and not S3 (for IPFS pinning)
export const s3 = new S3({
    accessKeyId: process.env.AWS_S3_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET,
    endpoint: process.env.AWS_S3_ENDPOINT,
    region: process.env.AWS_S3_REGION,
})
