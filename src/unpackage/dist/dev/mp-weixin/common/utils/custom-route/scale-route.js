"use strict";
const common_vendor = require("../../vendor.js");
const common_utils_customRoute_common = require("./common.js");
const ScaleTransitionRouteBuilder = ({
  primaryAnimation,
  secondaryAnimation,
  primaryAnimationStatus,
  secondaryAnimationStatus,
  userGestureInProgress
}) => {
  const { windowWidth } = common_vendor.index.getSystemInfoSync();
  const { screenHeight } = common_vendor.index.getSystemInfoSync();
  console.info("ScaleTransitionRouteBuilder ", windowWidth);
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
    const translateX = windowWidth * (1 - t);
    return {
      opacity: 1,
      transform: `translateX(${translateX}px)`
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
    canTransitionFrom: true,
    barrierColor: "rgba(0, 0, 0, 1)"
  };
};
exports.ScaleTransitionRouteBuilder = ScaleTransitionRouteBuilder;
