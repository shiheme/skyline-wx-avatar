import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace, useUniAppSystemRectInfo } from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'
import { detectionModel } from '@/common/mixin/detectionModel'

import type { CSSProperties } from 'vue'
import type { TabbarProps } from '../tabbar'

export const useTabbarCustomStyle = (props: TabbarProps) => {
  const ns = useNamespace('tabbar')
	const { skylineInfo } = useUniAppSystemRectInfo()

  // 解析颜色
  const [bgColorClass, bgColorStyle] = useComponentColor(
    toRef(props, 'bgColor'),
    'bg'
  )

  // tabbar对应的类
  const tabbarClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    // 是否固定在底部
    if (props.fixed) cls.push(ns.m('fixed'))

    // 是否预留安全距离
    // if (props.safeAreaInsetBottom) cls.push('tn-u-safe-area')

    // 是否有顶部阴影
    if (props.topShadow) cls.push(ns.m('top-shadow'))
	
	if(Number(props.tabbarStyle.position) === 2) {
		cls.push(ns.m('cool'))
	}

    return cls.join(' ')
  })
  // tabbar对应的样式
  const tabbarStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}
		
		const isSky = skylineInfo.issky
		style.position = isSky?'absolute':'fixed'

    // 设置zIndex
    if (props.zIndex) style.zIndex = props.zIndex
	
	

    // 设置高度
    // if (props.height) style.height = formatDomSizeValue(props.height)

    return style
  })

  // 背景颜色对应的类
  const bgClass = computed<string>(() => {
    const cls: string[] = [ns.e('bg')]

    // 设置背景颜色
    if (bgColorClass.value && !props.frosted) cls.push(bgColorClass.value)

    // 设置毛玻璃效果
    if (props.frosted) cls.push(ns.em('bg', 'frosted'))

    return cls.join(' ')
  })
  // 背景颜色对应的样式
  const bgStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置zIndex
    if (props.zIndex) style.zIndex = props.zIndex - 1

    // 设置背景颜色
    if (!bgColorClass.value)
      style.backgroundColor = bgColorStyle.value || 'var(--bee-BG-AIR)'
    if (props.frosted)
      style.backgroundColor = bgColorStyle.value || 'var(--bee-BG-AIR-95)'
    return style
  })

  // 占位容器对应的样式
  const placeholderStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置zIndex
    // if (props.zIndex) style.zIndex = props.zIndex - 2
		style.flexShrink = 0
    // 设置高度
    if (props.height) style.height = formatDomSizeValue(props.height)
		

    return style
  })
  
  // 占位容器对应的样式
  const safeAreaStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}
  
    // 设置zIndex
    // if (props.zIndex) style.zIndex = props.zIndex - 2

	if(Number(props.tabbarStyle.position) === 1&&detectionModel()){
		style.paddingBottom = '34px'
	} else {
		style.paddingBottom = '0px'
	}
	
	style.height = '0px'
  		
    return style
  })
  
  
  

  return {
    ns,
    tabbarClass,
    tabbarStyle,
    bgClass,
    bgStyle,
    placeholderStyle,
	safeAreaStyle,
  }
}
