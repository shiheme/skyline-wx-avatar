"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../libs/lodash/_baseToString.js");
const components_utils_error = require("../../utils/error.js");
const components_hooks_useUniappSystemRectInfo_index = require("../use-uniapp-system-rect-info/index.js");
require("../use-z-index/index.js");
const useSelectorQuery = (instance) => {
  const { skylineInfo } = components_hooks_useUniappSystemRectInfo_index.useUniAppSystemRectInfo();
  let query = null;
  if (!instance) {
    instance = common_vendor.getCurrentInstance();
  }
  if (!instance) {
    components_utils_error.debugWarn("useSelectorQuery", "useSelectorQuery必须在setup函数中使用");
  }
  const isSky = skylineInfo.issky;
  const { proxy } = common_vendor.getCurrentInstance();
  const _this = proxy;
  if (isSky) {
    query = _this.createSelectorQuery();
  } else {
    query = common_vendor.index.createSelectorQuery().in(instance);
  }
  const getSelectorNodeInfo = (selector) => {
    return new Promise((resolve, reject) => {
      if (query) {
        query.select(selector).node().exec((res) => {
          const selectRes = res;
          if (selectRes) {
            resolve(selectRes);
          } else {
            reject(new Error(`未找到对应节点: ${selector}`));
          }
        });
      } else {
        reject(new Error("未找到对应的SelectorQuery实例"));
      }
    });
  };
  const getSelectorNodeInfos = (selector) => {
    return new Promise((resolve, reject) => {
      if (query) {
        query.selectAll(selector).boundingClientRect((res) => {
          const selectRes = res;
          if (selectRes && selectRes.length > 0) {
            resolve(selectRes);
          } else {
            reject(new Error(`未找到对应节点: ${selector}`));
          }
        }).exec();
      } else {
        reject(new Error("未找到对应的SelectorQuery实例"));
      }
    });
  };
  return {
    query,
    getSelectorNodeInfo,
    getSelectorNodeInfos
  };
};
exports.useSelectorQuery = useSelectorQuery;
