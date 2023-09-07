import type { InjectionKey } from 'vue'
import type { FooterItemRect, FooterProps } from '../models/footer'

export type FooterItemContext = {
  uid: number
}

export type FooterContext = FooterProps & {
  items: FooterItemContext[]
  activeUid: number
  addItem: (item: FooterItemContext) => void
  removeItem: (uid: number) => void
  setActiveItem: (uid: number) => void
  setBulgeCircle: (rect: FooterItemRect) => void
}

export const footerContextKey: InjectionKey<FooterContext> =
  Symbol('footerContextKey')
