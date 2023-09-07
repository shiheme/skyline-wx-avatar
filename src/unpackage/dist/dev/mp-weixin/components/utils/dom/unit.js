"use strict";
const common_vendor = require("../../../common/vendor.js");
require("../../libs/lodash/_baseToString.js");
const formatDomSizeValue = (value, unit = "rpx", empty = true) => {
  if (!value)
    return empty ? "" : `0${unit}`;
  if (common_vendor.isString(value) && /(^calc)|(%|px|rpx|auto)$/.test(value))
    return value;
  return `${value}${unit}`;
};
exports.formatDomSizeValue = formatDomSizeValue;
