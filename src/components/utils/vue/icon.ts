import { definePropType } from './props'

export const iconPropType = definePropType<string>([String])

export const FormValidateIconsMap = {
  validating: 'loading',
  success: 'checkbox-circle-fill',
  error: 'close-circle-fill',
}
