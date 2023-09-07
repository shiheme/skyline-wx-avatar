<script lang="ts" setup>
import {} from 'vue'
import { overlayEmits, overlayProps } from './overlay'
import { useOverlay } from './composables'

const props = defineProps(overlayProps)
const emits = defineEmits(overlayEmits)

const { overlayClass, overlayStyle, overlayClick } = useOverlay(props, emits)
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
    :class="[overlayClass]"
    :style="overlayStyle"
    @tap.stop="overlayClick"
    @touchmove.stop.prevent="() => {}"
  >
    <slot />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/overlay.scss';
</style>
