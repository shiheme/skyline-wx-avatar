"use strict";
const components_utils_vue_install = require("../../utils/vue/install.js");
const common_vendor = require("../../../common/vendor.js");
require("../../libs/lodash/_baseToString.js");
const components_constants_zIndex = require("../../constants/z-index.js");
const components_utils_vue_props_runtime = require("../../utils/vue/props/runtime.js");
const components_libs_lodash_isBoolean = require("../../libs/lodash/is-boolean.js");
const components_models_overlay_src_composables_useOverlay = require("./src/composables/use-overlay.js");
const overlayProps = components_utils_vue_props_runtime.buildProps({
  /**
   * @description 是否显示遮罩层
   */
  show: {
    type: Boolean,
    default: false
  },
  /**
   * @description 动画时间，单位毫秒
   */
  duration: {
    type: Number,
    default: 300
  },
  /**
   * @description 遮罩层透明度，有效值0-1
   */
  opacity: {
    type: Number,
    default: 0.5
  },
  /**
   * @description zIndex
   */
  zIndex: {
    type: Number,
    default: components_constants_zIndex.ZIndex.mask
  }
});
const overlayEmits = {
  "update:show": (value) => components_libs_lodash_isBoolean.isBoolean(value),
  click: () => true
};
const __default__ = {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  __name: "overlay",
  props: overlayProps,
  emits: overlayEmits,
  setup(__props, { emit: emits }) {
    const props = __props;
    const { overlayClass, overlayStyle, overlayClick } = components_models_overlay_src_composables_useOverlay.useOverlay(props, emits);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n(common_vendor.unref(overlayClass)),
        b: common_vendor.s(common_vendor.unref(overlayStyle)),
        c: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(overlayClick) && common_vendor.unref(overlayClick)(...args)
        ),
        d: common_vendor.o(() => {
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-90c65b94"], ["__file", "/Users/weifushou/Documents/HBuilderProjects/比比头像生成/components/models/overlay/src/overlay.vue"]]);
components_utils_vue_install.withNoopInstall(Component);
exports.Component = Component;
exports.overlayProps = overlayProps;
