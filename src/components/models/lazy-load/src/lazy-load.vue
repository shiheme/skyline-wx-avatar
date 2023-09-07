<script lang="ts" setup>
	import { computed, ref } from 'vue'
import TnIcon from '../../icon/src/icon.vue'
import { lazyLoadEmits, lazyLoadProps } from './lazy-load'
import { useNamespace, useUniAppSystemRectInfo } from '../../../hooks'
import { useLazyLoad, useLazyLoadCustomStyle } from './composables'
import type { CSSProperties } from 'vue'

const { cssInfo, navBarInfo, navBarBoundingInfo, systemScreenInfo } = useUniAppSystemRectInfo()

const props = defineProps(lazyLoadProps)
defineEmits(lazyLoadEmits)

const {
  componentId,
  imageStatus,
  showImage,
  handleImageLoadedSuccess,
  handleImageLoadedFailed,
} = useLazyLoad(props)
const { ns, lazyLoadStyle } = useLazyLoadCustomStyle(props)

const singleImageStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  // let width = `calc(100% / ${props.column} - 6px)`
  let column = 3
  let width = `${2*(systemScreenInfo.minwidth - 70)/Number(column) - 6}px`   //weibo
	style.width = style.height = width

  return style
})

console.log('columnx',props.columnx)

</script>

// #ifdef MP-WEIXIN
<script lang="ts">
export default {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true,
  },
}
</script>
// #endif

<template>
  <view
    :id="componentId"
    :class="[ns.b(), ns.is('show-image', showImage && imageStatus !== 'error')]"
    :style="lazyLoadStyle"
  >
    <!-- 加载中 -->
   
    <!-- 正式显示的图片 -->
	
    <view
      v-if="showImage && imageStatus !== 'error'"
      :class="[ns.e('container')]"
    >
	
	<image v-if="columnx===1"
	  :class="[
	    ns.e('image'),
	    ns.is('animation', imageStatus === 'loaded' && transition),
	    ns.is('no-animation', imageStatus === 'loaded' && !transition),
	  ]"
	  :src="src"
	  :style="singleImageStyle"
	  :mode="mode"
	  @load="handleImageLoadedSuccess"
	  @error="handleImageLoadedFailed"
	/>
      <image v-else
        :class="[
          ns.e('image'),
          ns.is('animation', imageStatus === 'loaded' && transition),
          ns.is('no-animation', imageStatus === 'loaded' && !transition),
        ]"
        :src="src"
        :mode="mode"
        @load="handleImageLoadedSuccess"
        @error="handleImageLoadedFailed"
      />
    </view>
	<view v-else-if="imageStatus === 'error'" :class="[ns.e('container')]">
	  <slot name="error">
	    <view :class="[ns.e('error')]">
	      <bee-icon size="20px" name="image-fill" />
	    </view>
	  </slot>
	</view>
	<view v-else :class="[ns.e('container')]">
	 <!-- <slot name="loading"> -->
	    <view :class="[ns.e('loading')]">
	      <!-- <view :class="[ns.e('loading__icon')]"> -->
	        <!-- <bee-icon size="20px" name="image-fill" /> -->
	      <!-- </view> -->
	    </view>
		<!-- <bee-loadmore class="loadmore"
			:loading-text="false"
			loading-icon-mode="semicircle"
			status="loading" /> -->
	  <!-- </slot> -->
	</view>
    <!-- 图片加载失败 -->
    
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/lazy-load.scss';
</style>
