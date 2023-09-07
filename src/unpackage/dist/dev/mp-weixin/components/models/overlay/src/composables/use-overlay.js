"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const components_hooks_useNamespace_index = require("../../../../hooks/use-namespace/index.js");
require("../../../../libs/lodash/_baseToString.js");
const components_utils_isEmpty = require("../../../../utils/is-empty.js");
const components_hooks_useUniappSystemRectInfo_index = require("../../../../hooks/use-uniapp-system-rect-info/index.js");
require("../../../../hooks/use-z-index/index.js");
const useOverlay = (props, emits) => {
  const ns = components_hooks_useNamespace_index.useNamespace("overlay");
  const { skylineInfo } = components_hooks_useUniappSystemRectInfo_index.useUniAppSystemRectInfo();
  const overlayClass = common_vendor.computed(() => {
    const cls = [ns.b()];
    if (props.show)
      cls.push(ns.m("show"));
    return cls.join(" ");
  });
  const overlayStyle = common_vendor.computed(() => {
    const style = {};
    style.transitionDuration = `${components_utils_isEmpty.isEmptyVariableInDefault(
      props.duration,
      300
    )}ms`;
    style.backgroundColor = `rgba(0, 0, 0, ${components_utils_isEmpty.isEmptyVariableInDefault(
      props.opacity,
      0.5
    )})`;
    if (props.zIndex)
      style.zIndex = props.zIndex;
    const isSky = skylineInfo.issky;
    style.position = isSky ? "absolute" : "fixed";
    return style;
  });
  const overlayClick = () => {
    emits("update:show", false);
    emits("click");
  };
  return {
    ns,
    overlayClass,
    overlayStyle,
    overlayClick
  };
};
exports.useOverlay = useOverlay;
