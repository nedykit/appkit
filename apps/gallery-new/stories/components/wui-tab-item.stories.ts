import type { Meta } from '@storybook/web-components'

import { html } from 'lit'

import '@nedykit/appkit-ui-new/src/composites/wui-tab-item'
import type { WuiTab } from '@nedykit/appkit-ui-new/src/composites/wui-tab-item'

import { iconOptions } from '../../utils/PresetUtils'

type Component = Meta<WuiTab>

export default {
  title: 'Components/Tab Item',
  args: {
    icon: 'mobile',
    size: 'md',
    label: 'Tab',
    active: false
  },
  argTypes: {
    icon: {
      options: iconOptions,
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' }
    },
    label: {
      control: { type: 'text' }
    },
    active: {
      control: { type: 'boolean' }
    }
  }
} as Component

export const Default: Component = {
  render: args =>
    html`<wui-tab-item
      icon=${args.icon}
      size=${args.size}
      label=${args.label}
      ?active=${args.active}
    ></wui-tab-item>`
}
