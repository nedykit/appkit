import { Fragment, useState } from 'react'

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react'

import type { Wallet } from '@nedykit/appkit-wallet-button'
import { useAppKitUpdateEmail, useAppKitWallet } from '@nedykit/appkit-wallet-button/react'
import { type SocialProvider, useAppKitAccount } from '@nedykit/appkit/react'

import { ConstantsUtil } from '@/src/utils/ConstantsUtil'

import { useChakraToast } from './Toast'

interface AppKitWalletButtonsProps {
  wallets: Wallet[]
  showActions?: boolean
}

interface WalletButtonHooksProps {
  wallets: Wallet[]
}

interface WalletButtonComponentsProps {
  wallets: Wallet[]
}

export function AppKitWalletButtons({ wallets, showActions = true }: AppKitWalletButtonsProps) {
  const { embeddedWalletInfo, caipAddress } = useAppKitAccount()

  const isEmailConnected = caipAddress && embeddedWalletInfo?.authProvider === 'email'

  return (
    <Card marginTop={10} marginBottom={10}>
      <CardHeader>
        <Heading size="md">Wallet Buttons</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4" flexWrap="wrap">
          <Flex flexDirection="column" gap="4">
            <Heading size="xs" textTransform="uppercase">
              Components
            </Heading>

            <Flex display="flex" flexWrap="wrap" gap="4">
              <WalletButtonComponents wallets={wallets} />
            </Flex>
          </Flex>

          <Flex flexDirection="column" gap="4">
            <Heading size="xs" textTransform="uppercase">
              Hooks Interactions
            </Heading>

            <Flex display="flex" flexWrap="wrap" gap="4">
              <WalletButtonHooks wallets={wallets} />
            </Flex>
          </Flex>

          {showActions && (
            <Flex flexDirection="column" gap="4">
              <Heading size="xs" textTransform="uppercase">
                Actions
              </Heading>

              {isEmailConnected ? (
                <Flex display="flex" flexWrap="wrap" gap="4">
                  <UpdateEmail />
                </Flex>
              ) : (
                <Text textAlign="left" color="neutrals400" fontSize="16">
                  No actions available
                </Text>
              )}
            </Flex>
          )}
        </Stack>
      </CardBody>
    </Card>
  )
}

function WalletButtonComponents({ wallets }: WalletButtonComponentsProps) {
  return wallets.map(wallet => (
    <Fragment key={`wallet-button-${wallet}`}>
      <appkit-wallet-button wallet={wallet} data-testid={`wallet-button-${wallet}`} />
    </Fragment>
  ))
}

function WalletButtonHooks({ wallets }: WalletButtonHooksProps) {
  const [pendingWallet, setPendingWallet] = useState<Wallet>()
  const toast = useChakraToast()
  const { caipAddress } = useAppKitAccount()

  const { isReady, isPending, connect } = useAppKitWallet({
    onSuccess() {
      setPendingWallet(undefined)
    },
    onError(error) {
      toast({
        title: 'Wallet Button',
        description: error.message,
        type: 'error'
      })
      setPendingWallet(undefined)
    }
  })

  return wallets.map(wallet => {
    const isSocial = ConstantsUtil.Socials.includes(wallet as SocialProvider)
    const isWalletConnect = wallet === 'walletConnect'
    const isEmail = wallet === 'email'

    const isWalletButtonDisabled = !isWalletConnect && !isSocial && !isReady && !isEmail
    const shouldCapitlize = wallet === 'okx'

    return (
      <Button
        key={`wallet-button-hook-${wallet}`}
        onClick={() => {
          setPendingWallet(wallet)
          connect(wallet)
        }}
        maxW="fit-content"
        size="md"
        isLoading={isPending && pendingWallet === wallet}
        isDisabled={Boolean(caipAddress) || isWalletButtonDisabled}
        textTransform={shouldCapitlize ? 'uppercase' : 'capitalize'}
        data-testid={`wallet-button-hook-${wallet}`}
      >
        {wallet}
      </Button>
    )
  })
}

function UpdateEmail() {
  const toast = useChakraToast()

  const { updateEmail, isPending } = useAppKitUpdateEmail({
    onSuccess() {
      toast({
        title: 'Update Email',
        description: 'Email updated successfully',
        type: 'success'
      })
    },
    onError(error) {
      toast({
        title: 'Update Email',
        description: error.message,
        type: 'error'
      })
    }
  })

  return (
    <Button onClick={() => updateEmail()} isLoading={isPending}>
      Update Email
    </Button>
  )
}
