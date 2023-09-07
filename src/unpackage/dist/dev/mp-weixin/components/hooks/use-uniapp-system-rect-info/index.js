"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../libs/lodash/_baseToString.js");
const components_utils_error = require("../../utils/error.js");
const DEFAULT_STATUS_BAR_HEIGHT = 45;
const DEFAULT_ISSKY = false;
const useUniAppSystemRectInfo = () => {
  const skylineInfo = common_vendor.reactive({
    issky: DEFAULT_ISSKY
  });
  const navBarInfo = common_vendor.reactive({
    height: 0,
    statusHeight: DEFAULT_STATUS_BAR_HEIGHT
  });
  const navBarBoundingInfo = common_vendor.reactive({
    width: 0,
    height: 32,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    marginRight: 0
  });
  const systemScreenInfo = common_vendor.reactive({
    width: 0,
    minwidth: 375,
    height: 0,
    operationHeight: 0
  });
  const getSystemRectInfo = () => {
    try {
      const uniSkylineInfo = common_vendor.index.getSkylineInfoSync();
      const { isSupported } = uniSkylineInfo;
      const uniSystemInfo = common_vendor.index.getSystemInfoSync();
      const { statusBarHeight, windowWidth, windowHeight, titleBarHeight } = uniSystemInfo;
      let height = 0;
      const {
        width: menuButtonWidth,
        height: menuButtonHeight,
        bottom: menuButtonBottom,
        top: menuButtonTop,
        left: menuButtonLeft,
        right: menuButtonRight
      } = common_vendor.index.getMenuButtonBoundingClientRect();
      navBarBoundingInfo.width = menuButtonWidth;
      navBarBoundingInfo.height = menuButtonHeight + 2;
      navBarBoundingInfo.bottom = menuButtonBottom;
      navBarBoundingInfo.top = menuButtonTop;
      navBarBoundingInfo.left = menuButtonLeft;
      navBarBoundingInfo.right = menuButtonRight;
      navBarBoundingInfo.marginRight = windowWidth - navBarBoundingInfo.right;
      const menuButtonMarginTopHeight = menuButtonTop - statusBarHeight;
      height = menuButtonBottom + (menuButtonMarginTopHeight < 4 ? 4 : menuButtonMarginTopHeight);
      skylineInfo.issky = isSupported;
      navBarInfo.height = height;
      navBarInfo.statusHeight = statusBarHeight;
      systemScreenInfo.width = windowWidth;
      systemScreenInfo.height = windowHeight;
      systemScreenInfo.minwidth = windowWidth > 500 ? 375 : windowWidth, systemScreenInfo.operationHeight = windowHeight - height;
    } catch (err) {
      components_utils_error.debugWarn(
        "useUniAppSystemRectInfo",
        `[TnGetSystemRectInfo]获取系统容器信息失败: ${err}`
      );
    }
  };
  getSystemRectInfo();
  return {
    navBarInfo,
    skylineInfo,
    navBarBoundingInfo,
    systemScreenInfo,
    getSystemRectInfo
  };
};
exports.useUniAppSystemRectInfo = useUniAppSystemRectInfo;
