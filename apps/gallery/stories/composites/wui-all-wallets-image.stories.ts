import type { Meta } from '@storybook/web-components'

import { html } from 'lit'

import '@nedykit/appkit-ui/src/composites/wui-all-wallets-image'
import type { WuiAllWalletsImage } from '@nedykit/appkit-ui/src/composites/wui-all-wallets-image'

import { walletImagesOptions } from '../../utils/PresetUtils'

type Component = Meta<WuiAllWalletsImage>

export default {
  title: 'Composites/wui-all-wallets-image',
  args: {
    walletImages: walletImagesOptions
  }
} as Component

export const Default: Component = {
  render: args =>
    html`<wui-all-wallets-image .walletImages=${args.walletImages}></wui-all-wallets-image>`
}
