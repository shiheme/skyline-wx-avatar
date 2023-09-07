"use strict";
const common_vendor = require("../../../common/vendor.js");
const useComponentColor = (prop, type = "") => {
  const classColor = common_vendor.ref("");
  const styleColor = common_vendor.ref("");
  const innerColorReg = /^(tn-|gradient)/;
  const styleColorReg = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8}|[A-Fa-f0-9]{3})$|^rgb\(\d{1,3}(,\s?\d{1,3}){2}\)$|^rgba\(\d{1,3}(,\s?\d{1,3}){2},\s?0?\.?\d{1,}\)|transparent/i;
  const handleColorValue = (value) => {
    classColor.value = "";
    styleColor.value = "";
    if (value === void 0)
      return;
    if (innerColorReg.test(value)) {
      if (type === "bg" && /.*gradient.*/.test(value)) {
        const gradientValue = value.split("__")[1];
        classColor.value = `tn-gradient-bg__${gradientValue}`;
        return;
      }
      classColor.value = `${value}_${type}`;
    }
    if (styleColorReg.test(value)) {
      styleColor.value = value;
    }
  };
  handleColorValue(prop.value);
  common_vendor.watch(
    () => prop.value,
    (val) => {
      handleColorValue(val);
    }
  );
  const updateColor = (value) => {
    handleColorValue(value);
  };
  return [classColor, styleColor, updateColor];
};
exports.useComponentColor = useComponentColor;
