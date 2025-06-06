import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { ChainNamespace, SdkVersion } from '@nedykit/appkit-common'
import { AlertController, OptionsController } from '@nedykit/appkit-controllers'
import { ErrorUtil } from '@nedykit/appkit-utils'

import type { AdapterBlueprint } from '../../src/adapters'
import { AppKitBaseClient, type AppKitOptionsWithSdk } from '../../src/client/appkit-base-client'

// Create a mock implementation of AppKitBaseClient
class TestAppKitCore extends AppKitBaseClient {
  // Implement the abstract method
  protected async injectModalUi(): Promise<void> {
    // No-op for testing
  }

  public override async syncIdentity(
    _request: Pick<AdapterBlueprint.ConnectResult, 'address' | 'chainId'> & {
      chainNamespace: ChainNamespace
    }
  ): Promise<void> {
    // No-op for testing
  }
}

describe('AppKit Debug Mode', () => {
  const mockOptions = {
    projectId: '',
    sdkVersion: 'test-version' as SdkVersion,
    networks: [],
    adapters: []
  } as unknown as AppKitOptionsWithSdk

  beforeEach(() => {
    // Reset controller states before each test
    vi.clearAllMocks()

    // Spy on AlertController.open
    vi.spyOn(AlertController, 'open')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should show alert bar if Project ID is not configured', () => {
    // Create AppKit with debug mode enabled (default)
    new TestAppKitCore({
      ...mockOptions
    })

    // Verify the alert was shown
    expect(AlertController.open).toHaveBeenCalledWith(
      ErrorUtil.ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED,
      'error'
    )
  })

  it('should not show alert bar if projectId is configured', () => {
    // Create AppKit with debug mode disabled
    new TestAppKitCore({
      ...mockOptions,
      projectId: 'test-project-id'
    })

    // Verify no alert was shown
    expect(AlertController.open).not.toHaveBeenCalled()
  })

  it('should set debug mode to true by default', () => {
    // Create AppKit without explicitly setting debug mode
    new TestAppKitCore(mockOptions)

    // Verify debug mode is set to true by default
    expect(OptionsController.state.debug).toBe(true)
  })

  it('should respect explicit debug mode setting', () => {
    // Create AppKit with debug mode set to false
    new TestAppKitCore({
      ...mockOptions,
      debug: false
    })

    // Verify debug mode is set to false
    expect(OptionsController.state.debug).toBe(false)
  })
})
