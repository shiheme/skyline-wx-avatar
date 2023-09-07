import type { InjectionKey } from 'vue'
import type { CheckboxGroupProps, CheckboxGroupValueType } from '../models'

export interface CheckboxGroupContext extends CheckboxGroupProps {
  changeEvent: (val: CheckboxGroupValueType[number]) => void
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> =
  Symbol('checkboxGroupKey')
