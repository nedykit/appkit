import type { Meta } from '@storybook/web-components'

import { html } from 'lit'

import '@nedykit/appkit-ui/src/components/wui-card'
import type { WuiCard } from '@nedykit/appkit-ui/src/components/wui-card'

import '../../components/gallery-placeholder'

type Component = Meta<WuiCard>

export default {
  title: 'Components/wui-card'
} as Component

export const Default: Component = {
  render: () => html`
    <wui-card>
      <gallery-placeholder size="lg" margin background="blue"></gallery-placeholder>
    </wui-card>
  `
}
