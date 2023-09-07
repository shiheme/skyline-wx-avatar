import { computed, inject, ref, unref } from 'vue'
import { isNumber } from '../../utils'

import type { InjectionKey, Ref } from 'vue'

const zIndex = ref(0)
const defaultInitialZIndex = 2000

export const zIndexContextKey: InjectionKey<Ref<number | undefined>> =
  Symbol('zIndexContextKey')

export const useZIndex = () => {
  const zIndexInjection = inject(zIndexContextKey, undefined)
  const initialZIndex = computed(() => {
    const zIndexFromInjection = unref(zIndexInjection)
    return isNumber(zIndexFromInjection)
      ? zIndexFromInjection
      : defaultInitialZIndex
  })

  const currentZIndex = computed(() => initialZIndex.value + zIndex.value)

  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }

  const prevZIndex = () => {
    zIndex.value--
    return currentZIndex.value
  }

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex,
    prevZIndex,
  }
}
