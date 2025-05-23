import type { Meta } from '@storybook/web-components'

import { html } from 'lit'

import '@nedykit/appkit-ui/src/composites/wui-cta-button'
import type { WuiCtaButton } from '@nedykit/appkit-ui/src/composites/wui-cta-button'

import '../../components/gallery-container'

type Component = Meta<WuiCtaButton>

export default {
  title: 'Composites/wui-cta-button',
  args: {
    label: `Don't have MetaMask?`,
    buttonLabel: 'Get'
  }
} as Component

export const Default: Component = {
  render: args => html`
    <gallery-container width="336">
      <wui-cta-button label=${args.label} buttonLabel=${args.buttonLabel}></wui-cta-button>
    </gallery-container>
  `
}
