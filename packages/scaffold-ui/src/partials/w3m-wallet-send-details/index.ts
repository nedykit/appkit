import { LitElement, html } from 'lit'
import { property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { type CaipNetwork } from '@nedykit/appkit-common'
import { AssetUtil, RouterController } from '@nedykit/appkit-controllers'
import { UiHelperUtil, customElement } from '@nedykit/appkit-ui'
import '@nedykit/appkit-ui/wui-flex'
import '@nedykit/appkit-ui/wui-list-content'
import '@nedykit/appkit-ui/wui-text'

import styles from './styles.js'

@customElement('w3m-wallet-send-details')
export class W3mWalletSendDetails extends LitElement {
  public static override styles = styles

  // -- State & Properties -------------------------------- //
  @property() public receiverAddress?: string

  @property({ type: Object }) public caipNetwork?: CaipNetwork

  @property({ type: Number }) public networkFee?: number

  // -- Render -------------------------------------------- //
  public override render() {
    return html` <wui-text variant="small-400" color="fg-200">Details</wui-text>
      <wui-flex flexDirection="column" gap="xxs">
        <wui-list-content textTitle="Network cost" textValue="$${ifDefined(
          UiHelperUtil.formatNumberToLocalString(this.networkFee, 2)
        )}"></wui-list-content></wui-list-content>
        <wui-list-content
          textTitle="Address"
          textValue=${UiHelperUtil.getTruncateString({
            string: this.receiverAddress ?? '',
            charsStart: 4,
            charsEnd: 4,
            truncate: 'middle'
          })}
        >
        </wui-list-content>
        ${this.networkTemplate()}
      </wui-flex>`
  }

  // -- Private ------------------------------------------- //
  private networkTemplate() {
    if (this.caipNetwork?.name) {
      return html` <wui-list-content
        @click=${() => this.onNetworkClick(this.caipNetwork)}
        class="network"
        textTitle="Network"
        imageSrc=${ifDefined(AssetUtil.getNetworkImage(this.caipNetwork))}
      ></wui-list-content>`
    }

    return null
  }

  private onNetworkClick(network?: CaipNetwork) {
    if (network) {
      RouterController.push('Networks', { network })
    }
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'w3m-wallet-send-details': W3mWalletSendDetails
  }
}
