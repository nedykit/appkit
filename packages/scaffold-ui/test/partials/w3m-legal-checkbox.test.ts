import { elementUpdated, fixture } from '@open-wc/testing'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { html } from 'lit'

import { OptionsController, OptionsStateController } from '@nedykit/appkit-controllers'

import { W3mLegalCheckbox } from '../../src/partials/w3m-legal-checkbox/index'
import { HelpersUtil } from '../utils/HelpersUtil'

// --- Constants ---------------------------------------------------- //
const CHECKBOX_TEST_ID = 'wui-checkbox'

const TERMS_CONDITIONS_URL = 'https://example.com/terms'
const PRIVACY_POLICY_URL = 'https://example.com/privacy'

describe('W3mLegalCheckbox', () => {
  beforeAll(() => {
    vi.spyOn(OptionsController, 'state', 'get').mockReturnValue({
      ...OptionsController.state,
      termsConditionsUrl: TERMS_CONDITIONS_URL,
      privacyPolicyUrl: PRIVACY_POLICY_URL,
      features: {
        legalCheckbox: true
      }
    })
  })

  it('it should return checkbox if legalCheckbox is true', async () => {
    const element: W3mLegalCheckbox = await fixture(html`<w3m-legal-checkbox></w3m-legal-checkbox>`)

    const checkbox = HelpersUtil.querySelect(element, CHECKBOX_TEST_ID)
    expect(checkbox).toBeDefined()
    expect(HelpersUtil.getTextContent(checkbox)).toBe(
      'I agree to our terms of service and privacy policy'
    )
  })

  it('it should not return checkbox if legalCheckbox is false', async () => {
    vi.spyOn(OptionsController, 'state', 'get').mockReturnValue({
      ...OptionsController.state,
      features: {
        legalCheckbox: false
      }
    })

    const element: W3mLegalCheckbox = await fixture(html`<w3m-legal-checkbox></w3m-legal-checkbox>`)

    element.requestUpdate()
    await elementUpdated(element)

    expect(HelpersUtil.querySelect(element, CHECKBOX_TEST_ID)).toBeNull()
  })

  it('it should return checkbox if either termsConditionsUrl or privacyPolicyUrl are defined', async () => {
    vi.spyOn(OptionsController, 'state', 'get').mockReturnValue({
      ...OptionsController.state,
      privacyPolicyUrl: undefined,
      features: {
        legalCheckbox: true
      }
    })

    const element: W3mLegalCheckbox = await fixture(html`<w3m-legal-checkbox></w3m-legal-checkbox>`)

    element.requestUpdate()
    await elementUpdated(element)

    const checkbox = HelpersUtil.querySelect(element, CHECKBOX_TEST_ID)
    expect(checkbox).toBeDefined()
    expect(HelpersUtil.getTextContent(checkbox)).toBe('I agree to our terms of service')
  })

  it('it should not return checkbox if both termsConditionsUrl and privacyPolicyUrl are not defined', async () => {
    vi.spyOn(OptionsController, 'state', 'get').mockReturnValue({
      ...OptionsController.state,
      termsConditionsUrl: undefined,
      privacyPolicyUrl: undefined
    })

    const element: W3mLegalCheckbox = await fixture(html`<w3m-legal-checkbox></w3m-legal-checkbox>`)

    element.requestUpdate()
    await elementUpdated(element)

    expect(HelpersUtil.querySelect(element, CHECKBOX_TEST_ID)).toBeNull()
  })

  it('should render checked checkbox when isLegalCheckboxChecked is true', async () => {
    vi.spyOn(OptionsController, 'state', 'get').mockReturnValue({
      ...OptionsController.state,
      termsConditionsUrl: TERMS_CONDITIONS_URL,
      privacyPolicyUrl: PRIVACY_POLICY_URL,
      features: {
        legalCheckbox: true
      }
    })
    vi.spyOn(OptionsStateController, 'state', 'get').mockReturnValue({
      ...OptionsStateController.state,
      isLegalCheckboxChecked: true
    })

    const element: W3mLegalCheckbox = await fixture(html`<w3m-legal-checkbox></w3m-legal-checkbox>`)

    const checkbox = HelpersUtil.getByTestId(element, CHECKBOX_TEST_ID)
    expect(checkbox).not.toBeNull()
    expect(checkbox?.getAttribute('checked')).not.toBeNull()
  })
})
