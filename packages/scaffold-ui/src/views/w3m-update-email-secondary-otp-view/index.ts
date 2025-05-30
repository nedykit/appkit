import { CoreHelperUtil, EventsController, RouterController } from '@nedykit/appkit-controllers'
import { customElement } from '@nedykit/appkit-ui'

import { W3mEmailOtpWidget } from '../../utils/w3m-email-otp-widget/index.js'
import type { OnOtpSubmitFn } from '../../utils/w3m-email-otp-widget/index.js'

@customElement('w3m-update-email-secondary-otp-view')
export class W3mUpdateEmailSecondaryOtpView extends W3mEmailOtpWidget {
  public constructor() {
    super()
  }

  // --  Private ------------------------------------------ //
  override email = RouterController.state.data?.newEmail

  private redirectView = RouterController.state.data?.redirectView

  override onOtpSubmit: OnOtpSubmitFn = async otp => {
    try {
      if (this.authConnector) {
        await this.authConnector.provider.updateEmailSecondaryOtp({ otp })
        EventsController.sendEvent({ type: 'track', event: 'EMAIL_VERIFICATION_CODE_PASS' })

        if (this.redirectView) {
          RouterController.reset(this.redirectView)
        }
      }
    } catch (error) {
      EventsController.sendEvent({
        type: 'track',
        event: 'EMAIL_VERIFICATION_CODE_FAIL',
        properties: { message: CoreHelperUtil.parseError(error) }
      })
      throw error
    }
  }

  override onStartOver = () => {
    RouterController.replace('UpdateEmailWallet', RouterController.state.data)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-update-email-secondary-otp-view': W3mUpdateEmailSecondaryOtpView
  }
}
