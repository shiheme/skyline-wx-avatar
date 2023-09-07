import { getCurrentInstance } from 'vue'
import { debugWarn } from '../../utils'

import {
  useUniAppSystemRectInfo,
} from '../../hooks'

import type { ComponentInternalInstance } from 'vue'

export const useSelectorQuery = (
  instance?: ComponentInternalInstance | null
) => {
	const { skylineInfo} = useUniAppSystemRectInfo()
  let query: UniApp.SelectorQuery | null = null

  if (!instance) {
    instance = getCurrentInstance()
  }
  if (!instance) {
    debugWarn('useSelectorQuery', 'useSelectorQuery必须在setup函数中使用')
  }

  // #ifndef MP-ALIPAY || APP-PLUS
	const isSky = skylineInfo.issky
	const { proxy } : any = getCurrentInstance();
	const _this = proxy
	if(isSky) {
		query = _this.createSelectorQuery()
	} else {
		query = uni.createSelectorQuery().in(instance)
	}
  // #endif
  // #ifdef APP-PLUS
  query = uni.createSelectorQuery().in((instance as any).ctx.$scope)
  // #endif
  // #ifdef MP-ALIPAY
  query = uni.createSelectorQuery().in(null)
  // #endif

  const getSelectorNodeInfo = (selector: string): Promise<UniApp.NodeInfo> => {
    return new Promise((resolve, reject) => {
      if (query) {
        query
          .select(selector)
		  .node()
          .exec((res) => {
            const selectRes: UniApp.NodeInfo = res as UniApp.NodeInfo
            if (selectRes) {
              resolve(selectRes)
            } else {
              reject(new Error(`未找到对应节点: ${selector}`))
            }
          })
      } else {
        reject(new Error('未找到对应的SelectorQuery实例'))
      }
    })
  }

  const getSelectorNodeInfos = (
    selector: string
  ): Promise<UniApp.NodeInfo[]> => {
    return new Promise((resolve, reject) => {
      if (query) {
        query
          .selectAll(selector)
          .boundingClientRect((res) => {
            const selectRes: UniApp.NodeInfo[] = res as UniApp.NodeInfo[]
            if (selectRes && selectRes.length > 0) {
              resolve(selectRes)
            } else {
              reject(new Error(`未找到对应节点: ${selector}`))
            }
          })
          .exec()
      } else {
        reject(new Error('未找到对应的SelectorQuery实例'))
      }
    })
  }

  return {
    query,
    getSelectorNodeInfo,
    getSelectorNodeInfos,
  }
}
