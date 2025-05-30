import { LitElement, html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { ConstantsUtil } from '@nedykit/appkit-common'
import type { Connector } from '@nedykit/appkit-controllers'
import { AssetUtil, ConnectorController, RouterController } from '@nedykit/appkit-controllers'
import { customElement } from '@nedykit/appkit-ui'
import '@nedykit/appkit-ui/wui-flex'
import '@nedykit/appkit-ui/wui-list-wallet'

@customElement('w3m-connect-external-widget')
export class W3mConnectExternalWidget extends LitElement {
  // -- Members ------------------------------------------- //
  private unsubscribe: (() => void)[] = []

  // -- State & Properties -------------------------------- //
  @property() public tabIdx?: number = undefined

  @state() private connectors = ConnectorController.state.connectors

  public constructor() {
    super()
    this.unsubscribe.push(
      ConnectorController.subscribeKey('connectors', val => (this.connectors = val))
    )
  }

  public override disconnectedCallback() {
    this.unsubscribe.forEach(unsubscribe => unsubscribe())
  }

  // -- Render -------------------------------------------- //
  public override render() {
    const externalConnectors = this.connectors.filter(connector => connector.type === 'EXTERNAL')
    const filteredOutCoinbaseConnectors = externalConnectors.filter(
      connector => connector.id !== ConstantsUtil.CONNECTOR_ID.COINBASE_SDK
    )

    if (!filteredOutCoinbaseConnectors?.length) {
      this.style.cssText = `display: none`

      return null
    }

    return html`
      <wui-flex flexDirection="column" gap="xs">
        ${filteredOutCoinbaseConnectors.map(
          connector => html`
            <wui-list-wallet
              imageSrc=${ifDefined(AssetUtil.getConnectorImage(connector))}
              .installed=${true}
              name=${connector.name ?? 'Unknown'}
              data-testid=${`wallet-selector-external-${connector.id}`}
              @click=${() => this.onConnector(connector)}
              tabIdx=${ifDefined(this.tabIdx)}
            >
            </wui-list-wallet>
          `
        )}
      </wui-flex>
    `
  }

  // -- Private Methods ----------------------------------- //
  private onConnector(connector: Connector) {
    RouterController.push('ConnectingExternal', { connector })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-connect-external-widget': W3mConnectExternalWidget
  }
}
