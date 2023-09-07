<script lang="ts" setup>

import { iconEmits, iconProps } from './icon'
import { useIcon } from './composables'
// 依赖tn-icon样式(由于uniapp在小程序端支持svg有点问题，所以这里还是使用iconfont)
// #ifdef APP-PLUS
// import '@tuniao/tn-icon/dist/https/index.css'
// #endif
// #ifndef APP-PLUS
// import '@tuniao/tn-icon/dist/index.css'
import '../styles/index.css'
import '../styles/icon.css'
// #endif
const props = defineProps(iconProps)
const emits = defineEmits(iconEmits)

const { isSky, isImg, iconClass, iconStyle } = useIcon(props)
// 图标点击事件
const handleClick = () => {
  emits('click')
}
</script>

<template>
  <view :class="[iconClass]" :style="iconStyle" @click="handleClick">
    <template v-if="format==='png'">
      <image
        v-if="invert"
        class="iconsvgimg"
        :src="'../../../../static/foot/'+name+'.png'"
        :style="iconStyle"
        style="filter:invert(1)"
      />
      <image
        v-else-if="noinvert"
        class="iconsvgimg"
        :src="'../../../../static/foot/'+name+'.png'"
        :style="iconStyle"
        style="filter:invert(0)"
      />
      <image
        v-else
        class="iconsvgimg"
        :src="'../../../../static/foot/'+name+'.png'"
        :style="iconStyle"
      />
    </template>
    <template v-else-if="format!=='png'&&isSky">
	  <image
	    v-if="invert"
	    class="iconsvgimg"
	    :src="'../../../../static/svg/'+name+'.svg'"
	    :style="iconStyle"
	    style="filter:invert(1)"
	  />
      <image
        v-else-if="noinvert"
        class="iconsvgimg"
        :src="'../../../../static/svg/'+name+'.svg'"
        :style="iconStyle"
        style="filter:invert(0)"
      />
      <image
        v-else
        class="iconsvgimg"
        :src="'../../../../static/svg/'+name+'.svg'"
        :style="iconStyle"
      />
    </template>
    <!-- 图片图标 -->
    <image
      v-else-if="isImg"
      class="image"
      :src="name"
      :mode="imgMode"
    />
    <!-- 正常图标 -->
    <text v-else :class="['icon svgicon', `icon-${name}`]" />
  </view>
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/icon.scss';
.iconsvgimg {
	display: flex;
	flex: none;
	flex-shrink: 0px;
}
</style>
