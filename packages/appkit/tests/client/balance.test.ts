import { beforeEach, describe, expect, it, vi } from 'vitest'

import { NetworkUtil } from '@nedykit/appkit-common'
import { AccountController } from '@nedykit/appkit-controllers'

import { AppKit } from '../../src/client/appkit.js'
import { mockEvmAdapter } from '../mocks/Adapter.js'
import { base, mainnet, sepolia } from '../mocks/Networks.js'
import { mockOptions } from '../mocks/Options.js'
import {
  mockBlockchainApiController,
  mockStorageUtil,
  mockWindowAndDocument
} from '../test-utils.js'

describe('Balance sync', () => {
  beforeEach(() => {
    mockWindowAndDocument()
    mockStorageUtil()
    mockBlockchainApiController()
  })

  it.sequential('should not sync balance if theres no matching caipNetwork', async () => {
    const getNetworksByNamespaceSpy = vi.spyOn(NetworkUtil, 'getNetworksByNamespace')
    const setBalanceSpy = vi.spyOn(AccountController, 'setBalance')

    const appKit = new AppKit(mockOptions)
    await appKit['syncBalance']({
      address: '0x123',
      chainId: base.id,
      chainNamespace: base.chainNamespace
    })

    expect(getNetworksByNamespaceSpy).toHaveBeenCalled()
    expect(mockEvmAdapter.getBalance).not.toHaveBeenCalled()
    expect(setBalanceSpy).not.toHaveBeenCalled()
  })

  it.sequential('should fetch native balance on testnet', async () => {
    const getNetworksByNamespaceSpy = vi.spyOn(NetworkUtil, 'getNetworksByNamespace')
    const setBalanceSpy = vi.spyOn(AccountController, 'setBalance')
    const mockAccount = {
      address: '0x123',
      chainId: sepolia.id,
      chainNamespace: sepolia.chainNamespace
    }

    const appKit = new AppKit({ ...mockOptions, networks: [sepolia] })
    await appKit['syncAccount'](mockAccount)

    expect(getNetworksByNamespaceSpy).toHaveBeenCalled()
    expect(mockEvmAdapter.getBalance).toHaveBeenCalled()
    expect(setBalanceSpy).toHaveBeenCalledWith('1.00', 'ETH', sepolia.chainNamespace)
  })

  it.sequential('should set the correct native token balance', async () => {
    const getNetworksByNamespaceSpy = vi.spyOn(NetworkUtil, 'getNetworksByNamespace')
    const setBalanceSpy = vi.spyOn(AccountController, 'setBalance')

    const appKit = new AppKit(mockOptions)
    await appKit['syncBalance']({
      address: '0x123',
      chainId: mainnet.id,
      chainNamespace: mainnet.chainNamespace
    })

    expect(getNetworksByNamespaceSpy).toHaveBeenCalled()
    expect(mockEvmAdapter.getBalance).toHaveBeenCalled()
    expect(setBalanceSpy).toHaveBeenCalledWith('1.00', 'ETH', 'eip155')
  })
})
