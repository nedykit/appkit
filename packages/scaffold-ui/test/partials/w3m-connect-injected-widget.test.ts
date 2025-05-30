import { elementUpdated, fixture } from '@open-wc/testing'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { html } from 'lit'

import { ConstantsUtil } from '@nedykit/appkit-common'
import type { ConnectorType, ConnectorWithProviders } from '@nedykit/appkit-controllers'
import {
  ApiController,
  ConnectionController,
  ConnectorController,
  CoreHelperUtil,
  RouterController
} from '@nedykit/appkit-controllers'

import { W3mConnectInjectedWidget } from '../../src/partials/w3m-connect-injected-widget'
import { HelpersUtil } from '../utils/HelpersUtil'

// --- Constants ---------------------------------------------------- //
const MOCK_INJECTED_CONNECTOR: ConnectorWithProviders = {
  id: 'mockInjected',
  name: 'Mock Injected Wallet',
  type: 'INJECTED' as ConnectorType,
  info: {
    rdns: 'mock.injected.wallet'
  },
  provider: undefined,
  chain: ConstantsUtil.CHAIN.EVM
}

const BROWSER_WALLET_CONNECTOR: ConnectorWithProviders = {
  id: 'browserWallet',
  name: 'Browser Wallet',
  type: 'INJECTED' as ConnectorType,
  provider: undefined,
  chain: ConstantsUtil.CHAIN.EVM
}

describe('W3mConnectInjectedWidget', () => {
  beforeAll(() => {
    vi.spyOn(CoreHelperUtil, 'isMobile').mockReturnValue(false)
  })

  beforeEach(() => {
    vi.spyOn(ApiController, 'state', 'get').mockReturnValue({
      ...ApiController.state,
      excludedWallets: []
    })
    vi.spyOn(ConnectionController, 'checkInstalled').mockReturnValue(true)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should not render anything if there are no injected connectors', async () => {
    const element: W3mConnectInjectedWidget = await fixture(
      html`<w3m-connect-injected-widget .connectors=${[]}></w3m-connect-injected-widget>`
    )

    expect(element.style.display).toBe('none')
  })

  it('should render injected connectors', async () => {
    const element: W3mConnectInjectedWidget = await fixture(
      html`<w3m-connect-injected-widget
        .connectors=${[MOCK_INJECTED_CONNECTOR]}
      ></w3m-connect-injected-widget>`
    )

    element.requestUpdate()
    await elementUpdated(element)

    const walletSelector = HelpersUtil.getByTestId(
      element,
      `wallet-selector-${MOCK_INJECTED_CONNECTOR.id}`
    )
    expect(walletSelector).not.toBeNull()
    expect(walletSelector.getAttribute('name')).toBe(MOCK_INJECTED_CONNECTOR.name)
    expect(walletSelector.getAttribute('tagLabel')).toBe('installed')
    expect(walletSelector.getAttribute('tagVariant')).toBe('success')
  })

  it('should not render excluded RDNS wallets', async () => {
    vi.spyOn(ApiController, 'state', 'get').mockReturnValue({
      ...ApiController.state,
      excludedWallets: [{ name: 'Mock Wallet', rdns: 'mock.injected.wallet' }]
    })

    const element: W3mConnectInjectedWidget = await fixture(
      html`<w3m-connect-injected-widget
        .connectors=${[MOCK_INJECTED_CONNECTOR]}
      ></w3m-connect-injected-widget>`
    )

    element.requestUpdate()
    await elementUpdated(element)

    const walletSelector = HelpersUtil.getByTestId(
      element,
      `wallet-selector-${MOCK_INJECTED_CONNECTOR.id}`
    )

    expect(walletSelector).toBeNull()
  })

  it('should not render Browser Wallet on desktop', async () => {
    vi.spyOn(CoreHelperUtil, 'isMobile').mockReturnValue(false)

    const element: W3mConnectInjectedWidget = await fixture(
      html`<w3m-connect-injected-widget
        .connectors=${[BROWSER_WALLET_CONNECTOR]}
      ></w3m-connect-injected-widget>`
    )

    element.requestUpdate()
    await elementUpdated(element)

    const walletSelector = HelpersUtil.getByTestId(
      element,
      `wallet-selector-${BROWSER_WALLET_CONNECTOR.id}`
    )
    expect(walletSelector).toBeNull()
  })

  it('should render Browser Wallet on mobile', async () => {
    vi.spyOn(CoreHelperUtil, 'isMobile').mockReturnValue(true)

    const element: W3mConnectInjectedWidget = await fixture(
      html`<w3m-connect-injected-widget
        .connectors=${[BROWSER_WALLET_CONNECTOR]}
      ></w3m-connect-injected-widget>`
    )

    element.requestUpdate()
    await elementUpdated(element)

    const walletSelector = HelpersUtil.getByTestId(
      element,
      `wallet-selector-${BROWSER_WALLET_CONNECTOR.id}`
    )
    expect(walletSelector).not.toBeNull()
  })

  it('should route to ConnectingExternal on connector click', async () => {
    const setActiveConnectorSpy = vi.spyOn(ConnectorController, 'setActiveConnector')
    const pushSpy = vi.spyOn(RouterController, 'push')

    const element: W3mConnectInjectedWidget = await fixture(
      html`<w3m-connect-injected-widget
        .connectors=${[MOCK_INJECTED_CONNECTOR]}
      ></w3m-connect-injected-widget>`
    )

    const walletSelector = HelpersUtil.getByTestId(
      element,
      `wallet-selector-${MOCK_INJECTED_CONNECTOR.id}`
    )
    walletSelector.click()

    expect(setActiveConnectorSpy).toHaveBeenCalledWith(MOCK_INJECTED_CONNECTOR)
    expect(pushSpy).toHaveBeenCalledWith('ConnectingExternal', {
      connector: MOCK_INJECTED_CONNECTOR
    })
  })

  it('should handle unknown wallet names', async () => {
    const unknownConnector: ConnectorWithProviders = {
      ...MOCK_INJECTED_CONNECTOR,
      name: undefined
    } as unknown as ConnectorWithProviders

    const element: W3mConnectInjectedWidget = await fixture(
      html`<w3m-connect-injected-widget
        .connectors=${[unknownConnector]}
      ></w3m-connect-injected-widget>`
    )

    const walletSelector = HelpersUtil.getByTestId(
      element,
      `wallet-selector-${unknownConnector.id}`
    )
    expect(walletSelector.getAttribute('name')).toBe('Unknown')
  })

  it('should not render when no RDNS and not installed', async () => {
    const noRdnsConnector: ConnectorWithProviders = {
      ...MOCK_INJECTED_CONNECTOR,
      info: undefined
    }

    vi.spyOn(ConnectionController, 'checkInstalled').mockReturnValue(false)

    const element: W3mConnectInjectedWidget = await fixture(
      html`<w3m-connect-injected-widget
        .connectors=${[noRdnsConnector]}
      ></w3m-connect-injected-widget>`
    )

    expect(element.style.display).toBe('none')
  })
})
