"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
require("../../components/libs/lodash/_baseToString.js");
const components_hooks_useSelectorQuery_index = require("../../components/hooks/use-selector-query/index.js");
const components_hooks_useUniappSystemRectInfo_index = require("../../components/hooks/use-uniapp-system-rect-info/index.js");
require("../../components/hooks/use-z-index/index.js");
const common_hooks_useCommonJs_index = require("../../common/hooks/use-common-js/index.js");
require("../../components/utils/error.js");
if (!Array) {
  const _component_snapshot = common_vendor.resolveComponent("snapshot");
  const _easycom_bee_popup2 = common_vendor.resolveComponent("bee-popup");
  (_component_snapshot + _easycom_bee_popup2)();
}
const _easycom_bee_popup = () => "../../components/models/popup/src/popup.js";
if (!Math) {
  _easycom_bee_popup();
}
const _sfc_defineComponent = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const { navBarInfo, navBarBoundingInfo, systemScreenInfo } = components_hooks_useUniappSystemRectInfo_index.useUniAppSystemRectInfo();
    const { getSelectorNodeInfo } = components_hooks_useSelectorQuery_index.useSelectorQuery();
    const store = store_index.useStore();
    const base = common_vendor.ref({
      title: "节日头像生成",
      bg: "",
      music: {},
      tomini: ""
    });
    const sucai = common_vendor.computed(() => {
      return store.state.sucai;
    });
    const atr = common_vendor.ref("");
    const operationBtnStyle = common_vendor.computed(() => {
      return (type) => {
        const style = {};
        if (type === "cancel") {
          style.backgroundColor = "transparent";
          style.color = "var(--bee-FC-000-40)";
        }
        if (type === "confirm") {
          style.backgroundColor = "#65D19F";
          style.color = "#ffffff";
        }
        return style;
      };
    });
    const onChooseAvatar = (e) => {
      console.log(e);
      const { avatarUrl } = e.detail;
      atr.value = avatarUrl;
    };
    const hecheng = () => {
      getSelectorNodeInfo("#target").then((res) => {
        console.log("res", res);
        const node = res[0].node;
        node.takeSnapshot({
          type: "arraybuffer",
          format: "png",
          success: (res2) => {
            const savePath = `${common_vendor.wx$1.env.USER_DATA_PATH}/hello.png`;
            const fs = common_vendor.wx$1.getFileSystemManager();
            fs.writeFileSync(savePath, res2.data, "binary");
            common_vendor.wx$1.showShareImageMenu({
              //唤起分享图片的界面
              path: savePath
            });
          },
          fail(res2) {
          }
        });
      });
    };
    const errorstate = common_vendor.ref(false);
    const privacyPopup = common_vendor.ref(false);
    const privacy = common_vendor.ref({
      title: "用户隐私保护提示",
      desc1: "亲爱的用户，感谢您信任并使用本小程序!\n我们非常重视用户的隐私和个人信息保护，您在使用我们的产品/服务时，我们可能会收集和使用您的相关信息，为此我们依据相关法律制定了",
      urltitle: "《用户隐私保护指引》",
      desc2: "，请您在点击同意之前仔细阅读并充分理解相关条款。",
      content: "",
      cancelText1: "不同意",
      cancelText2: "仍不同意并退出",
      confirmText: "同意并继续"
    });
    const disagree1 = common_vendor.ref(true);
    const disagree2 = common_vendor.ref(false);
    let privacyHandler;
    let closePopUp;
    let privacyResolves = /* @__PURE__ */ new Set();
    let closeOtherPagePopUpHooks = /* @__PURE__ */ new Set();
    common_vendor.index.onNeedPrivacyAuthorization((resolve) => {
      if (typeof privacyHandler === "function") {
        privacyHandler(resolve);
      }
    });
    const closeOtherPagePopUp = (closePopUp2) => {
      closeOtherPagePopUpHooks.forEach((hook) => {
        if (closePopUp2 !== hook) {
          hook();
        }
      });
    };
    const handleDisagree1 = (e) => {
      error();
      disagree1.value = false;
      disagree2.value = true;
      common_vendor.index.showToast({
        icon: "none",
        title: "请先同意协议"
      });
    };
    const handleAgree = (e) => {
      privacyPopup.value = false;
      privacyResolves.forEach((resolve) => {
        resolve({
          event: "agree",
          buttonId: "agree-btn"
        });
      });
      privacyResolves.clear();
    };
    const openmsg = () => {
      common_hooks_useCommonJs_index.toPrivacy();
    };
    const _privacyShow = async () => {
      common_vendor.index.getPrivacySetting({
        success: (res) => {
          if (res.needAuthorization) {
            privacyPopup.value = true;
          }
        }
      });
    };
    const error = () => {
      errorstate.value = true;
      let errorstateTimer = null;
      if (errorstateTimer)
        clearTimeout(errorstateTimer);
      errorstateTimer = setTimeout(() => {
        errorstate.value = false;
      }, 800);
    };
    common_vendor.onShareAppMessage((obj) => {
      return {
        title: "一键生成你的国庆头像，100款样式可以选择。开源并且免费。",
        path: "/pages/index/index",
        imageUrl: "https://pic.rmb.bdstatic.com/bjh/user/159ab60932814e5b0ed63967a069a110.jpeg"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "一键生成你的国庆头像，100款样式可以选择。开源并且免费。",
        query: "",
        imageUrl: "https://pic.rmb.bdstatic.com/bjh/user/159ab60932814e5b0ed63967a069a110.jpeg"
      };
    });
    common_vendor.onMounted(() => {
      common_vendor.nextTick$1(() => {
        disagree1.value = true;
        disagree2.value = false;
        _privacyShow();
        closePopUp = () => {
          privacyPopup.value = false;
        };
        privacyHandler = (resolve) => {
          privacyResolves.add(resolve);
          privacyPopup.value = true;
          closeOtherPagePopUp(closePopUp);
        };
        closeOtherPagePopUpHooks.add(closePopUp);
      });
    });
    common_vendor.onUnmounted(() => {
      closeOtherPagePopUpHooks.delete(closePopUp);
    });
    common_vendor.onShow(() => {
      disagree1.value = true;
      disagree2.value = false;
      _privacyShow();
    });
    common_vendor.onLoad((options) => {
      console.log("onLoad", options);
      base.value.title = options == null ? void 0 : options.title;
      base.value.bg = options == null ? void 0 : options.bg;
      base.value.tomini = options == null ? void 0 : options.tomini;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: atr.value ? atr.value : "https://pic.rmb.bdstatic.com/bjh/user/bce14036436d95aa6b8db1a38bfabdbe.jpeg",
        b: common_vendor.unref(sucai) ? common_vendor.unref(sucai) : "https://pic.rmb.bdstatic.com/bjh/user/7596b691d04c1f3273ed75c60da8e037.png",
        c: common_vendor.unref(systemScreenInfo).width - 80 + "px",
        d: common_vendor.unref(systemScreenInfo).width - 80 + "px",
        e: common_vendor.p({
          id: "target"
        }),
        f: common_vendor.o(($event) => common_vendor.unref(common_hooks_useCommonJs_index.embeddedwxClick)({
          extradata: {
            type: "atr"
          },
          shortlink: "#小程序://小锦囊plus/jvfoITpWJjeEirv"
        })),
        g: common_vendor.o(onChooseAvatar),
        h: common_vendor.o(hecheng),
        i: common_vendor.unref(navBarInfo).height + 80 + "px",
        j: common_vendor.t(privacy.value.title),
        k: common_vendor.t(privacy.value.desc1),
        l: common_vendor.t(privacy.value.urltitle),
        m: common_vendor.o(openmsg),
        n: common_vendor.t(privacy.value.desc2),
        o: common_vendor.o(handleAgree),
        p: common_vendor.t(privacy.value.confirmText),
        q: common_vendor.s(common_vendor.unref(operationBtnStyle)("confirm")),
        r: disagree1.value
      }, disagree1.value ? {
        s: common_vendor.o(handleDisagree1),
        t: common_vendor.t(privacy.value.cancelText1),
        v: common_vendor.s(common_vendor.unref(operationBtnStyle)("cancel"))
      } : {}, {
        w: disagree2.value
      }, disagree2.value ? {
        x: common_vendor.t(privacy.value.cancelText2),
        y: common_vendor.s(common_vendor.unref(operationBtnStyle)("cancel"))
      } : {}, {
        z: errorstate.value ? 1 : "",
        A: common_vendor.o(($event) => privacyPopup.value = $event),
        B: common_vendor.p({
          width: "80%",
          ["bg-color"]: "transparent",
          ["overlay-closeable"]: false,
          modelValue: privacyPopup.value
        })
      });
    };
  }
});
_sfc_defineComponent.__runtimeHooks = 6;
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_defineComponent, [["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/weifushou/Documents/HBuilderProjects/比比头像生成/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
