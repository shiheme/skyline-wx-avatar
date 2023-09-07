"use strict";
const isEmptyVariableInDefault = (variable, defaultValue = void 0) => {
  return variable === void 0 || variable === null ? defaultValue : variable;
};
exports.isEmptyVariableInDefault = isEmptyVariableInDefault;
