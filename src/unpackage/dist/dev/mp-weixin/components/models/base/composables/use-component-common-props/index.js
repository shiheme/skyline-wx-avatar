"use strict";
const components_utils_vue_props_runtime = require("../../../../utils/vue/props/runtime.js");
require("../../../../libs/lodash/_baseToString.js");
require("../../../../../common/vendor.js");
const components_utils_rand = require("../../../../utils/rand.js");
const components_constants_size = require("../../../../constants/size.js");
components_utils_vue_props_runtime.buildProp({
  type: [Boolean, void 0],
  default: void 0
});
components_utils_vue_props_runtime.buildProp({
  type: String,
  values: components_constants_size.componentSizes,
  required: false
});
components_utils_vue_props_runtime.buildProp({
  type: String,
  values: components_constants_size.formComponentSizes,
  required: false
});
const useComponentCustomStyleProp = components_utils_vue_props_runtime.buildProp({
  type: Object,
  default: () => ({})
});
components_utils_vue_props_runtime.buildProp({
  type: components_utils_vue_props_runtime.definePropType([String, Number]),
  default: () => components_utils_rand.generateId()
});
const useComponentSafeAreaInsetBottomProp = components_utils_vue_props_runtime.buildProp({
  type: Boolean,
  default: true
});
exports.useComponentCustomStyleProp = useComponentCustomStyleProp;
exports.useComponentSafeAreaInsetBottomProp = useComponentSafeAreaInsetBottomProp;
