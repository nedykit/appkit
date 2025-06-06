'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react'

import { useAppKitState } from '@nedykit/appkit/react'

export function MultiChainInfo() {
  const { activeChain, selectedNetworkId } = useAppKitState()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      {ready && (
        <Card marginTop={10} marginBottom={10}>
          <CardHeader>
            <Heading size="md">Chain Information</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase" pb="2">
                  Active chain
                </Heading>
                <Text>{activeChain}</Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase" pb="2">
                  Active Network
                </Heading>
                <Text>{selectedNetworkId}</Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      )}
    </>
  )
}
