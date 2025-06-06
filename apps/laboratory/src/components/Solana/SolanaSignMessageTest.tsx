import { useState } from 'react'

import { Button } from '@chakra-ui/react'

import type { Provider } from '@nedykit/appkit-adapter-solana'
import { useAppKitProvider } from '@nedykit/appkit/react'

import { useChakraToast } from '@/src/components/Toast'
import { ConstantsUtil } from '@/src/utils/ConstantsUtil'

export function SolanaSignMessageTest() {
  const toast = useChakraToast()
  const { walletProvider } = useAppKitProvider<Provider>('solana')
  const [loading, setLoading] = useState(false)

  async function onSignMessage() {
    try {
      if (!walletProvider) {
        throw Error('user is disconnected')
      }

      setLoading(true)
      const encodedMessage = new TextEncoder().encode('Hello from AppKit')
      const signature = await walletProvider.signMessage(encodedMessage)

      toast({
        title: ConstantsUtil.SigningSucceededToastTitle,
        description: signature,
        type: 'success'
      })
    } catch (err) {
      toast({
        title: ConstantsUtil.SigningFailedToastTitle,
        description: (err as Error).message,
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button data-testid="sign-message-button" onClick={onSignMessage} isLoading={loading}>
      Sign Message
    </Button>
  )
}
