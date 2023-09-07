	<script lang="ts" setup>
	import { ref, nextTick, onMounted, watch, toRefs, computed, unref } from 'vue'
	// import { usePlayerStore } from '@/store/player';
	import { usePlayerStore } from '@/store/player';
	
	// import TnIcon from '../../icon/src/icon.vue'
	import { navBarProps, navbarEmits } from './navbar'
	import { useNavbar, useNavbarCustomStyle } from './composables'
	import { useStore } from '@/store'
	import { getvibrateShort,linkMine,linkSearch } from '@/common/hooks'
	import type { Song } from '@/common/tokens/song';
	import { debugWarn, generateId } from '../../../utils'
	// import { getCurrentInstance } from "vue";

	// const { proxy } : any = getCurrentInstance();
	const { pushPlayList } = usePlayerStore();

	const props = defineProps(navBarProps)
	const emits = defineEmits(navbarEmits)
	const store = useStore()
	const beeoptions = computed<any>(() => {
		return store.getters.get('beeOptions')
	}) 
	const { navbackButtonType, clickBackEvent, clickHomeEvent } = useNavbar(props)
	const {
		ns,
		backNs,
		navBarInfo,
		navbarClass,
		navbarStyle,
		navbarBgClass,
		navbarBgStyle,
		navbarPlaceholderStyle,
		navbarWrapperStyle,
		backStyle,
		btnStyle,
		contentStyle,
	} = useNavbarCustomStyle(props, navbackButtonType)

	// 动态调用是返回首页还是返回上一页
	const backEvent = (type : 'back' | 'home') => {
		if (type === 'back') {
			clickBackEvent()
		} else {
			clickHomeEvent()
		}
	}
	// const phoneState = ref(store.state.phoneview)
	const phoneState = computed(() => {
	  return unref(store.state.phoneview) || store.state.phoneview
	})
	
	const userId = computed<any>(() => {
		return store.getters.get('accessToken')
	})

	const phonechangeCheck = () => {
		// phoneState.value = !phoneState.value
		store.commit('SET_PHONEVIEW', !phoneState.value)
		getvibrateShort();
	}

	const {
		togglePlay,
		isPause
	} = toRefs(usePlayerStore());

	const songList = ref<Song[]>(JSON.parse(beeoptions.value.musicgroup.musicjson));

	// songList.value = [
	// 	{
	// 		"title": "陷落Falling",
	// 		"author": "不知名选手Au / 马也_Crabbit",
	// 		"url": "https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE0Nzk=",
	// 		"pic": "https://enshimama.oss-cn-shanghai.aliyuncs.com/smartgallery/music/01.jpg",
	// 		"lrc": ""
	// 	},
	// 	{
	// 		"title": "一个人想着一个人 ",
	// 		"author": "如懿",
	// 		"url": "https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE0ODA=",
	// 		"pic": "https://enshimama.oss-cn-shanghai.aliyuncs.com/smartgallery/music/02.jpg",
	// 		"lrc": ""
	// 	},
	// 	{
	// 		"title": "夜车（Cover 曾轶可）",
	// 		"author": "姜铭杨",
	// 		"url": "https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE0ODE=",
	// 		"pic": "https://enshimama.oss-cn-shanghai.aliyuncs.com/smartgallery/music/03.jpg",
	// 		"lrc": ""
	// 	}
	// ]
	
	songList.value.map((item, index) => {
	          const newItem = item
	          newItem.id = generateId()
	          newItem.url = item.url
	          newItem.title = item.title
	          newItem.author = item.author
	          newItem.pic = item.pic
	          return newItem
	        })

	const readyAllmusic = () => {
		pushPlayList(true, ...songList.value);
		// 
	}
	
	const isLogin = () => {
		uni.$emit('setAuth', true)
	}

	const catsClick = () => {
		
		uni.$emit('togglecats');
	}
	// 动态调用
	const clickAddEvent = (type : any) => {
		if (type === 'allcats') {
			
			catsClick()
		} else if (type === 'phone') {
			phonechangeCheck()
		} else if (type === 'search') {
			linkSearch()
		} else if (type === 'mine') {
			if (userId.value) {
				linkMine()
			} else {
				isLogin()
			}
			// if (!this.$store.getters['session/get']('isLogin')) {
			// 	this.mpLoginMode()
			// } else {
			// 	this.linkMine()
			// }
		} else if (type === 'share') {
			return
		} else if (type === 'back') {
			// this.back()
			clickBackEvent()
		} else if (type === 'home') {
			// this.goHome()
			clickHomeEvent()
		} else if (type === 'closepc') {
			// this.closePCbox()
		}
	}

	// const openmusicbox = () => {
	// 	if (proxy.$zaudio) {
	// 		proxy.$zaudio.operate()
	// 	}
	// }
	const addIcon = props.addIcon.map((item, index) => {
		const newItem = {}
		if (item === 'allcats') {
			newItem.iconname = 'menu-2-line'
		}
		if (item === 'search') {
			newItem.iconname = 'search-2-line'
		}
		if (item === 'phone') {
			newItem.iconname = 'smartphone-line'
			newItem.iconnameon = 'smartphone-fill'
		}
		if (item === 'share') {
			newItem.iconname = 'share-circle-line'
		}
		if (item === 'mine') {
			newItem.iconname = 'user-3-line'
		}
		if (item === 'back') {
			newItem.iconname = 'arrow-left-line'
		}
		if (item === 'home') {
			newItem.iconname = 'home-line'
		}
		if (item === 'closepc') {
			newItem.iconname = 'close-circle-fill'
		}
		newItem.clicktype = item
	
		return newItem
	})

	// 组件初始化完成
	onMounted(() => {
		nextTick(() => {
			readyAllmusic()
			emits('initFinish', navBarInfo)
		})

		// if (proxy.$zaudio) {
		// 	proxy.$zaudio.syncRender()
		// 	proxy.$zaudio.syncStateOn(action.value, ({
		// 		paused
		// 	}) => {
		// 		console.log('paused', paused)
		// 		paused.value = paused
		// 	})
		// }
	})
	</script>

	// #ifdef MP-WEIXIN
	<script lang="ts">
	export default {
		options: {
			// 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
			virtualHost: true
		}
	}
	</script>
	// #endif

	<template>
		<view :class="[navbarClass]" :style="navbarStyle">
			<!-- 背景颜色 -->
			<view :class="navbarBgClass" :style="navbarBgStyle" />
			<!-- 容器 -->
			<view :class="[ns.e('wrapper')]" :style="navbarWrapperStyle">
				<!-- 返回按钮区域 -->
				<view v-if="navbackButtonType !== 'none'" :class="[backNs.b()]" :style="backStyle">
					<slot name="back">

						<!-- 双图标 -->
						<view v-if="navbackButtonType === 'multi'" :class="[backNs.e('multi')]">
							<view :class="[backNs.e('multi__item')]" :style="btnStyle" @tap.stop="clickBackEvent">
								<bee-icon size="22px" :invert="!active?true:false" :name="backIcon" />
							</view>
							<view :class="[backNs.e('multi__item')]" :style="btnStyle" @tap.stop="clickHomeEvent">
								<bee-icon size="22px" :invert="!active?true:false" :name="homeIcon" />
							</view>
						</view>

						<!-- 单图标 -->
						<view v-if="navbackButtonType === 'single'" :class="[backNs.e('single')]" :style="btnStyle"
							@tap.stop="backEvent(backIcon ? 'back' : 'home')">
							<bee-icon v-if="backIcon" size="22px" :invert="!active?true:false"
								:name="backIcon" />
							<bee-icon v-else-if="homeIcon" size="22px" :invert="!active?true:false"
								:name="homeIcon" />
						</view>


						<!-- 文字返回 -->
						<view v-if="navbackButtonType === 'text'" :class="[backNs.e('text')]" @tap.stop="clickBackEvent">
							<view :class="[backNs.e('text__icon')]">
								<bee-icon size="20px" :invert="!active?true:false" :name="backIcon || 'left'" />
							</view>
							<view class="tn-text-ellipsis-1" :class="[backNs.e('text__value')]">
								{{ backText || '返回' }}
							</view>
						</view>


						<!-- 额外的图标 -->
						<view v-if="navbackButtonType === 'add'" :class="[backNs.e('add')]">
							<view v-for="(item, index) in addIcon" :key="index" :class="[backNs.e('add__item')]"
								:style="btnStyle" @tap.stop="clickAddEvent(item.clicktype)">
								<bee-icon size="22px" :invert="!active?true:false"
									:name="item.clicktype==='phone'?phoneState ? item.iconnameon : item.iconname:item.iconname" />
								<button v-if="item.clicktype==='share'" class="button" open-type="share" plain="true"
									:data-sharetitle="beeoptions.seogroup.share.hometitle ? beeoptions.seogroup.share.hometitle : beeoptions.datagroup.base.mini_title || ''"
									:data-shareimg="beeoptions.seogroup.share.homethumb ? beeoptions.seogroup.share.homethumb : ''" />
							</view>
							<view v-if="playerIcon" :style="btnStyle" :class="[backNs.e('add__item')]" @click="togglePlay">
								<div class="playing" :class="{on:!isPause}">
									<span class="playing__bar playing__bar1" :class="{on:!active}" />
									<span class="playing__bar playing__bar2" :class="{on:!active}" />
									<span class="playing__bar playing__bar3" :class="{on:!active}" />
								</div>
							</view>
						</view>

					</slot>
				</view>

				<!-- 内容数据 -->
				<view v-if="$slots.default" :class="[ns.e('content'),{[ns.em('content', 'center')]: center,},]"
					:style="contentStyle">
					<slot />
				</view>
			</view>
		</view>
		<!-- 固定之后会导致容器塌陷 -->
		<view v-if="fixed && placeholder" :class="[ns.e('placeholder')]" :style="navbarPlaceholderStyle" />
	</template>

	<style lang="scss" scoped>
		@import '../../../theme-chalk/src/navbar.scss';

		.playing {
			width: 3rem;
			height: 2rem;
			border-radius: .3rem;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			box-sizing: border-box;
			transform: scale(.5);
			position: relative;
			overflow: hidden;
		}

		.playing__bar {
			position: absolute;
			display: inline-block;
			width: 5px;
			height: 100%;

			bottom: -110%;
			border-radius: .1rem;
			background-color: var(--bee-BG-MAIN-FC);

		}

		.playing__bar.on {
			background-color: rgba(255, 255, 255, 1) !important;

		}

		.playing.on .playing__bar {
			position: absolute;
			display: inline-block;
			width: 5px;
			height: 100%;

			bottom: -110%;
			border-radius: .1rem;
			animation: up-and-down 1.3s ease infinite alternate;
			transform: translateZ(0);
			animation-fill-mode: forwards;
		}

		.playing__bar1 {
			// height: 60%;
			left: 4px;
			transform: translateY(-85%);
		}

		.playing__bar2 {
			// height: 30%;
			left: 20px;
			transform: translateY(-55%);
			animation-delay: -2.4s;
		}

		.playing.on .playing__bar2 {
			// height: 30%;
			left: 20px;
			transform: translateY(-55%);
			animation-delay: -2.4s;
		}

		.playing__bar3 {
			left: 36px;
			// height: 75%;
			transform: translateY(-100%);
			animation-delay: -3.7s;
		}

		.playing.on .playing__bar3 {
			left: 36px;
			// height: 75%;
			transform: translateY(-100%);
			animation-delay: -3.7s;
		}

		@keyframes up-and-down {
			10% {
				// height: 30%;
				transform: translateY(-30%);
			}

			30% {
				// height: 100%;
				transform: translateY(-100%);
			}

			60% {
				// height: 50%;
				transform: translateY(-50%);
			}

			80% {
				// height: 75%;
				transform: translateY(-75%);
			}

			100% {
				// height: 20%;
				transform: translateY(-20%);
			}
		}
	</style>