import { buildProps, definePropType } from '../../../utils'
import { tabbarBaseProps } from '../../base/common-props/tabbar'

import type { ExtractPropTypes } from 'vue'
import type { BadgeProps } from '../../badge'

export type TabbarItemBadgeConfig = Partial<Pick<BadgeProps, 'dot'>>

export const tabbarItemProps = buildProps({
  ...tabbarBaseProps,
  /**
   * @description item的唯一标识，与modelValue对应
   */
  name: {
    type: [String, Number],
  },
  /**
   * @description 图标
   */
  icon: String,
  /**
   * @description 选中时的图标
   */
  activeIcon: String,
  /**
   * @description 文字
   */
  text: String,
  /**
   * @description item是否凸起
   */
  bulge: Boolean,
  /**
   * @description 凸起按钮背景颜色
   */
  bulgeBgColor: String,
  /**
   * @description 凸起按钮字体颜色
   */
  bulgeTextColor: String,
  /**
   * @description 角标的值
   */
  badge: {
    type: [String, Number],
  },
  /**
   * @description 角标配置
   */
  badgeConfig: {
    type: definePropType<TabbarItemBadgeConfig>(Object),
    default: () => ({}),
  },
  /**
   * @description 是否禁用
   */
  disabled: Boolean,
	invert: Boolean,
})

export const tabbatItemEmits = {
  /**
   * @description 点击事件
   */
  click: () => true,
}

export type TabbarItemProps = ExtractPropTypes<typeof tabbarItemProps>
export type TabbarItemEmits = typeof tabbatItemEmits
