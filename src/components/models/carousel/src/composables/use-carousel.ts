import { computed, nextTick, ref, watch } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants'

import type { SetupContext } from 'vue'
import type { CarouselEmits, CarouselProps } from '../carousel'

export const useCarousel = (
  props: CarouselProps,
  emits: SetupContext<CarouselEmits>['emit']
) => {
  // 当前选中的CarouselItem索引
  const currentCarouselIndex = ref<number>(props?.modelValue ?? 0)

  watch(
    () => props.modelValue,
    (value) => (currentCarouselIndex.value = value ?? 0)
  )

  // carousel数量
  const carouselCount = computed<number>(() => props.data?.length || 0)

  // 处理carousel滑动事件
  const carouselChangeHandle = (event: any) => {
    const { current } = event.detail
    if (props.modelValue === undefined || props.modelValue === 0)
      currentCarouselIndex.value = current
    emits(UPDATE_MODEL_EVENT, current)
    nextTick(() => {
      emits(CHANGE_EVENT, current)
    })
  }

  // 处理item点击事件
  const itemClickHandle = () => {
    emits('item-click', currentCarouselIndex.value)
  }

  return {
    currentCarouselIndex,
    carouselCount,
    carouselChangeHandle,
    itemClickHandle,
  }
}
