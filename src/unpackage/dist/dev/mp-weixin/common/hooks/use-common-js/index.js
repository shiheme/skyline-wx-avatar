"use strict";
const common_vendor = require("../../vendor.js");
const toPrivacy = () => {
  return new Promise((resolve) => {
    common_vendor.index.openPrivacyContract({
      success(res) {
        resolve(res);
      },
      fail(err) {
        resolve(err);
      }
    });
  });
};
const embeddedwxClick = (options) => {
  const appid = (options == null ? void 0 : options.appid) ?? "";
  const path = (options == null ? void 0 : options.path) ?? "";
  const extradata = (options == null ? void 0 : options.extradata) ?? {};
  const shortlink = (options == null ? void 0 : options.shortlink) ?? "";
  common_vendor.index.openEmbeddedMiniProgram({
    appId: appid,
    path,
    extraData: extradata,
    shortLink: shortlink,
    success(res) {
    },
    fail(res) {
      common_vendor.index.showToast({
        title: "打开失败",
        duration: 2e3
      });
    }
  });
};
exports.embeddedwxClick = embeddedwxClick;
exports.toPrivacy = toPrivacy;
