import type { Meta } from '@storybook/web-components'

import { html } from 'lit'

import '@nedykit/appkit-ui-new/src/composites/wui-tooltip'
import type { WuiTooltip } from '@nedykit/appkit-ui-new/src/composites/wui-tooltip'

import { placementOptions } from '../../utils/PresetUtils'

type Component = Meta<WuiTooltip>

export default {
  title: 'Components/Tooltip',
  args: {
    message: 'Tooltip',
    placement: 'top',
    size: 'md',
    variant: 'fill'
  },
  argTypes: {
    placement: {
      options: placementOptions,
      control: { type: 'select' }
    },
    size: {
      options: ['sm', 'md'],
      control: { type: 'select' }
    },
    variant: {
      options: ['fill', 'shade'],
      control: { type: 'select' }
    }
  }
} as Component

export const Default: Component = {
  render: args =>
    html`<wui-tooltip
      variant=${args.variant}
      placement=${args.placement}
      message=${args.message}
      size=${args.size}
    ></wui-tooltip>`
}
