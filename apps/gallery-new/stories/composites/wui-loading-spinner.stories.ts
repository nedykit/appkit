import type { Meta } from '@storybook/web-components'

import { html } from 'lit'

import '@nedykit/appkit-ui-new/src/components/wui-loading-spinner'
import type { WuiLoadingSpinner } from '@nedykit/appkit-ui-new/src/components/wui-loading-spinner'

import { colorOptions } from '../../utils/PresetUtils'

type Component = Meta<WuiLoadingSpinner>

export default {
  title: 'Composites/wui-loading-spinner',
  args: {
    color: 'accent-100',
    size: 'lg'
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' }
    },
    color: {
      options: colorOptions,
      control: { type: 'select' }
    }
  }
} as Component

export const Default: Component = {
  render: args => html`
    <wui-loading-spinner size=${args.size} color=${args.color}></wui-loading-spinner>
  `
}
