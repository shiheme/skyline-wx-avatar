"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const common_utils_customRoute_customRoute = require("./common/utils/custom-route/custom-route.js");
const store_index = require("./store/index.js");
require("./common/utils/custom-route/cupertino-route.js");
require("./common/utils/custom-route/common.js");
require("./common/utils/custom-route/opacity-route.js");
require("./common/utils/custom-route/scale-route.js");
require("./common/utils/custom-route/hafl-screen-route.js");
require("./common/utils/custom-route/popup-route.js");
require("./common/utils/custom-route/popup-s-route.js");
if (!Math) {
  "./pages/index/index.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      common_utils_customRoute_customRoute.installRouteBuilder();
      const tip = "\n\n...................................\n.#####...######..######..#####...######..######.\n.##..##..##......##......##..##..##......##.....\n.#####...####....####....#####...####....####...\n.##..##..##......##......##..##..##......##.....\n.#####...######..######..#####...######..######.\n................................................\n欢迎使用比比小程序进行创作，\n需要帮助或者更新版本请进入官方公众号[APP比比]查看。\n网址：https://beebee.work/\n";
      console.log(tip);
    });
    common_vendor.onShow((options) => {
      var _a, _b, _c, _d;
      const store = store_index.useStore();
      if ((_b = (_a = options == null ? void 0 : options.referrerInfo) == null ? void 0 : _a.extraData) == null ? void 0 : _b.image) {
        store.commit("SET_SUCAI", (_d = (_c = options == null ? void 0 : options.referrerInfo) == null ? void 0 : _c.extraData) == null ? void 0 : _d.image);
      }
    });
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/weifushou/Documents/HBuilderProjects/比比头像生成/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store, store_index.key);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
