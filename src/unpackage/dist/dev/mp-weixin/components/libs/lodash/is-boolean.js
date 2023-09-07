"use strict";
const components_libs_lodash_isObjectLike = require("./is-object-like.js");
const components_libs_lodash__objectToString = require("./_objectToString.js");
const boolTag = "[object Boolean]";
function isBoolean(value) {
  return value === true || value === false || components_libs_lodash_isObjectLike.isObjectLike(value) && components_libs_lodash__objectToString.objectToString.call(value) == boolTag;
}
exports.isBoolean = isBoolean;
