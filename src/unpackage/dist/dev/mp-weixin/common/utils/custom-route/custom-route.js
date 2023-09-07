"use strict";
const common_vendor = require("../../vendor.js");
const common_utils_customRoute_cupertinoRoute = require("./cupertino-route.js");
const common_utils_customRoute_opacityRoute = require("./opacity-route.js");
const common_utils_customRoute_scaleRoute = require("./scale-route.js");
const common_utils_customRoute_haflScreenRoute = require("./hafl-screen-route.js");
const common_utils_customRoute_popupRoute = require("./popup-route.js");
const common_utils_customRoute_popupSRoute = require("./popup-s-route.js");
let hasInstalled = false;
function installRouteBuilder() {
  if (hasInstalled) {
    return;
  }
  if (!common_vendor.wx$1.worklet) {
    return;
  }
  common_vendor.wx$1.router.addRouteBuilder("Cupertino", common_utils_customRoute_cupertinoRoute.CupertinoRouteBuilder);
  common_vendor.wx$1.router.addRouteBuilder("ScaleTransition", common_utils_customRoute_scaleRoute.ScaleTransitionRouteBuilder);
  common_vendor.wx$1.router.addRouteBuilder("OpacityTransition", common_utils_customRoute_opacityRoute.OpacityTransitionRouteBuilder);
  common_vendor.wx$1.router.addRouteBuilder("HalfScreenDialog", common_utils_customRoute_haflScreenRoute.HalfScreenDialogRouteBuilder);
  common_vendor.wx$1.router.addRouteBuilder("PopupTransition", common_utils_customRoute_popupRoute.PopupTransitionRouteBuilder);
  common_vendor.wx$1.router.addRouteBuilder("PopupSTransition", common_utils_customRoute_popupSRoute.PopupSTransitionRouteBuilder);
  hasInstalled = true;
}
exports.installRouteBuilder = installRouteBuilder;
