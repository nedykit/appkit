import { SolanaAdapter } from '@nedykit/appkit-adapter-solana'
import { solana, solanaTestnet } from '@nedykit/appkit/networks'

export const projectId = import.meta.env.VITE_PROJECT_ID || 'b56e18d47c72ab683b10814fe9495694' // this is a public projectId only to use on localhost

if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

export const networks = [solana, solanaTestnet]

export const solanaWeb3JsAdapter = new SolanaAdapter({})
