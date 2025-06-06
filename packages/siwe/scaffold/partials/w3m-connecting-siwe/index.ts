import { LitElement, html } from 'lit'

import { AccountController, OptionsController } from '@nedykit/appkit-controllers'
import { customElement } from '@nedykit/appkit-ui'

import styles from './styles.js'

@customElement('w3m-connecting-siwe')
export class W3mConnectingSiwe extends LitElement {
  public static override styles = styles

  // -- Members ------------------------------------------- //
  private readonly dappImageUrl = OptionsController.state.metadata?.icons

  private readonly walletImageUrl = AccountController.state.connectedWalletInfo?.icon

  public override firstUpdated() {
    const visuals = this.shadowRoot?.querySelectorAll('wui-visual-thumbnail')

    if (visuals?.[0]) {
      this.createAnimation(visuals[0] as HTMLElement, 'translate(18px)')
    }
    if (visuals?.[1]) {
      this.createAnimation(visuals[1] as HTMLElement, 'translate(-18px)')
    }
  }

  // -- Render -------------------------------------------- //
  public override render() {
    return html`
      <wui-visual-thumbnail
        ?borderRadiusFull=${true}
        .imageSrc=${this.dappImageUrl?.[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `
  }

  // -- Private ------------------------------------------- //
  private createAnimation(element: HTMLElement, translation: string) {
    element.animate([{ transform: 'translateX(0px)' }, { transform: translation }], {
      duration: 1600,
      easing: 'cubic-bezier(0.56, 0, 0.48, 1)',
      direction: 'alternate',
      iterations: Infinity
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-connecting-siwe': W3mConnectingSiwe
  }
}
