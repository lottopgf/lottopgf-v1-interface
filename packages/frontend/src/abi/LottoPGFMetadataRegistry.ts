export const LOTTOPGF_METADATA_REGISTRY_ABI = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'have',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'want',
                type: 'address',
            },
        ],
        name: 'NotLooteryOwner',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'looteryMetadata',
        outputs: [
            {
                internalType: 'address',
                name: 'lootery',
                type: 'address',
            },
            {
                internalType: 'string',
                name: 'uri',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'lootery',
                type: 'address',
            },
            {
                internalType: 'string',
                name: 'uri',
                type: 'string',
            },
        ],
        name: 'setLooteryMetadata',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'typeAndVersion',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
] as const
