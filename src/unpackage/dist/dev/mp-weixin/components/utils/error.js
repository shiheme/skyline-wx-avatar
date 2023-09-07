"use strict";
const common_vendor = require("../../common/vendor.js");
class TuniaoUIError extends Error {
  constructor(message) {
    super(message);
    this.name = "TuniaoUIError";
  }
}
function debugWarn(scope, message) {
  {
    const error = common_vendor.isString(scope) ? new TuniaoUIError(`[${scope}] ${message}`) : scope;
    console.warn(error);
  }
}
exports.debugWarn = debugWarn;
