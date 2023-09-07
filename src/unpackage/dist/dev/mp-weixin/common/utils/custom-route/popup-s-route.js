"use strict";
const common_vendor = require("../../vendor.js");
const common_utils_customRoute_common = require("./common.js");
const PopupSTransitionRouteBuilder = ({
  primaryAnimation,
  primaryAnimationStatus,
  userGestureInProgress
}) => {
  const { windowWidth } = common_vendor.index.getSystemInfoSync();
  const { screenHeight } = common_vendor.index.getSystemInfoSync();
  console.info("PopupSTransitionRouteBuilder ", windowWidth);
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
    const marginBottom = 34;
    const selfHeight = 215;
    const marginTop = screenHeight - 215 - marginBottom;
    const translateY = selfHeight * (1 - t);
    return {
      marginTop: `${marginTop}px`,
      marginBottom: `${marginBottom}px`,
      marginLeft: `20px`,
      borderRadius: "20px",
      height: `${selfHeight}px`,
      width: `${windowWidth - 40}px`,
      transform: `translateY(${translateY}px)`
    };
  };
  return {
    opaque: false,
    maintainState: true,
    handlePrimaryAnimation,
    transitionDuration: 300,
    reverseTransitionDuration: 300,
    canTransitionTo: true,
    canTransitionFrom: false,
    barrierColor: "rgba(0,0,0,.4)",
    barrierDismissible: true
  };
};
exports.PopupSTransitionRouteBuilder = PopupSTransitionRouteBuilder;
