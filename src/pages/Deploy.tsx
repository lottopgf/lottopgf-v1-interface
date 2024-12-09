import { Box, Button, Card, Grid, Heading, HStack, Input, VStack } from '@chakra-ui/react'
import { Field } from '../components/ui/field'
import { Slider } from '../components/ui/slider'
import { StepperInput } from '../components/ui/stepper-input'

export function Deploy() {
    return (
        <>
            <VStack alignItems="flex-start">
                <Box width="md">
                    <Heading size="3xl" fontWeight="normal" textAlign="left" mt={8}>
                        Launch a permissionless lottery to fund public goods
                    </Heading>
                </Box>

                {/** Lottery settings */}
                <VStack width="md" alignItems="flex-start">
                    <Heading size="lg" mt={8}>
                        Lottery settings
                    </Heading>

                    <Field
                        label="Duration until draw, in seconds"
                        mt={4}
                        helperText="Minimum 10 minutes"
                    >
                        <Input type="number" placeholder="3600" variant="outline" />
                    </Field>

                    <Field
                        label="Community fee, in %"
                        mt={8}
                        helperText="Percentage of ticket price that goes to the community"
                    >
                        <Slider
                            width="100%"
                            defaultValue={[50]}
                            size="md"
                            marks={[
                                { value: 0, label: '0%' },
                                { value: 50, label: '50%' },
                                { value: 100, label: '100%' },
                            ]}
                        />
                    </Field>

                    <Field
                        label="Prize token contract address"
                        mt={8}
                        helperText="The token that will be used as prize payout and ticket purchases"
                    >
                        <Input
                            placeholder="0x4200000000000000000000000000000000000006"
                            variant="outline"
                        />
                    </Field>
                </VStack>

                {/** Ticket configuration */}
                <VStack width="md" alignItems="flex-start">
                    <Heading size="lg" mt={8}>
                        Ticket configuration
                    </Heading>

                    <HStack justifyContent="space-between" width="100%">
                        <Field
                            label="Numbers range to"
                            mt={8}
                            helperText="Select the highest number that can be picked (the lowest number is always 1)"
                        />
                        <StepperInput defaultValue="25" />
                    </HStack>

                    <HStack justifyContent="space-between" width="100%">
                        <Field
                            label="Pick length"
                            mt={8}
                            helperText="How many numbers to be picked per ticket"
                        />
                        <StepperInput defaultValue="5" />
                    </HStack>

                    <Field
                        label="Ticket price"
                        mt={8}
                        helperText="The price of a ticket, in the prize token's decimals"
                    >
                        <Input type="text" placeholder="1000000000000000000" variant="outline" />
                    </Field>
                </VStack>

                {/** Beneficiaries */}
                <VStack width="2xl" alignItems="flex-start">
                    <Heading size="lg" mt={8}>
                        Add causes to fund with the lottery
                    </Heading>

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
                            <Card.Title>ZuVillage Collective Fund</Card.Title>
                            <Card.Description>
                                This is the default beneficiary and the proceeds will be stored in
                                the deployed lottery contract.
                            </Card.Description>
                        </Card.Body>
                    </Card.Root>

                    {/** Add cause form */}
                    <Grid templateColumns="repeat(2, 1fr)" mt={2} gap={4} width="100%">
                        <Card.Root width="100%">
                            <Card.Body gap={1}>
                                <Card.Title>ZuVillage Collective Fund</Card.Title>
                            </Card.Body>
                        </Card.Root>
                        <Card.Root width="100%">
                            <Card.Body gap={1}>
                                <Card.Title>+ Add another cause</Card.Title>
                                <Card.Description>
                                    <Field label="Cause title" mt={4}>
                                        <Input placeholder="Meowfund" variant="outline" />
                                    </Field>
                                    <Button
                                        variant="outline"
                                        colorPalette="green"
                                        mt={4}
                                        width="100%"
                                    >
                                        Confirm
                                    </Button>
                                </Card.Description>
                            </Card.Body>
                        </Card.Root>
                    </Grid>
                </VStack>
                <Button variant="solid" colorPalette="green" size="xl" mt={4}>
                    Deploy
                </Button>
            </VStack>
        </>
    )
}
