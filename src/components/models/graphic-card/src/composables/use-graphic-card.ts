import { computed, ref } from 'vue'
import { isEmptyVariableInDefault } from '../../../../utils'

import type { SetupContext } from 'vue'
import type { GraphicCardEmits, GraphicCardProps } from '../graphic-card'

export const useGraphicCard = (
  props: GraphicCardProps,
  emits: SetupContext<GraphicCardEmits>['emit']
) => {
  // 分割显示的查看用户头像列表和头像数量
  const viewUserAvatars = ref<string[]>([])
  const viewUserCount = ref<number>(0)

  if (props.showViewUser) {
    viewUserAvatars.value = props.viewUserAvatars.slice(
      0,
      props.maxViewUserAvatarCount
    )
    viewUserCount.value = props.viewUserAvatars.length
  }
  
  // 图片数量
    const imageCount = computed<number>(() =>
      isEmptyVariableInDefault(props?.images?.length, 0)
    )

  // 卡片点击事件
  const cardClickEvent = () => {
    emits('click')
  }

  // 用户头像点击事件
  const handleAvatarClick = () => {
    emits('avatarClick')
  }

  // 点击复制文本
  const handleCopyClick = () => {
    emits('copyClick')
  }

  // 点击下载组图
  const handleDownloadClick = () => {
    emits('downloadClick')
  }

  // 点击点赞数量
  const handleLikeClick = () => {
    emits('likeClick')
  }

  return {
    viewUserAvatars,
    viewUserCount,
	imageCount,
    cardClickEvent,
    handleAvatarClick,
    handleCopyClick,
    handleDownloadClick,
    handleLikeClick,
  }
}
