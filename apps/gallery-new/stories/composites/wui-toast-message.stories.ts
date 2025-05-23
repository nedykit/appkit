import type { Meta } from '@storybook/web-components'

import { html } from 'lit'

import '@nedykit/appkit-ui-new/src/composites/wui-toast-message'
import type { WuiToastMessage } from '@nedykit/appkit-ui-new/src/composites/wui-toast-message'

import '../../components/gallery-container'
import { toastMessageOptions } from '../../utils/PresetUtils'

type Component = Meta<WuiToastMessage>

export default {
  title: 'Composites/wui-toast-message',
  args: {
    message: 'Title',
    variant: 'info'
  },
  argTypes: {
    message: {
      control: { type: 'text' }
    },
    variant: {
      options: toastMessageOptions,
      control: { type: 'select' }
    }
  }
} as Component

export const Default: Component = {
  render: args => html`
    <gallery-container width="336">
      <wui-toast-message variant=${args.variant} message=${args.message}> </wui-toast-message>
    </gallery-container>
  `
}
