import type { CaipNetworkId } from '@nedykit/appkit-common'
import { W3mFrameProvider } from '@nedykit/appkit-wallet'

interface W3mFrameProviderConfig {
  projectId: string
  chainId?: number | CaipNetworkId
  enableLogger?: boolean
  onTimeout?: () => void
}

export class W3mFrameProviderSingleton {
  private static instance: W3mFrameProvider

  // eslint-disable-next-line @typescript-eslint/no-empty-function -- This is a singleton
  private constructor() {}

  public static getInstance({
    projectId,
    chainId,
    enableLogger,
    onTimeout
  }: W3mFrameProviderConfig): W3mFrameProvider {
    if (!W3mFrameProviderSingleton.instance) {
      W3mFrameProviderSingleton.instance = new W3mFrameProvider({
        projectId,
        chainId,
        enableLogger,
        onTimeout
      })
    }

    return W3mFrameProviderSingleton.instance
  }
}
