'use client'

import { HuobiWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'

import { SolanaAdapter } from '@nedykit/appkit-adapter-solana/react'
import { solana } from '@nedykit/appkit/networks'
import { createAppKit } from '@nedykit/appkit/react'

import { AppKitButtons } from '@/src/components/AppKitButtons'
import { AppKitInfo } from '@/src/components/AppKitInfo'
import { SolanaTests } from '@/src/components/Solana/SolanaTests'
import { ConstantsUtil } from '@/src/utils/ConstantsUtil'
import { ThemeStore } from '@/src/utils/StoreUtil'

const networks = ConstantsUtil.SolanaNetworks

const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [new HuobiWalletAdapter(), new SolflareWalletAdapter()]
})

const modal = createAppKit({
  adapters: [solanaWeb3JsAdapter],
  networks,
  defaultNetwork: solana,
  projectId: ConstantsUtil.ProjectId,
  metadata: ConstantsUtil.Metadata,
  features: {
    socials: [],
    emailShowWallets: false
  }
})

ThemeStore.setModal(modal)

export default function Solana() {
  return (
    <>
      <AppKitButtons />
      <AppKitInfo />
      <SolanaTests />
    </>
  )
}
