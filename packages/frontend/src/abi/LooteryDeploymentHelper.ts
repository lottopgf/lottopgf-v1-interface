export const LOOTERY_DEPLOYMENT_HELPER_ABI = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'looteryFactory_',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'metadataRegistry_',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'string',
                        name: 'name',
                        type: 'string',
                    },
                    {
                        internalType: 'string',
                        name: 'symbol',
                        type: 'string',
                    },
                    {
                        internalType: 'uint8',
                        name: 'pickLength',
                        type: 'uint8',
                    },
                    {
                        internalType: 'uint8',
                        name: 'maxBallValue',
                        type: 'uint8',
                    },
                    {
                        internalType: 'uint256',
                        name: 'gamePeriod',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'ticketPrice',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'communityFeeBps',
                        type: 'uint256',
                    },
                    {
                        internalType: 'address',
                        name: 'prizeToken',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'seedJackpotDelay',
                        type: 'uint256',
                    },
                    {
                        internalType: 'uint256',
                        name: 'seedJackpotMinValue',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct LooteryDeploymentHelper.DeployParams',
                name: 'params',
                type: 'tuple',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'beneficiary',
                        type: 'address',
                    },
                    {
                        internalType: 'string',
                        name: 'name',
                        type: 'string',
                    },
                ],
                internalType: 'struct ILottoPGFMetadataRegistry.Beneficiary[]',
                name: 'beneficiaries',
                type: 'tuple[]',
            },
            {
                internalType: 'string',
                name: 'uri',
                type: 'string',
            },
        ],
        name: 'deployLooteryWithMetadata',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'looteryFactory',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'metadataRegistry',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
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
