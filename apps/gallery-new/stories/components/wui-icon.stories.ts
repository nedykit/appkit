import type { Meta } from '@storybook/web-components'

import { html } from 'lit'

import '@nedykit/appkit-ui-new/src/components/wui-icon'
import type { WuiIcon } from '@nedykit/appkit-ui-new/src/components/wui-icon'

import { colorOptions, iconOptions } from '../../utils/PresetUtils'

type Component = Meta<WuiIcon>

export default {
  title: 'Components/Icon',
  args: {
    size: 'md',
    name: 'copy',
    color: 'default'
  },
  argTypes: {
    size: {
      options: ['xxs', 'xs', 'sm', 'md', 'lg'],
      control: { type: 'select' }
    },
    name: {
      options: iconOptions,
      control: { type: 'select' }
    },
    color: {
      options: colorOptions,
      control: { type: 'select' }
    }
  }
} as Component

export const Default: Component = {
  render: args =>
    html`<wui-icon color=${args.color} size=${args.size} name=${args.name}></wui-icon>`
}
