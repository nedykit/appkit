import { proxy } from 'valtio/vanilla'

import type { ParsedCaipAddress } from '@nedykit/appkit-common'

// -- Types --------------------------------------------- //
export interface WalletButtonControllerState {
  data?: ParsedCaipAddress
  error?: Error
  ready?: boolean
  pending: boolean
}

// -- State --------------------------------------------- //
const state = proxy<WalletButtonControllerState>({
  ready: false,
  pending: false
})

// -- Controller ---------------------------------------- //
export const WalletButtonController = {
  state,

  setReady(ready: boolean) {
    state.ready = ready
  },

  setPending(pending: boolean) {
    state.pending = pending
  },

  setError(error?: Error) {
    state.error = error
  },

  setData(data: ParsedCaipAddress) {
    state.data = data
  }
}
