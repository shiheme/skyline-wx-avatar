"use strict";
const common_vendor = require("../../vendor.js");
const common_utils_customRoute_common = require("./common.js");
const PopupTransitionRouteBuilder = ({
  primaryAnimation,
  primaryAnimationStatus,
  userGestureInProgress
}) => {
  const {
    windowWidth
  } = common_vendor.index.getSystemInfoSync();
  const {
    screenHeight
  } = common_vendor.index.getSystemInfoSync();
  console.info("PopupTransitionRouteBuilder ", windowWidth);
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
    const marginBottom = 34;
    const selfHeight = (1 - 3 * top) * screenHeight - marginBottom;
    const marginTop = 3 * top * screenHeight;
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
exports.PopupTransitionRouteBuilder = PopupTransitionRouteBuilder;
