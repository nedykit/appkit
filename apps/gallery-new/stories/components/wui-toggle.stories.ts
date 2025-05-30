import type { Meta } from '@storybook/web-components'

import { html } from 'lit'

import '@nedykit/appkit-ui-new/src/composites/wui-toggle'
import type { WuiToggle } from '@nedykit/appkit-ui-new/src/composites/wui-toggle'

import '../../components/gallery-container'

type Component = Meta<WuiToggle>

export default {
  title: 'Components/Toggle',
  args: {
    size: 'sm',
    disabled: false
  },
  argTypes: {
    disabled: { control: 'boolean' },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' }
    }
  }
} as Component

export const Default: Component = {
  render: args => html`
    <gallery-container width="200">
      <wui-toggle ?disabled=${args.disabled} size=${args.size}></wui-toggle>
    </gallery-container>
  `
}
