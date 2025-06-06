import type { Meta } from '@storybook/web-components'

import { html } from 'lit'

import '@nedykit/appkit-ui-new/src/components/wui-loading-thumbnail'
import type { WuiLoadingThumbnail } from '@nedykit/appkit-ui-new/src/components/wui-loading-thumbnail'

type Component = Meta<WuiLoadingThumbnail>

export default {
  title: 'Composites/wui-loading-thumbnail',
  args: {
    radius: 36
  }
} as Component

export const Default: Component = {
  render: args => html` <wui-loading-thumbnail radius=${args.radius}></wui-loading-thumbnail>`
}
