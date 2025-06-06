import { CoreHelperUtil } from '@nedykit/appkit-controllers'

import { AppKit } from '../src/client/appkit.js'
import type { AppKitOptions } from '../src/utils/TypesUtil.js'
import { PACKAGE_VERSION } from './constants.js'

// -- Utils & Other -----------------------------------------------------
export * from '../src/utils/index.js'
export type * from '@nedykit/appkit-controllers'
export type { CaipNetwork, CaipAddress, CaipNetworkId } from '@nedykit/appkit-common'
export { CoreHelperUtil, AccountController } from '@nedykit/appkit-controllers'

export type CreateAppKit = Omit<AppKitOptions, 'sdkType' | 'sdkVersion' | 'basic'>

export function createAppKit(options: CreateAppKit) {
  return new AppKit({
    ...options,
    sdkVersion: CoreHelperUtil.generateSdkVersion(options.adapters ?? [], 'html', PACKAGE_VERSION)
  })
}

export { AppKit }
export type { AppKitOptions }
