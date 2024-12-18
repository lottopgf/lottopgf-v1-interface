import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { useLooteryDeploymentHelper } from './useLooteryDeploymentHelper'
import { parseEventLogs } from 'viem'
import { useMemo } from 'react'
import {
    LottoPGFMetadataV1,
    LottoPGFMetadataV1Schema,
    type BeneficiaryInfo,
} from '@common/metadata'
import LooteryFactoryABI from '@/abi/LooteryFactory'
import { z } from 'zod'

export type FullBeneficiaryInfo = BeneficiaryInfo & {
    /** Name of the beneficiary (recorded onchain) */
    name: string
}

export function useCreateLooteryWithMetadata() {
    const { writeContractAsync, reset, status, error, data: hash } = useWriteContract()
    const deploymentHelper = useLooteryDeploymentHelper()

    const { data: receipt } = useWaitForTransactionReceipt({
        hash,
    })
    const looteryLaunchedEvent = useMemo(() => {
        if (!receipt || !deploymentHelper) {
            return undefined
        }
        const events = parseEventLogs({
            abi: LooteryFactoryABI,
            logs: receipt.logs,
            eventName: 'LooteryLaunched',
        })
        if (events.length === 0) {
            return undefined
        }
        return events[0]
    }, [receipt])

    const write = deploymentHelper
        ? async (
              name: string,
              symbol: string,
              pickLength: number,
              maxBallValue: number,
              gamePeriod: bigint,
              ticketPrice: bigint,
              communityFeeBps: bigint,
              prizeToken: `0x${string}`,
              seedJackpotDelay: bigint,
              seedJackpotMinValue: bigint,
              beneficiaries: FullBeneficiaryInfo[],
              metadata: Omit<LottoPGFMetadataV1, 'beneficiaries'>,
          ) => {
              // Validate & upload metadata
              const validatedMetadata = LottoPGFMetadataV1Schema.parse({
                  ...metadata,
                  beneficiaries: beneficiaries.map(({ address, description, goal }) => ({
                      description,
                      address,
                      goal,
                  })),
              })
              const cid = await uploadMetadata(validatedMetadata)

              writeContractAsync({
                  ...deploymentHelper.config,
                  functionName: 'deployLooteryWithMetadata',
                  args: [
                      {
                          name,
                          symbol,
                          pickLength,
                          maxBallValue,
                          gamePeriod,
                          ticketPrice,
                          communityFeeBps,
                          prizeToken,
                          seedJackpotDelay,
                          seedJackpotMinValue,
                      },
                      beneficiaries.map(({ name, address }) => ({
                          beneficiary: address,
                          name,
                      })),
                      `ipfs://${cid}`,
                  ],
              })
          }
        : undefined

    return {
        write,
        reset,
        status,
        error,
        hash,
        receipt,
        looteryLaunchedEvent,
    }
}

const UploaderEndpointResponseSchema = z.object({
    cid: z.string(),
})

/**
 * Uploads metadata to the IPFS uploader service and returns the pinned CID
 * @param metadata - The metadata to upload
 * @returns The CID of the pinned metadata
 */
async function uploadMetadata(metadata: LottoPGFMetadataV1): Promise<string> {
    const response = await fetch(import.meta.env.VITE_IPFS_UPLOADER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
    })
    if (!response.ok) {
        throw new Error('Failed to upload metadata')
    }
    const { cid } = UploaderEndpointResponseSchema.parse(await response.json())
    return cid
}
