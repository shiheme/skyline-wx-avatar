"use strict";
const common_vendor = require("../../../../common/vendor.js");
const components_libs_lodash_fromPairs = require("../../../libs/lodash/from-pairs.js");
require("../../../libs/lodash/_baseToString.js");
const tnPropKey = "__tnPropKey";
const definePropType = (val) => val;
const isTnProp = (val) => common_vendor.isObject(val) && !!val[tnPropKey];
const buildProp = (prop, key) => {
  if (!common_vendor.isObject(prop) || isTnProp(prop))
    return prop;
  const { values, required, default: defaultValue, type, validator } = prop;
  const _validator = values || validator ? (val) => {
    let valid = false;
    let allowedValues = [];
    if (values) {
      allowedValues = Array.from(values);
      if (common_vendor.hasOwn(prop, "default")) {
        allowedValues.push(defaultValue);
      }
      valid || (valid = allowedValues.includes(val));
    }
    if (validator)
      valid || (valid = validator(val));
    if (!valid && allowedValues.length > 0) {
      const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
      common_vendor.warn(
        `Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(
          val
        )}.`
      );
    }
    return valid;
  } : void 0;
  const tnProp = {
    type,
    required: !!required,
    validator: _validator,
    [tnPropKey]: true
  };
  if (common_vendor.hasOwn(prop, "default"))
    tnProp.default = defaultValue;
  return tnProp;
};
const buildProps = (props) => components_libs_lodash_fromPairs.fromPairs(
  Object.entries(props).map(([key, option]) => [
    key,
    buildProp(option, key)
  ])
);
exports.buildProp = buildProp;
exports.buildProps = buildProps;
exports.definePropType = definePropType;
