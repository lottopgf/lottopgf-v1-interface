import { Box, Card, Container, Heading, HStack, Input, VStack } from '@chakra-ui/react'
import { Navbar } from './components/Navbar'
import { Field } from './components/ui/field'
import { Slider } from './components/ui/slider'
import { StepperInput } from './components/ui/stepper-input'

function App() {
    return (
        <>
            <Navbar />
            <Container width="4xl" centerContent={false}>
                <VStack alignItems="flex-start">
                    <Box width="md">
                        <Heading size="3xl" fontWeight="normal" textAlign="left" mt={8}>
                            Launch a permissionless lottery to fund public goods
                        </Heading>
                    </Box>

                    {/* Lottery details */}
                    {/* <VStack width="md" alignItems="flex-start">
          <Heading size="lg" mt={8}>
            Lottery details
          </Heading>

          <FileUploadRoot maxW="xl" alignItems="stretch" maxFiles={10}>
            <FileUploadDropzone
              label="Upload a banner image"
              description=".png, .jpg"
            />
            <FileUploadList />
          </FileUploadRoot>

          <Field label="Lottery title" mt={8} required>
            <Input placeholder="The biggest lottery ever" variant="outline" />
          </Field>

          <Field label="Lottery description" mt={8} required>
            <Textarea
              placeholder="What is your lottery about, and what does it fund?"
              variant="outline"
            />
          </Field>
        </VStack> */}

                    {/** Lottery settings */}
                    <VStack width="md" alignItems="flex-start">
                        <Heading size="lg" mt={8}>
                            Lottery settings
                        </Heading>

                        <Field
                            label="Duration until draw, in seconds"
                            mt={4}
                            required
                            helperText="Minimum 10 minutes"
                        >
                            <Input type="number" placeholder="3600" variant="outline" />
                        </Field>

                        <Field
                            label="Community fee, in %"
                            mt={8}
                            required
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
                            required
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
                            <Input
                                type="text"
                                placeholder="1000000000000000000"
                                variant="outline"
                            />
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
                                    This is the default beneficiary and the proceeds will be stored
                                    in the deployed lottery contract.
                                </Card.Description>
                            </Card.Body>
                        </Card.Root>
                    </VStack>
                </VStack>
            </Container>
        </>
    )
}

export default App
