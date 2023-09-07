"use strict";
const common_vendor = require("../../../../common/vendor.js");
const components_utils_vue_props_runtime = require("../../../utils/vue/props/runtime.js");
const components_utils_vue_icon = require("../../../utils/vue/icon.js");
require("../../../libs/lodash/_baseToString.js");
const components_constants_imgMode = require("../../../constants/img-mode.js");
const components_constants_types = require("../../../constants/types.js");
const components_models_base_composables_useComponentCommonProps_index = require("../../base/composables/use-component-common-props/index.js");
const components_models_icon_src_composables_iconCustom = require("./composables/icon-custom.js");
require("../../../libs/lodash/from-pairs.js");
require("../../../utils/rand.js");
require("../../../constants/size.js");
require("../../../utils/types.js");
require("../../../utils/dom/unit.js");
require("../../../hooks/use-namespace/index.js");
require("../../../hooks/use-component-color/index.js");
require("../../../hooks/use-component-size/index.js");
require("../../../hooks/use-uniapp-system-rect-info/index.js");
require("../../../utils/error.js");
require("../../../hooks/use-z-index/index.js");
const iconProps = components_utils_vue_props_runtime.buildProps({
  format: String,
  invert: {
    type: Boolean,
    default: false
  },
  noinvert: {
    type: Boolean,
    default: false
  },
  /**
   * @description 图标名称，支持图鸟内置图标和图片地址(只支持绝对路径)
   */
  name: {
    type: components_utils_vue_icon.iconPropType,
    required: true
  },
  /**
   * @description 图标颜色类型
   */
  type: {
    type: String,
    values: components_constants_types.componentTypes,
    default: ""
  },
  /**
   * @description 图标颜色, 以tn开头则使用图鸟内置的颜色
   */
  color: String,
  /**
   * @description 图标大小
   */
  size: {
    type: [String, Number]
  },
  /**
   * @description 图标加粗
   */
  bold: Boolean,
  /**
   * @description 图标是否为透明
   */
  transparent: Boolean,
  /**
   * @description 透明图标背景
   */
  transparentBg: String,
  /**
   * @description 图片模式，当name为图片地址时生效
   */
  imgMode: {
    type: String,
    values: components_constants_imgMode.componentImgModes,
    default: "aspectFill"
  },
  /**
   * @description 垂直方向上的偏移量
   */
  offsetTop: {
    type: [String, Number]
  },
  /**
   * @description 自定义样式
   */
  customStyle: components_models_base_composables_useComponentCommonProps_index.useComponentCustomStyleProp,
  /**
   * @description 自定义类
   */
  customClass: String
});
const iconEmits = {
  /**
   * @description 点击图标时触发
   */
  click: () => true
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "icon",
  props: iconProps,
  emits: iconEmits,
  setup(__props, { emit: emits }) {
    const props = __props;
    const { isSky, isImg, iconClass, iconStyle } = components_models_icon_src_composables_iconCustom.useIcon(props);
    const handleClick = () => {
      emits("click");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.format === "png"
      }, _ctx.format === "png" ? common_vendor.e({
        b: _ctx.invert
      }, _ctx.invert ? {
        c: "../../../../static/foot/" + _ctx.name + ".png",
        d: common_vendor.s(common_vendor.unref(iconStyle))
      } : _ctx.noinvert ? {
        f: "../../../../static/foot/" + _ctx.name + ".png",
        g: common_vendor.s(common_vendor.unref(iconStyle))
      } : {
        h: "../../../../static/foot/" + _ctx.name + ".png",
        i: common_vendor.s(common_vendor.unref(iconStyle))
      }, {
        e: _ctx.noinvert
      }) : _ctx.format !== "png" && common_vendor.unref(isSky) ? common_vendor.e({
        k: _ctx.invert
      }, _ctx.invert ? {
        l: "../../../../static/svg/" + _ctx.name + ".svg",
        m: common_vendor.s(common_vendor.unref(iconStyle))
      } : _ctx.noinvert ? {
        o: "../../../../static/svg/" + _ctx.name + ".svg",
        p: common_vendor.s(common_vendor.unref(iconStyle))
      } : {
        q: "../../../../static/svg/" + _ctx.name + ".svg",
        r: common_vendor.s(common_vendor.unref(iconStyle))
      }, {
        n: _ctx.noinvert
      }) : common_vendor.unref(isImg) ? {
        t: _ctx.name,
        v: _ctx.imgMode
      } : {
        w: common_vendor.n(`icon-${_ctx.name}`)
      }, {
        j: _ctx.format !== "png" && common_vendor.unref(isSky),
        s: common_vendor.unref(isImg),
        x: common_vendor.n(common_vendor.unref(iconClass)),
        y: common_vendor.s(common_vendor.unref(iconStyle)),
        z: common_vendor.o(handleClick)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-77211b59"], ["__file", "/Users/weifushou/Documents/HBuilderProjects/比比头像生成/components/models/icon/src/icon.vue"]]);
wx.createComponent(Component);
