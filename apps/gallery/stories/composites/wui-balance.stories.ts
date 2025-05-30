import type { Meta } from '@storybook/web-components'

import { html } from 'lit'

import '@nedykit/appkit-ui/src/composites/wui-balance'
import type { WuiBalance } from '@nedykit/appkit-ui/src/composites/wui-balance'

type Component = Meta<WuiBalance>

export default {
  title: 'Composites/wui-balance',
  args: {
    dollars: '4,798',
    pennies: '75'
  }
} as Component

export const Default: Component = {
  render: args => html`<wui-balance pennies=${args.pennies} dollars=${args.dollars}></wui-balance>`
}
