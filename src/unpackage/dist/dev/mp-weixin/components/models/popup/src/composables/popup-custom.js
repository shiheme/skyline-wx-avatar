"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const components_hooks_useNamespace_index = require("../../../../hooks/use-namespace/index.js");
const components_hooks_useComponentColor_index = require("../../../../hooks/use-component-color/index.js");
require("../../../../libs/lodash/_baseToString.js");
const components_utils_dom_unit = require("../../../../utils/dom/unit.js");
require("../../../../hooks/use-z-index/index.js");
const components_models_popup_src_composables_usePopup = require("./use-popup.js");
const usePopupCustomStyle = (props) => {
  const ns = components_hooks_useNamespace_index.useNamespace("popup");
  const { zIndex } = components_models_popup_src_composables_usePopup.usePopup(props);
  const [contentBgColorClass, contentBgColorStyle] = components_hooks_useComponentColor_index.useComponentColor(
    common_vendor.toRef(props, "bgColor"),
    "bg"
  );
  const popupContentClass = common_vendor.computed(() => {
    const cls = [ns.e("content")];
    if (props.openDirection)
      cls.push(ns.em("content", props.openDirection));
    if (props.openDirection === "bottom" && props.safeAreaInsetBottom) {
      cls.push("tn-u-safe-area");
    }
    if (contentBgColorClass.value)
      cls.push(contentBgColorClass.value);
    return cls.join(" ");
  });
  const popupContentStyle = common_vendor.computed(() => {
    const style = {};
    if (!contentBgColorClass.value)
      style.backgroundColor = contentBgColorStyle.value || "var(--bee-BG-AIR)";
    if (props.radius) {
      style.overflow = "hidden";
      if (props.openDirection === "center") {
        style.borderRadius = components_utils_dom_unit.formatDomSizeValue(props.radius);
      }
      if (props.openDirection === "top") {
        style.borderBottomLeftRadius = components_utils_dom_unit.formatDomSizeValue(props.radius);
        style.borderBottomRightRadius = components_utils_dom_unit.formatDomSizeValue(props.radius);
      }
      if (props.openDirection === "left") {
        style.borderTopRightRadius = components_utils_dom_unit.formatDomSizeValue(props.radius);
        style.borderBottomRightRadius = components_utils_dom_unit.formatDomSizeValue(props.radius);
      }
      if (props.openDirection === "right") {
        style.borderTopLeftRadius = components_utils_dom_unit.formatDomSizeValue(props.radius);
        style.borderBottomLeftRadius = components_utils_dom_unit.formatDomSizeValue(props.radius);
      }
      if (props.openDirection === "bottom") {
        style.borderTopLeftRadius = components_utils_dom_unit.formatDomSizeValue(props.radius);
        style.borderTopRightRadius = components_utils_dom_unit.formatDomSizeValue(props.radius);
      }
    }
    if (props.top && (props.openDirection === "top" || props.openDirection === "left" || props.openDirection === "right")) {
      style.top = components_utils_dom_unit.formatDomSizeValue(props.top, "px");
    }
    if (props.width && (props.openDirection === "left" || props.openDirection === "right" || props.openDirection === "center")) {
      style.width = components_utils_dom_unit.formatDomSizeValue(props.width);
    }
    if (props.height && (props.openDirection === "top" || props.openDirection === "bottom" || props.openDirection === "center")) {
      style.height = components_utils_dom_unit.formatDomSizeValue(props.height);
    }
    if (props.openDirection === "left" || props.openDirection === "right") {
      if (props.top)
        style.height = `calc(100% - ${components_utils_dom_unit.formatDomSizeValue(props.top, "px")})`;
    }
    style.zIndex = zIndex.value;
    return style;
  });
  return {
    ns,
    popupContentClass,
    popupContentStyle
  };
};
exports.usePopupCustomStyle = usePopupCustomStyle;
