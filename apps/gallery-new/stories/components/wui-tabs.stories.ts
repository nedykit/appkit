import type { Meta } from '@storybook/web-components'

import { html } from 'lit'

import '@nedykit/appkit-ui-new/src/composites/wui-tabs'
import type { WuiTabs } from '@nedykit/appkit-ui-new/src/composites/wui-tabs'

type Component = Meta<WuiTabs>

export default {
  title: 'Components/Tabs',
  args: {
    size: 'md',
    tabs: [
      { icon: 'mobile', label: 'Mobile' },
      { icon: 'extension', label: 'Browser' },
      { icon: 'desktop', label: 'Desktop' }
    ],
    onTabChange: () => null
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' }
    }
  }
} as Component

export const Default: Component = {
  render: args =>
    html`<wui-tabs
      size=${args.size}
      .tabs=${args.tabs}
      .onTabChange=${args.onTabChange}
    ></wui-tabs>`
}
