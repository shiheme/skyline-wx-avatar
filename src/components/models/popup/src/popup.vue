<script lang="ts" setup>
import TnOverlay from '../../overlay/src/overlay.vue'
import TnIcon from '../../icon/src/icon.vue'
import { popupEmits, popupProps } from './popup'
import { usePopup, usePopupCustomStyle } from './composables'

const props = defineProps(popupProps)
defineEmits(popupEmits)

const {
  showOverlay,
  showPopup,
  visiblePopup,
  overlayZIndex,
  zIndex,
  skyPosition,
  onClickCloseBtn,
  onClickOverlay,
} = usePopup(props)
const { ns, popupContentClass, popupContentStyle } = usePopupCustomStyle(props)
</script>
// #ifdef MP-WEIXIN
<script lang="ts">
	export default {
		options: {
			// 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
			virtualHost: true
		}
	}
</script>
// #endif
<template>
  <view
    :class="[ns.b(), ns.is('show', showPopup), ns.is('visible', visiblePopup)]"
    :style="{
      zIndex,
	  'position':skyPosition
    }"
  >
    <!-- 遮罩层 -->
    <TnOverlay
      :show="showOverlay"
      :z-index="overlayZIndex"
      :opacity="overlayOpacity"
      @click="onClickOverlay"
    />

    <!-- 弹框内容 -->
    <view :class="[popupContentClass]" :style="popupContentStyle">
      <slot />

      <!-- 关闭按钮 -->
      <view
        v-if="closeBtn"
        :class="[ns.e('close-btn'), ns.em('close-btn', closeBtnPosition)]"
        @tap.stop="onClickCloseBtn"
      >
        <slot name="closeBtn">
          <TnIcon name="close" />
        </slot>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/popup.scss';
</style>
