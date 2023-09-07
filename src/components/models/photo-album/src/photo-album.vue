<script lang="ts" setup>
import { computed, ref } from 'vue'
import TnLazyLoad from '../../lazy-load/src/lazy-load.vue'
import { useNamespace, useUniAppSystemRectInfo } from '../../../hooks'
import { photoAlbumEmits, photoAlbumProps } from './photo-album'
import { usePhotoAlbum } from './composables'

import type { CSSProperties } from 'vue'

const { cssInfo, navBarInfo, navBarBoundingInfo, systemScreenInfo } = useUniAppSystemRectInfo()

const props = defineProps(photoAlbumProps)
const emits = defineEmits(photoAlbumEmits)

const ns = useNamespace('photo-album')

const { imageData, imageClickEvent } = usePhotoAlbum(props, emits)

const containerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  // let width = `calc(100% / ${props.column} - 6px)`
  let column = 3
  let width = `${(systemScreenInfo.minwidth - 70)/Number(column) - 6}px`   //weibo
  if(typeof props.column === 'number' && props.column !== 1) {
	  
	  // #ifdef MP-ALIPAY
	  width = `${(systemScreenInfo.minwidth - 70)/Number(column) - 6}px`
	  // #endif
	  
	  style.width = style.height = width
  }

  return style
})

const singleImageStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  // let width = `calc(100% / ${props.column} - 6px)`
  let column = 3
  
  let width = 0
  let height = 0
  if(imageData.value[0]?.width / imageData.value[0]?.height >= 1.5){
  	width = 2 * (systemScreenInfo.minwidth - 10) / Number(column) - 6
  } else if (imageData.value[0]?.width / imageData.value[0]?.height < 1.5 && imageData.value[0]?.width / imageData.value[0]?.height >= 1.1) {
  	width = 2 * (systemScreenInfo.minwidth - 70) / Number(column) - 6
  } else if (imageData.value[0]?.width / imageData.value[0]?.height < 1.1 && imageData.value[0]?.width / imageData.value[0]?.height > 0.5) {
  	width = 2 * (systemScreenInfo.minwidth - 160) / Number(column) - 6
  } else {
  	width = (systemScreenInfo.minwidth - 30) / Number(column) - 6
  }
  // let width = 2 * (systemScreenInfo.minwidth - 10) / Number(column) - 6   //weibo
  height = (imageData.value[0]?.width && imageData.value[0]?.height) ? (width * (imageData.value[0]?.height) / (imageData.value[0]?.width)) : width * 9 / 16
  
  style.width = `${width}px`
  style.height = `${height}px`
  style.borderRadius = '8px'
  
  return style
})

const singleMode = ref(''),
singleop = ref(0),
singlewidth = ref('0px'),
singleheight = ref('0px')

const singleLoad = (e:any) => {
	console.log('e',e)
	let column = 3
	let width = `${2*(systemScreenInfo.minwidth - 70)/Number(column) - 6}px`   //weibo
	
	singleMode.value = e.detail.width>=e.detail.height?'widthFix':'heightFix'
	singleop.value = singleMode.value?1:0
	singlewidth.value = singleheight.value = width
}


console.log('imageData',imageData.value)
</script>

<template>
  <view :class="[ns.b()]">
    <view
      v-for="(item, index) in imageData"
      :key="index"
      :class="[ns.e('container')]"
      :style="containerStyle"
      @tap.stop="imageClickEvent(index)"
    >
      <view :class="ns.e('item')" v-if="column===1">
        <TnLazyLoad v-if="lazyLoad" :columnx="column" :src="item?.featured_base_media" :mode="item?.width>item?.height?'widthFix':'heightFix'" />
        <image
		v-else
          :class="ns.e('item__image')"
          :src="item?.featured_base_media"
          :mode="item?.width>item?.height?'widthFix':'heightFix'"
		  :style="singleImageStyle"
        />
      </view>
	  <view :class="ns.e('item')" v-else>
	    <TnLazyLoad v-if="lazyLoad" :src="item?.featured_base_media" :mode="props.imgMode" />
	    <image
	  		v-else
	      :class="ns.e('item__image')"
	      :src="item?.featured_base_media"
	      :mode="props.imgMode"
	    />
	  </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/photo-album.scss';
</style>
