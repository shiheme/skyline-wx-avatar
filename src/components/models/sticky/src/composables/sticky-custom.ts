import { computed } from 'vue'
import { useNamespace, useUniAppSystemRectInfo } from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties, Ref } from 'vue'
import type { StickyProps } from '../sticky'
import type { StickyRectInfo } from '../types'

export const useStickyCustomStyle = (
	props : StickyProps,
	// suppoerCSSSticky: Ref<boolean | null>,
	stickyDistance : Ref<number>,
	stickyStatus : Ref<boolean>,
	stickyRectInfo : Ref<StickyRectInfo>
) => {
	const ns = useNamespace('sticky')
	const { skylineInfo, navBarInfo, navBarBoundingInfo } = useUniAppSystemRectInfo()


	// sticky样式
	const stickyStyle = computed<CSSProperties>(() => {
		const style : CSSProperties = {}
		const isSky = skylineInfo.issky

		// 开启吸顶
		if (props.enabled) {
			// 是否支持css sticky
			// if (suppoerCSSSticky.value) {
			if (!isSky) {
				style.position = 'sticky'
				style.top = `${stickyDistance.value - 4}px`
			} else {
				style.position = 'relative'
			}
			// } else {
			// style.height = stickyStatus.value
			//   ? formatDomSizeValue(stickyRectInfo.value.height, 'px')
			//   : 'auto'
			// }
		} else {
			// 不需要吸顶的情况下设置默认的position
			// #ifdef APP-NVUE
			style.position = 'relative'
			// #endif
			// #ifndef APP-NVUE
			style.position = 'static'
			// #endif
		}

		// 设置ZIndex
		if (props.zIndex) style.zIndex = props.zIndex


		return style
	})

	// sticky内容样式
	const stickyContentStyle = computed<CSSProperties>(() => {
		const style : CSSProperties = {}

		// 不支持CSS Sticky，使用fixed布局实现
		// if (!suppoerCSSSticky.value) {
		//   style.position = stickyStatus.value ? 'fixed' : 'static'
		//   style.top = `${stickyDistance.value}px`
		//   style.left = `${stickyRectInfo.value.left}px`
		//   style.width = formatDomSizeValue(stickyRectInfo.value.width, 'px')
		// }

		// if (stickyDistance.value > 0) {
		//   style.top = `${stickyDistance.value}px`
		// }

		return style
	})

	return {
		ns,
		stickyStyle,
		stickyContentStyle,
	}
}