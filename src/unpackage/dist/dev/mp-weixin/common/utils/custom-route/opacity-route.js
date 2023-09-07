"use strict";
const common_vendor = require("../../vendor.js");
const common_utils_customRoute_common = require("./common.js");
const OpacityTransitionRouteBuilder = ({
  primaryAnimation,
  secondaryAnimation,
  secondaryAnimationStatus,
  userGestureInProgress
}) => {
  common_vendor.index.getSystemInfoSync();
  const {
    screenHeight
  } = common_vendor.index.getSystemInfoSync();
  const handlePrimaryAnimation = () => {
    "worklet";
    return {
      opacity: common_utils_customRoute_common.Curves.fastOutSlowIn(primaryAnimation.value)
    };
  };
  const _curveSecondaryAnimation = common_utils_customRoute_common.CurveAnimation({
    animation: secondaryAnimation,
    animationStatus: secondaryAnimationStatus,
    curve: common_utils_customRoute_common.Curves.fastOutSlowIn
  });
  const handleSecondaryAnimation = () => {
    "worklet";
    let t = secondaryAnimation.value;
    if (!userGestureInProgress.value) {
      t = _curveSecondaryAnimation.value;
    }
    const top = 0.1;
    const scaleRatio = 0.08;
    const translateY = screenHeight * (top - 0.5 * scaleRatio) * t;
    const scale = 1 - scaleRatio * t;
    const radius = 12 * t;
    const opacity = 1 * (1 - t / 2);
    return {
      borderRadius: `${radius}px`,
      opacity,
      transform: `translateY(${translateY}px) scale(${scale})`
    };
  };
  return {
    opaque: true,
    handlePrimaryAnimation,
    handleSecondaryAnimation,
    transitionDuration: 300,
    reverseTransitionDuration: 300,
    canTransitionTo: true,
    canTransitionFrom: false,
    barrierColor: "rgba(0,0,0,0)",
    barrierDismissible: false
  };
};
exports.OpacityTransitionRouteBuilder = OpacityTransitionRouteBuilder;
