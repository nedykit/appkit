import type { Meta } from '@storybook/web-components'

import { html } from 'lit'

import '@nedykit/appkit-ui-new/src/components/wui-loading-hexagon'
import type { WuiLoadingHexagon } from '@nedykit/appkit-ui-new/src/components/wui-loading-hexagon'

type Component = Meta<WuiLoadingHexagon>

export default {
  title: 'Composites/wui-loading-hexagon'
} as Component

export const Default: Component = {
  render: () => html` <wui-loading-hexagon></wui-loading-hexagon>`
}
