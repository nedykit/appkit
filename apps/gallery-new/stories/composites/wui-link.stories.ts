import type { Meta } from '@storybook/web-components'

import { html } from 'lit'

import '@nedykit/appkit-ui-new/src/composites/wui-link'
import type { WuiLink } from '@nedykit/appkit-ui-new/src/composites/wui-link'
import type { IconType } from '@nedykit/appkit-ui-new/src/utils/TypeUtil'

import { buttonLinkOptions } from '../../utils/PresetUtils'

type Component = Meta<WuiLink & { iconLeft?: IconType; iconRight?: IconType }>

export default {
  title: 'Composites/wui-link',
  args: {
    disabled: false,
    variant: 'accent',
    size: 'md'
  },
  argTypes: {
    size: {
      options: ['sm', 'md'],
      control: { type: 'select' }
    },
    disabled: {
      control: { type: 'boolean' },
      variant: { type: 'boolean' }
    },
    variant: {
      options: buttonLinkOptions,
      control: { type: 'select' }
    }
  }
} as Component

export const Default: Component = {
  render: args => html`
    <wui-link ?disabled=${args.disabled} size=${args.size} variant=${args.variant}>Link</wui-link>
  `
}
