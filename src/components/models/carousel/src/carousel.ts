import { buildProps, definePropType, isNumber } from '../../../utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'

import type { ExtractPropTypes } from 'vue'

export const carouselIndicatorPosition = [
  'left-top',
  'center-top',
  'right-top',
  'left-bottom',
  'center-bottom',
  'right-bottom',
] as const
export type CarouselIndicatorPosition = (typeof carouselIndicatorPosition)[number]

export const carouselIndicatorType = ['line', 'dot', 'number'] as const
export type CarouselIndicatorType = (typeof carouselIndicatorType)[number]

export const carouselProps = buildProps({
  //播放的banner
      listBanner: {
        type: Array,
        default: () => []
      },
      //banner自动播放的间隔时间
      interval: {
        type: Number,
        default: 3000
      },
      //是否自动播放banner
      autoSwitch: {
        type: Boolean,
        default: true
      },
      //banner高度
      height: {
        type: [String, Number],
        default: '400px'
      }
})

export const carouselEmits = {
  [UPDATE_MODEL_EVENT]: (value: number) => isNumber(value),
  /**
   * @description 选项发生改变时触发
   */
  [CHANGE_EVENT]: (value: number) => isNumber(value),
  /**
   * @description item点击事件
   */
  'item-click': (value: number) => isNumber(value),
}

export type CarouselProps = ExtractPropTypes<typeof carouselProps>
export type CarouselEmits = typeof carouselEmits
