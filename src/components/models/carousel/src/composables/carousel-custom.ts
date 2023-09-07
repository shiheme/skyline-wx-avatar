import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { CarouselProps } from '../carousel'

type IndicatorColorClass = (active : boolean) => string
type IndicatorColorStyle = (active : boolean) => CSSProperties
type CarouselColorStyle = (active : boolean) => CSSProperties
type CarouselItemColorStyle = (active : boolean) => CSSProperties

export const useCarouselCustomStyle = (props : CarouselProps) => {
	const ns = useNamespace('carousel')

	// 解析颜色
	const [indicatorBgColorClass, indicatorBgColoeStyle] = useComponentColor(
		toRef(props, 'indicatorBgColor'),
		'bg'
	)
	const [indicatorTextColorClass, indicatorTextColorStyle] = useComponentColor(
		toRef(props, 'indicatorTextColor'),
		'text'
	)
	const [indicatorActiveBgColorClass, indicatorActiveBgColorStyle] =
		useComponentColor(toRef(props, 'indicatorActiveBgColor'), 'bg')

	// carousel对应的样式
	const carouselStyle = computed<CSSProperties>(() => {
		const style : CSSProperties = {}

		if (props.width !== undefined) style.width = formatDomSizeValue(props.width)
		if (props.height !== undefined)
			style.height = formatDomSizeValue(props.height)

		return style
	})

	// 指示器颜色对应的样式
	const carouselColorStyle = computed<CarouselColorStyle>(() => {
		return (active : boolean) => {
			const style : CSSProperties = {}
			if (active) {
				style.opacity = 1
			} else {
				style.opacity = 0
			}
			
			style.height = formatDomSizeValue(props.height)

			return style
		}
	})
	
	const carouselItemColorStyle = computed<CarouselItemColorStyle>(() => {
		return (active : boolean) => {
			const style : CSSProperties = {}
			if (active) {
				style.width = props.
				style.height = 1
				style.transform = 1
				style.transformOrigin = 
				style.opacity = 1
			} else {
				style.opacity = 0
			}
			
			style.transition = formatDomSizeValue(props.height)
	
			return style
		}
	})

	// 指示器颜色对应的类
	const indicatorColorClass = computed<IndicatorColorClass>(() => {
		return (active : boolean) => {
			const cls : string[] = []
				if (active) {
					if (indicatorActiveBgColorClass.value)
						cls.push(indicatorActiveBgColorClass.value)
				} else {
					if (indicatorBgColorClass.value) cls.push(indicatorBgColorClass.value)
				}
			

			return cls.join(' ')
		}
	})

	// 指示器颜色对应的样式
	const indicatorColorStyle = computed<IndicatorColorStyle>(() => {
		return (active : boolean) => {
			const style : CSSProperties = {}

			
				if (active) {
						style.backgroundColor = 'var(--tn-color-white)'
				} else {
						style.backgroundColor = 'rgba(0, 0, 0, 0.25)'
				}

			return style
		}
	})

	return {
		ns,
		carouselStyle,
		carouselColorStyle,
		carouselItemColorStyle,
		indicatorColorClass,
		indicatorColorStyle,
	}
}