"use strict";
const common_vendor = require("../../vendor.js");
const common_utils_customRoute_common = require("./common.js");
const CupertinoRouteBuilder = ({
  primaryAnimation,
  secondaryAnimation,
  primaryAnimationStatus,
  secondaryAnimationStatus,
  userGestureInProgress
}) => {
  const { windowWidth } = common_vendor.wx$1.getSystemInfoSync();
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
      transform: `translateX(${translateX}px)`
    };
  };
  const _curveSecondaryAnimation = common_utils_customRoute_common.CurveAnimation({
    animation: secondaryAnimation,
    animationStatus: secondaryAnimationStatus,
    curve: common_utils_customRoute_common.Curves.linearToEaseOut,
    reverseCurve: common_utils_customRoute_common.Curves.easeInToLinear
  });
  const handleSecondaryAnimation = () => {
    "worklet";
    let t = secondaryAnimation.value;
    if (!userGestureInProgress.value) {
      t = _curveSecondaryAnimation.value;
    }
    const translateX = -1 / 3 * windowWidth * t;
    return {
      transform: `translateX(${translateX}px)`
    };
  };
  return {
    opaque: true,
    handlePrimaryAnimation,
    handleSecondaryAnimation,
    transitionDuration: 300,
    reverseTransitionDuration: 300,
    canTransitionTo: true,
    canTransitionFrom: true
  };
};
exports.CupertinoRouteBuilder = CupertinoRouteBuilder;
