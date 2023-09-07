"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const components_constants_event = require("../../../../constants/event.js");
require("../../../../libs/lodash/_baseToString.js");
const components_hooks_useUniappSystemRectInfo_index = require("../../../../hooks/use-uniapp-system-rect-info/index.js");
require("../../../../hooks/use-z-index/index.js");
const usePopup = (props) => {
  const { emit } = common_vendor.getCurrentInstance();
  const { skylineInfo } = components_hooks_useUniappSystemRectInfo_index.useUniAppSystemRectInfo();
  const showOverlay = common_vendor.ref(false);
  const showPopup = common_vendor.ref(false);
  const visiblePopup = common_vendor.ref(false);
  common_vendor.watch(
    () => props.modelValue,
    (value) => {
      if (value) {
        visiblePopup.value = true;
        showPopup.value = true;
        if (props.overlay)
          showOverlay.value = true;
      } else {
        showPopup.value = false;
        showOverlay.value = false;
        setTimeout(() => {
          visiblePopup.value = false;
        }, 250);
      }
    }
  );
  const zIndex = common_vendor.computed(() => Number(props.zIndex));
  const skyPosition = common_vendor.computed(() => {
    const isSky = skylineInfo.issky;
    return isSky ? "absolute" : "fixed";
  });
  const overlayZIndex = common_vendor.computed(() => zIndex.value - 1);
  const updateModelValue = (value) => {
    emit(components_constants_event.UPDATE_MODEL_EVENT, value);
    common_vendor.nextTick$1(() => {
      emit(value ? "open" : "close");
    });
  };
  const onClickCloseBtn = () => {
    updateModelValue(false);
  };
  const onClickOverlay = () => {
    if (props.overlayCloseable)
      updateModelValue(false);
  };
  return {
    showOverlay,
    showPopup,
    visiblePopup,
    zIndex,
    skyPosition,
    overlayZIndex,
    updateModelValue,
    onClickCloseBtn,
    onClickOverlay
  };
};
exports.usePopup = usePopup;
