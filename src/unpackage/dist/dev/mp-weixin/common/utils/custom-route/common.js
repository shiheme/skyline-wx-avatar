"use strict";
var _a;
const common_vendor = require("../../vendor.js");
const AnimationStatus = {
  /// The animation is stopped at the beginning.
  dismissed: 0,
  /// The animation is running from beginning to end.
  forward: 1,
  /// The animation is running backwards, from end to beginning.
  reverse: 2,
  /// The animation is stopped at the end.
  completed: 3
};
const Curves = {};
if (common_vendor.wx$1.worklet) {
  const { Easing } = common_vendor.wx$1.worklet;
  Object.assign(Curves, {
    fastLinearToSlowEaseIn: Easing.cubicBezier(0.18, 1, 0.04, 1),
    linearToEaseOut: Easing.cubicBezier(0.35, 0.91, 0.33, 0.97),
    easeInToLinear: Easing.cubicBezier(0.67, 0.03, 0.65, 0.09),
    fastOutSlowIn: Easing.cubicBezier(0.4, 0, 0.2, 1)
  });
}
function CurveAnimation({ animation, animationStatus, curve, reverseCurve }) {
  const { derived } = common_vendor.wx$1.worklet;
  return derived(() => {
    "worklet";
    const useForwardCurve = !reverseCurve || animationStatus.value !== AnimationStatus.reverse;
    const activeCurve = useForwardCurve ? curve : reverseCurve;
    const t = animation.value;
    if (!activeCurve)
      return t;
    if (t === 0 || t === 1)
      return t;
    return activeCurve(t);
  });
}
const emptyFn = function() {
  "worklet";
};
((_a = common_vendor.wx$1.worklet) == null ? void 0 : _a.timing) || emptyFn;
exports.CurveAnimation = CurveAnimation;
exports.Curves = Curves;
