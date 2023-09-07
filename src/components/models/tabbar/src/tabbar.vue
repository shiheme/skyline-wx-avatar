<script lang="ts" setup>
import { tabbarEmits, tabbarProps } from './tabbar'
import { useTabbar, useTabbarCustomStyle } from './composables'

const props = defineProps(tabbarProps)
defineEmits(tabbarEmits)

// const mmdel = detectionModel()

const { rectId, bulgeRectInfo, hasBulgeButton, setActiveItemByValue } =
  useTabbar(props)
const { ns, tabbarClass, tabbarStyle, bgClass, bgStyle, placeholderStyle, safeAreaStyle } =
  useTabbarCustomStyle(props)

defineExpose({
  /**
   * @description 手动设置当前激活的item
   */
  setActiveItem: setActiveItemByValue
})
</script>

<template>
  <view
    :id="rectId"
    ref="rectId"
    :class="[tabbarClass]"
    :style="tabbarStyle"
  >
    <!-- 背景颜色 -->
    <view :class="[bgClass]" :style="bgStyle" />
    <!-- 内容 -->
    <view :class="[ns.e('content')]" :style="placeholderStyle">
      <slot />
    </view>
    <view
      v-if="safeAreaInsetBottom"
      :class="[{ 'tn-u-safe-area': safeAreaInsetBottom }]"
	  :style="safeAreaStyle"
    />
  </view>
  <!-- 占位容器 -->
  <view
    v-if="fixed && placeholder"
    :class="[ns.e('placeholder'), { 'tn-u-safe-area': safeAreaInsetBottom }]"
    :style="placeholderStyle"
  />
</template>

<style lang="scss" scoped>
@import '../../../theme-chalk/src/tabbar.scss';
</style>
