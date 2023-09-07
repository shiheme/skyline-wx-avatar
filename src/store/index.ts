import { InjectionKey } from "vue";

/**
 * 引入InjectionKey 并将其传入usestore 
 * 
 */

import { useStore as baseUseStore, createStore, Store } from 'vuex'

//为store state声明类型
export interface State {
	sucai : string
}

//定义 injection key
export const key : InjectionKey<Store<State>> = Symbol()

//导出store模块
export const store = createStore<State>({
	state: {
		sucai: ''
	},
	mutations: {
		SET_SUCAI(state, payload : string) {
			state.sucai = payload;
		}
	},
	actions: {
		setSucai: (context, payload) => {
			context.commit('SET_SUCAI', payload);
		}
	}
})
export function useStore() {
	return baseUseStore(key)
}