'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

import { WagmiAdapter } from '@nedykit/appkit-adapter-wagmi'
import { mainnet } from '@nedykit/appkit/networks'
import { createAppKit } from '@nedykit/appkit/react'

import { AppKitButtons } from '@/src/components/AppKitButtons'
import { AppKitInfo } from '@/src/components/AppKitInfo'
import { WagmiTests } from '@/src/components/Wagmi/WagmiTests'
import { ConstantsUtil } from '@/src/utils/ConstantsUtil'
import { ThemeStore } from '@/src/utils/StoreUtil'

const queryClient = new QueryClient()

const networks = ConstantsUtil.EvmNetworks

const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  networks,
  projectId: ConstantsUtil.ProjectId
})

const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  defaultNetwork: mainnet,
  projectId: ConstantsUtil.ProjectId,
  features: {
    analytics: true,
    socials: [],
    emailShowWallets: false
  }
})

ThemeStore.setModal(modal)

export default function Wagmi() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKitButtons />
        <AppKitInfo />
        <WagmiTests />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
