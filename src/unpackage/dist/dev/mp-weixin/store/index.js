"use strict";
const common_vendor = require("../common/vendor.js");
const key = Symbol();
const store = common_vendor.createStore({
  state: {
    sucai: ""
  },
  mutations: {
    SET_SUCAI(state, payload) {
      state.sucai = payload;
    }
  },
  actions: {
    setSucai: (context, payload) => {
      context.commit("SET_SUCAI", payload);
    }
  }
});
function useStore() {
  return common_vendor.useStore(key);
}
exports.key = key;
exports.store = store;
exports.useStore = useStore;
