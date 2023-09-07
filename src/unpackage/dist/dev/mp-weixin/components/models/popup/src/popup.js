"use strict";
const common_vendor = require("../../../../common/vendor.js");
const components_constants_event = require("../../../constants/event.js");
const components_constants_zIndex = require("../../../constants/z-index.js");
const components_utils_vue_props_runtime = require("../../../utils/vue/props/runtime.js");
const components_libs_lodash_isBoolean = require("../../../libs/lodash/is-boolean.js");
require("../../../libs/lodash/_baseToString.js");
const components_models_base_composables_useComponentCommonProps_index = require("../../base/composables/use-component-common-props/index.js");
const components_models_overlay_index = require("../../overlay/index.js");
const components_models_popup_src_composables_popupCustom = require("./composables/popup-custom.js");
const components_models_popup_src_composables_usePopup = require("./composables/use-popup.js");
require("../../../libs/lodash/from-pairs.js");
require("../../../libs/lodash/is-object-like.js");
require("../../../libs/lodash/_objectToString.js");
require("../../../utils/rand.js");
require("../../../constants/size.js");
require("../../../utils/vue/install.js");
require("../../overlay/src/composables/use-overlay.js");
require("../../../hooks/use-namespace/index.js");
require("../../../utils/is-empty.js");
require("../../../hooks/use-uniapp-system-rect-info/index.js");
require("../../../utils/error.js");
require("../../../hooks/use-z-index/index.js");
require("../../../hooks/use-component-color/index.js");
require("../../../utils/dom/unit.js");
const popupOpenDirection = [
  "top",
  "bottom",
  "left",
  "right",
  "center"
];
const popupCloseBtnPosition = [
  "left-top",
  "right-top",
  "left-bottom",
  "right-bottom"
];
const popupProps = components_utils_vue_props_runtime.buildProps({
  /**
   * @description 控制弹框是否显示
   */
  modelValue: Boolean,
  /**
   * @description 弹框打开的方向
   */
  openDirection: {
    type: String,
    values: popupOpenDirection,
    default: "center"
  },
  /**
   * @description 弹窗的宽度，在 openDirection 为 left 或 right 或 center 时生效
   */
  width: {
    type: [String, Number]
  },
  /**
   * @description 弹窗的高度，在 openDirection 为 top 或 bottom 或 center 时生效
   */
  height: {
    type: [String, Number]
  },
  /**
   * @description 弹框的内容的背景颜色
   */
  bgColor: {
    type: String
  },
  /**
   * @description 弹框的内容的圆角
   */
  radius: {
    type: [String, Number],
    default: "16px"
  },
  /**
   * @description 是否显示overlay遮罩层
   */
  overlay: {
    type: Boolean,
    default: true
  },
  /**
   * @description overlay遮罩层的透明度
   */
  overlayOpacity: components_models_overlay_index.overlayProps["opacity"],
  /**
   * @description 点击overlay关闭弹框
   */
  overlayCloseable: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否显示关闭按钮
   */
  closeBtn: Boolean,
  /**
   * @description 关闭按钮的位置
   */
  closeBtnPosition: {
    type: String,
    values: popupCloseBtnPosition,
    default: "right-top"
  },
  /**
   * @description 底部是否开启安全区域
   */
  safeAreaInsetBottom: components_models_base_composables_useComponentCommonProps_index.useComponentSafeAreaInsetBottomProp,
  /**
   * @description zIndex
   */
  zIndex: {
    type: Number,
    default: components_constants_zIndex.ZIndex.popup
  },
  /**
   * @description 距离顶部的距离，在 openDirection 为 top 或 left 或 right 时生效，默认单位为`px`
   */
  top: {
    type: [String, Number]
  }
});
const popupEmits = {
  [components_constants_event.UPDATE_MODEL_EVENT]: (value) => components_libs_lodash_isBoolean.isBoolean(value),
  open: () => true,
  close: () => true
};
if (!Math) {
  (TnOverlay + TnIcon)();
}
const TnOverlay = () => "../../overlay/src/overlay.js";
const TnIcon = () => "../../icon/src/icon.js";
const __default__ = {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  __name: "popup",
  props: popupProps,
  emits: popupEmits,
  setup(__props) {
    const props = __props;
    const {
      showOverlay,
      showPopup,
      visiblePopup,
      overlayZIndex,
      zIndex,
      skyPosition,
      onClickCloseBtn,
      onClickOverlay
    } = components_models_popup_src_composables_usePopup.usePopup(props);
    const { ns, popupContentClass, popupContentStyle } = components_models_popup_src_composables_popupCustom.usePopupCustomStyle(props);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(common_vendor.unref(onClickOverlay)),
        b: common_vendor.p({
          show: common_vendor.unref(showOverlay),
          ["z-index"]: common_vendor.unref(overlayZIndex),
          opacity: _ctx.overlayOpacity
        }),
        c: _ctx.closeBtn
      }, _ctx.closeBtn ? {
        d: common_vendor.p({
          name: "close"
        }),
        e: common_vendor.n(common_vendor.unref(ns).e("close-btn")),
        f: common_vendor.n(common_vendor.unref(ns).em("close-btn", _ctx.closeBtnPosition)),
        g: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(onClickCloseBtn) && common_vendor.unref(onClickCloseBtn)(...args)
        )
      } : {}, {
        h: common_vendor.n(common_vendor.unref(popupContentClass)),
        i: common_vendor.s(common_vendor.unref(popupContentStyle)),
        j: common_vendor.n(common_vendor.unref(ns).b()),
        k: common_vendor.n(common_vendor.unref(ns).is("show", common_vendor.unref(showPopup))),
        l: common_vendor.n(common_vendor.unref(ns).is("visible", common_vendor.unref(visiblePopup))),
        m: common_vendor.unref(zIndex),
        n: common_vendor.unref(skyPosition)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a4b4ea63"], ["__file", "/Users/weifushou/Documents/HBuilderProjects/比比头像生成/components/models/popup/src/popup.vue"]]);
wx.createComponent(Component);
