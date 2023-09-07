"use strict";
const common_vendor = require("../../vendor.js");
const common_utils_customRoute_common = require("./common.js");
const HalfScreenDialogRouteBuilder = ({
  primaryAnimation,
  primaryAnimationStatus,
  userGestureInProgress
}) => {
  const { screenHeight } = common_vendor.index.getSystemInfoSync();
  console.info("HalfScreenDialogRouteBuilder ", screenHeight);
  const _curvePrimaryAnimation = common_utils_customRoute_common.CurveAnimation({
    animation: primaryAnimation,
    animationStatus: primaryAnimationStatus,
    curve: common_utils_customRoute_common.Curves.linearToEaseOut,
    reverseCurve: common_utils_customRoute_common.Curves.easeInToLinear
  });
  const handlePrimaryAnimation = () => {
    "worklet";
    let t = primaryAnimation.value;
    if (!userGestureInProgress.value) {
      t = _curvePrimaryAnimation.value;
    }
    const top = 0.12;
    const selfHeight = (1 - top) * screenHeight;
    const marginTop = top * screenHeight;
    const translateY = selfHeight * (1 - t);
    return {
      marginTop: `${marginTop}px`,
      borderRadius: "10px",
      height: `${selfHeight}px`,
      transform: `translateY(${translateY}px)`
    };
  };
  return {
    handlePrimaryAnimation,
    opaque: false,
    // 半屏推入时栈顶可见
    barrierDismissible: true,
    transitionDuration: 300,
    reverseTransitionDuration: 300,
    canTransitionTo: false,
    canTransitionFrom: true
  };
};
exports.HalfScreenDialogRouteBuilder = HalfScreenDialogRouteBuilder;
