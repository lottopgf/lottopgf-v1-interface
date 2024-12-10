import { Box, Heading, HStack, Input, Link, Text, VStack } from '@chakra-ui/react'
import { Button } from '../components/ui/button'
import { Field } from '../components/ui/field'
import { Slider } from '../components/ui/slider'
import { StepperInput } from '../components/ui/stepper-input'
import { useCallback, useMemo, useState } from 'react'
import z from 'zod'
import debounce from 'lodash.debounce'
import { formatUnits, getAddress, isAddress } from 'viem'
import { useERC20 } from '../hooks/useERC20'
import { useCreateLootery } from '../hooks/useCreateLootery'
import { useChainId } from 'wagmi'
import { chains } from '../components/WalletProvider'

const NumericSchema = z.string().regex(/^\d+$/).transform(Number)
const BigIntSchema = z.string().regex(/^\d+$/).transform(BigInt)

export function Deploy() {
    const [title, setTitle] = useState('')
    const [symbol, setSymbol] = useState('')
    const [duration, _setDuration] = useState(3600)
    const [communityFeeBps, _setCommunityFeeBps] = useState(50)
    const [prizeTokenAddress, setPrizeTokenAddress] = useState('')
    const [pickLength, setPickLength] = useState(5)
    const [maxBallValue, setMaxBallValue] = useState(25)
    const [ticketPrice, _setTicketPrice] = useState(10n ** 18n)
    // const [beneficiaries, setBeneficiaries] = useState([] as string[])
    const [seedJackpotDelay, setSeedJackpotDelay] = useState(600n)
    const [seedJackpotMinValue, setSeedJackpotMinValue] = useState(10n ** 18n)

    const setDuration = useCallback(
        debounce((value: string) => {
            const { success, data } = NumericSchema.safeParse(value)
            if (success) {
                _setDuration(data)
            }
        }),
        [_setDuration],
    )

    const setCommunityFeeBps = useCallback(
        debounce((value: number) => {
            const bps = value * 100
            _setCommunityFeeBps(bps)
        }),
        [_setCommunityFeeBps],
    )

    const isValidTokenAddress = useMemo(() => {
        try {
            const maybeAddress = getAddress(prizeTokenAddress)
            return isAddress(maybeAddress)
        } catch (err) {
            return false
        }
    }, [prizeTokenAddress])

    const {
        name: prizeTokenName,
        symbol: prizeTokenSymbol,
        decimals: prizeTokenDecimals,
    } = useERC20(prizeTokenAddress as `0x${string}`)

    const setTicketPrice = useCallback(
        debounce((value: string) => {
            const { success, data } = BigIntSchema.safeParse(value)
            if (success) {
                _setTicketPrice(data)
            }
        }),
        [_setTicketPrice],
    )

    // Ephemeral state for adding beneficiaries
    // const [isAddingBeneficiary, setIsAddingBeneficiary] = useState(false)
    // const [newBeneficiaryName, setNewBeneficiaryName] = useState('')

    const {
        write: createLootery,
        status: createLooteryStatus,
        looteryLaunchedEvent,
    } = useCreateLootery()
    const launch = useCallback(async () => {
        if (!createLootery) {
            return
        }

        await createLootery(
            title,
            symbol,
            pickLength,
            maxBallValue,
            BigInt(duration),
            ticketPrice,
            BigInt(communityFeeBps),
            prizeTokenAddress as `0x${string}`,
            BigInt(seedJackpotDelay),
            BigInt(seedJackpotMinValue),
        )
    }, [
        createLootery,
        title,
        symbol,
        pickLength,
        maxBallValue,
        duration,
        ticketPrice,
        communityFeeBps,
        prizeTokenAddress,
        seedJackpotDelay,
        seedJackpotMinValue,
    ])

    const chainId = useChainId()
    const chain = chains.find((c) => c.id === chainId)

    return (
        <>
            <VStack alignItems="flex-start">
                <Box width="md">
                    <Heading size="3xl" fontWeight="normal" textAlign="left" mt={16}>
                        Launch a permissionless lottery to fund public goods
                    </Heading>
                </Box>

                {/** Lottery details */}
                <VStack width="md" alignItems="flex-start" mt={16}>
                    <Heading size="lg">Lottery details</Heading>

                    <Field label="Lottery title" mt={4}>
                        <Input
                            placeholder="The biggest lottery ever"
                            variant="outline"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Field>

                    <Field
                        label="Lottery symbol"
                        mt={8}
                        helperText="The symbol of the lottery, used for NFT tickets"
                    >
                        <Input
                            placeholder="PWRBLD"
                            variant="outline"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                        />
                    </Field>
                </VStack>

                {/** Lottery settings */}
                <VStack width="md" alignItems="flex-start" mt={16}>
                    <Heading size="lg">Lottery settings</Heading>

                    <Field
                        label="Duration until draw, in seconds"
                        mt={4}
                        helperText="Minimum 10 minutes"
                    >
                        <Input
                            type="number"
                            placeholder="3600"
                            variant="outline"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </Field>

                    <Field
                        label="Community fee, in %"
                        mt={8}
                        helperText="Percentage of ticket price that goes to the community"
                        errorText={'Maximum community fee is 95% (5% reserved for protocol)'}
                        invalid={communityFeeBps > 9500}
                    >
                        <HStack width="100%" gap={4}>
                            <Slider
                                width="100%"
                                size="md"
                                value={[Math.floor(communityFeeBps / 100)]}
                                onValueChange={(details) => setCommunityFeeBps(details.value[0])}
                            />
                            <Box>{`${Math.floor(communityFeeBps / 100)}%`}</Box>
                        </HStack>
                    </Field>

                    <Field
                        label="Prize token contract address"
                        mt={8}
                        helperText="The token that will be used as prize payout and ticket purchases"
                        errorText="Invalid token address"
                        invalid={!isValidTokenAddress}
                    >
                        <Input
                            placeholder="0x4200000000000000000000000000000000000006"
                            value={prizeTokenAddress}
                            onChange={(e) => setPrizeTokenAddress(e.target.value)}
                            variant="outline"
                        />
                        {prizeTokenName && prizeTokenSymbol && (
                            <Text fontSize="sm">
                                {prizeTokenName} ({prizeTokenSymbol})
                            </Text>
                        )}
                    </Field>

                    <Field
                        label="Seed jackpot delay, in seconds"
                        mt={8}
                        helperText="Rate-limiter for manual jackpot seeding"
                    >
                        <Input
                            type="number"
                            placeholder="600"
                            variant="outline"
                            value={seedJackpotDelay.toString()}
                            onChange={(e) => setSeedJackpotDelay(BigInt(e.target.value))}
                        />
                    </Field>

                    <Field
                        label="Seed jackpot minimum value, in the prize token's decimals"
                        mt={8}
                        helperText="Minimum value for manual jackpot seeding"
                    >
                        <Input
                            type="number"
                            placeholder="1000000000000000000"
                            variant="outline"
                            value={seedJackpotMinValue.toString()}
                            onChange={(e) => setSeedJackpotMinValue(BigInt(e.target.value))}
                        />
                    </Field>
                </VStack>

                {/** Ticket configuration */}
                <VStack width="md" alignItems="flex-start" mt={16}>
                    <Heading size="lg">Ticket configuration</Heading>

                    <HStack justifyContent="space-between" width="100%">
                        <Field
                            label="Numbers range to"
                            mt={8}
                            helperText="Select the highest number that can be picked (the lowest number is always 1)"
                        />
                        <StepperInput
                            value={maxBallValue.toString()}
                            onValueChange={(details) => setMaxBallValue(details.valueAsNumber)}
                        />
                    </HStack>

                    <HStack justifyContent="space-between" width="100%">
                        <Field
                            label="Pick length"
                            mt={8}
                            helperText="How many numbers to be picked per ticket"
                        />
                        <StepperInput
                            value={pickLength.toString()}
                            onValueChange={(details) => setPickLength(details.valueAsNumber)}
                        />
                    </HStack>

                    <Field
                        label="Ticket price"
                        mt={8}
                        helperText="The price of a ticket, in the prize token's decimals"
                    >
                        <Input
                            type="text"
                            placeholder="1000000000000000000"
                            variant="outline"
                            value={ticketPrice.toString()}
                            onChange={(event) => setTicketPrice(event.target.value)}
                        />
                        {prizeTokenDecimals && prizeTokenSymbol && (
                            <Text fontSize="sm" width="40%">
                                {formatUnits(ticketPrice, prizeTokenDecimals)} {prizeTokenSymbol}
                            </Text>
                        )}
                    </Field>
                </VStack>

                {/** Beneficiaries */}
                {/* <VStack width="2xl" alignItems="flex-start" mt={16}>
                    <Heading size="lg">Add causes to fund with the lottery</Heading>

                    <Card.Root width="100%">
                        <Card.Body gap={1}>
                            <Box
                                position="absolute"
                                top={0}
                                right={0}
                                m={2}
                                borderRadius={12}
                                borderStyle="solid"
                                borderWidth={1}
                                borderColor="green.400"
                                color="green.500"
                                fontSize="xs"
                                px={2}
                                py={1}
                            >
                                Main cause
                            </Box>
                            <Card.Title>{title || 'Main fund'}</Card.Title>
                            <Card.Description>
                                This is the default beneficiary and the proceeds will be stored in
                                the deployed lottery contract.
                            </Card.Description>
                        </Card.Body>
                    </Card.Root> */}

                {/** Other beneficiaries */}
                {/* <Grid templateColumns="repeat(2, 1fr)" mt={2} gap={4} width="100%">
                        {beneficiaries.map((beneficiary) => (
                            <Card.Root width="100%">
                                <Card.Body gap={1}>
                                    <Card.Title>{beneficiary}</Card.Title>
                                    <Card.Description>
                                        {beneficiary} will receive{' '}
                                        {Math.floor(communityFeeBps / 100)}% of the proceeds if
                                        selected by the ticket purchaser.
                                    </Card.Description>
                                </Card.Body>
                            </Card.Root>
                        ))}
                        <Card.Root width="100%">
                            <Card.Body gap={1}>
                                {!isAddingBeneficiary && (
                                    <Button
                                        variant="ghost"
                                        width="100%"
                                        onClick={() => setIsAddingBeneficiary(true)}
                                    >
                                        + Add another cause
                                    </Button>
                                )}
                                {isAddingBeneficiary && (
                                    <Card.Description>
                                        <Field label="Cause title">
                                            <Input
                                                placeholder="Meowfund"
                                                variant="outline"
                                                value={newBeneficiaryName}
                                                onChange={(event) =>
                                                    setNewBeneficiaryName(event.target.value)
                                                }
                                            />
                                        </Field>
                                        <Button
                                            variant="outline"
                                            colorPalette="green"
                                            mt={4}
                                            width="100%"
                                            disabled={
                                                !newBeneficiaryName ||
                                                Boolean(
                                                    beneficiaries.find(
                                                        (b) => b === newBeneficiaryName,
                                                    ),
                                                )
                                            }
                                            onClick={() => {
                                                setBeneficiaries([
                                                    ...beneficiaries,
                                                    newBeneficiaryName,
                                                ])
                                                setNewBeneficiaryName('')
                                                setIsAddingBeneficiary(false)
                                            }}
                                        >
                                            Confirm
                                        </Button>
                                    </Card.Description>
                                )}
                            </Card.Body>
                        </Card.Root>
                    </Grid>
                </VStack> */}

                <Box width="md">
                    <Heading size="3xl" fontWeight="normal" textAlign="left" mt={16}>
                        Let{`'`}s fund public goods 🫡
                    </Heading>
                </Box>
                <Button
                    variant="solid"
                    colorPalette="green"
                    size="xl"
                    mt={4}
                    onClick={launch}
                    disabled={createLooteryStatus === 'success'}
                    loading={createLooteryStatus === 'pending'}
                >
                    Launch
                </Button>
                {chain && looteryLaunchedEvent && (
                    <Text fontSize="lg" mt={4}>
                        Lottery deployed at{' '}
                        <Link
                            variant="underline"
                            href={`${new URL(`/address/${looteryLaunchedEvent.args.looteryProxy}`, chain.blockExplorers.default.url)}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {looteryLaunchedEvent.args.looteryProxy}
                        </Link>{' '}
                        🙌
                    </Text>
                )}
            </VStack>
        </>
    )
}
