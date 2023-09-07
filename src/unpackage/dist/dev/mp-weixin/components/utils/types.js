"use strict";
const common_vendor = require("../../common/vendor.js");
require("../libs/lodash/_baseToString.js");
const isEmpty = (val) => !val && val !== 0 || common_vendor.isArray(val) && val.length === 0 || common_vendor.isObject(val) && !Object.keys(val).length;
exports.isEmpty = isEmpty;
