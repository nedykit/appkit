import { type Ref, onUnmounted, ref } from 'vue'

import { ChainController, type UseAppKitNetworkReturn } from '@nedykit/appkit-controllers'
import type { AppKitNetwork } from '@nedykit/appkit/networks'

import { AppKit } from '../src/client/appkit-core.js'
import { getAppKit } from '../src/library/vue/index.js'
import type { AppKitOptions } from '../src/utils/TypesUtil.js'
import { PACKAGE_VERSION } from './constants.js'

// -- Hooks ------------------------------------------------------------
export * from '../src/library/vue/index.js'

// -- Utils & Other -----------------------------------------------------
export * from '../src/utils/index.js'
export type * from '@nedykit/appkit-controllers'
export type { CaipNetwork, CaipAddress, CaipNetworkId } from '@nedykit/appkit-common'
export { CoreHelperUtil, AccountController } from '@nedykit/appkit-controllers'

let modal: AppKit | undefined = undefined

export type CreateAppKit = Omit<AppKitOptions, 'sdkType' | 'sdkVersion' | 'basic'>

export function createAppKit(options: CreateAppKit) {
  if (!modal) {
    modal = new AppKit({
      ...options,
      basic: true,
      sdkVersion: `vue-core-${PACKAGE_VERSION}`
    })
    getAppKit(modal)
  }

  return modal
}

export { AppKit }
export type { AppKitOptions }

// -- Hooks ------------------------------------------------------------
export function useAppKitNetwork(): Ref<UseAppKitNetworkReturn> {
  const state = ref({
    caipNetwork: ChainController.state.activeCaipNetwork,
    chainId: ChainController.state.activeCaipNetwork?.id,
    caipNetworkId: ChainController.state.activeCaipNetwork?.caipNetworkId,
    switchNetwork: (network: AppKitNetwork) => {
      modal?.switchNetwork(network)
    }
  })

  const unsubscribe = ChainController.subscribeKey('activeCaipNetwork', val => {
    state.value.caipNetwork = val
    state.value.chainId = val?.id
    state.value.caipNetworkId = val?.caipNetworkId
  })

  onUnmounted(() => {
    unsubscribe()
  })

  return state
}

export * from '../src/library/vue/index.js'
