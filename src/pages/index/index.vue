<template>
	<view class="content">
		<view class="atr-area" :style="{
			marginTop: navBarInfo.height + 80 +'px'
		}">
			<snapshot id="target" class="intro">
				<view class="images" :style="{
				width:systemScreenInfo.width - 80+'px',
				height:systemScreenInfo.width - 80+'px',
			}">
					<image class="img atr"
						:src="atr?atr:'https://pic.rmb.bdstatic.com/bjh/user/bce14036436d95aa6b8db1a38bfabdbe.jpeg'" />
					<image class="img sucai"
						:src="sucai?sucai:'https://pic.rmb.bdstatic.com/bjh/user/7596b691d04c1f3273ed75c60da8e037.png'" />
				</view>
			</snapshot>
			<view class="mainbtns">
				<view class="btn" @click="embeddedwxClick({
					extradata:{type:'atr'},
					shortlink:'#小程序://小锦囊plus/jvfoITpWJjeEirv'
				})">选择素材..</view>
				<view class="btn">
					<button class="button"
						open-type="chooseAvatar"
						@chooseavatar="onChooseAvatar" />
					获取头像
				</view>
			</view>
			<view class="hecheng"
				@click="hecheng">
				<view class="btn">合成头像</view>
			</view>
			<view class="minicopy">
				<view class="by">
					<text>Powered by 比比工作室</text>
				</view>
			</view>
		</view>
		<bee-popup v-model="privacyPopup"
			width="80%" bg-color="transparent"
			:overlay-closeable="false">
			<view class="privacyBox"
				:class="{on:errorstate}">
				<view class="title">
					{{privacy.title}}
				</view>
				<view class="content">
					<text class="text">
						{{ privacy.desc1}}<text
							class="text" :style="{
								color:'#65D19F'
							}" @tap.stop="openmsg">{{ privacy.urltitle }}</text>{{ privacy.desc2}}
					</text>
				</view>
				<view class="operation">
					<view class="confirm button"
						:style="operationBtnStyle('confirm')"
						hover-class="tn-u-btn-hover"
						:hover-stay-time="300">
						<button id="agree-btn"
							type="default"
							open-type="agreePrivacyAuthorization"
							class="btn"
							@agreeprivacyauthorization="handleAgree"></button>
						{{ privacy.confirmText }}
					</view>
					<view class="cancel button"
						v-if="disagree1"
						:style="operationBtnStyle('cancel')"
						hover-class="btn-hover"
						:hover-stay-time="300">
						<button type="default"
							class="btn"
							@tap.stop="handleDisagree1"></button>
						{{ privacy.cancelText1 }}
					</view>
					<view class="cancel button"
						v-if="disagree2"
						:style="operationBtnStyle('cancel')"
						hover-class="btn-hover"
						:hover-stay-time="300">
						<navigator class="btn"
							hover-class="none"
							target="miniProgram"
							open-type="exit">
						</navigator>
						{{ privacy.cancelText2 }}
					</view>
				</view>
			</view>
		</bee-popup>
	</view>
</template>
<script setup lang="ts">
	import {

		computed, nextTick, provide, reactive, ref, onMounted,
		onUnmounted, watch

	} from 'vue'
	import type { CSSProperties } from 'vue'
	import { useStore } from '@/store'
	import {
		useUniAppSystemRectInfo, useSelectorQuery
	} from '@/components/hooks'
	import { onLoad, onShow, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
	import { toPrivacy, dlimg, embeddedwxClick } from '@/common/hooks'
	const { navBarInfo, navBarBoundingInfo, systemScreenInfo } = useUniAppSystemRectInfo()
	const { getSelectorNodeInfo } = useSelectorQuery()
	const store = useStore()
	const base = ref({
		title: '节日头像生成',
		bg: '',
		music: {},
		tomini: ''
	})
	const sucai = computed<any>(() => {
			return store.state.sucai
	}) 
	const atr = ref('')

	const operationBtnStyle = computed<(type : string) => CSSProperties>(() => {
		return (type : 'cancel' | 'confirm') => {
			const style : CSSProperties = {}

			if (type === 'cancel') {
				style.backgroundColor = 'transparent'
				style.color = 'var(--bee-FC-000-40)'
			}
			if (type === 'confirm') {
				style.backgroundColor = '#65D19F'
				style.color = '#ffffff'
			}

			return style
		}
	})

	const onChooseAvatar = (e : any) => {
		console.log(e)
		const { avatarUrl } = e.detail
		atr.value = avatarUrl
	}

	const hecheng = () => {
		getSelectorNodeInfo('#target').then((res) => {
			console.log('res', res)
			const node = res[0].node
			node.takeSnapshot({
				type: 'arraybuffer',
				format: 'png',
				success: (res:any) => {
					const savePath = `${wx.env.USER_DATA_PATH}/hello.png`
					const fs = wx.getFileSystemManager();
					fs.writeFileSync(savePath, res.data, 'binary'); //图片保存至本地
					wx.showShareImageMenu({ //唤起分享图片的界面
						path: savePath
					})
				},
				fail(res) { }
			})
		})
	}

	const errorstate = ref(false)
	const privacyPopup = ref(false)
	const privacy = ref({
		title: '用户隐私保护提示',
		desc1: "亲爱的用户，感谢您信任并使用本小程序!\n我们非常重视用户的隐私和个人信息保护，您在使用我们的产品/服务时，我们可能会收集和使用您的相关信息，为此我们依据相关法律制定了",
		urltitle: "《用户隐私保护指引》",
		desc2: "，请您在点击同意之前仔细阅读并充分理解相关条款。",
		content: '',
		cancelText1: '不同意',
		cancelText2: '仍不同意并退出',
		confirmText: '同意并继续'
	})
	const disagree1 = ref(true)
	const disagree2 = ref(false)

	let privacyHandler
	let closePopUp
	let privacyResolves = new Set()
	let closeOtherPagePopUpHooks = new Set()

	// let closeAuthPopUp
	// let closeOtherPageAuthPopUpHooks = new Set()

	uni.onNeedPrivacyAuthorization(resolve => {
		// console.log("on needPrivacyAuthorization")
		// 此处缓存 resolve 函数
		// privacyPopup.value = true
		// resolvePrivacyAuthorization = resolve
		if (typeof privacyHandler === 'function') {
			privacyHandler(resolve)
		}
	})

	const closeOtherPagePopUp = (closePopUp : any) => {
		closeOtherPagePopUpHooks.forEach(hook => {
			if (closePopUp !== hook) {
				hook()
			}
		})
	}

	// 不同意按钮1
	const handleDisagree1 = (e : any) => {
		error()
		disagree1.value = false
		disagree2.value = true
		uni.showToast({
			icon: 'none',
			title: '请先同意协议'
		})

	}

	// 不同意按钮逻辑
	const handleDisagree2 = (e : any) => {

	}

	//同意按钮逻辑
	const handleAgree = (e : any) => {
		privacyPopup.value = false
		privacyResolves.forEach(resolve => {
			resolve({
				event: 'agree',
				buttonId: 'agree-btn'
			})
		})
		privacyResolves.clear()
	}

	const openmsg = () => {
		toPrivacy()
	}

	const _privacyShow = async () => {
		uni.getPrivacySetting({
			success: res => {
				// console.log(res)
				if (res.needAuthorization) {
					// privacyContractName.value = res?.privacyContractName
					privacyPopup.value = true
				}
			}
		})
	}

	const error = () => {
		errorstate.value = true
		let errorstateTimer = null
		if (errorstateTimer) clearTimeout(errorstateTimer)
		errorstateTimer = setTimeout(() => {
			errorstate.value = false
		}, 800)

	}
	
	onShareAppMessage((obj) => {
			return {
				title: '一键生成你的国庆头像，100款样式可以选择。开源并且免费。',
				path: '/pages/index/index',
				imageUrl: 'https://pic.rmb.bdstatic.com/bjh/user/159ab60932814e5b0ed63967a069a110.jpeg'
			}
	})
	onShareTimeline(() => {
		return {
			title: '一键生成你的国庆头像，100款样式可以选择。开源并且免费。',
			query: '',
			imageUrl: 'https://pic.rmb.bdstatic.com/bjh/user/159ab60932814e5b0ed63967a069a110.jpeg'
		}
	})


	onMounted(() => {
		nextTick(() => {
			disagree1.value = true
			disagree2.value = false
			_privacyShow()

			closePopUp = () => {
				privacyPopup.value = false
			}
			privacyHandler = resolve => {
				privacyResolves.add(resolve)
				privacyPopup.value = true
				// 额外逻辑：当前页面的隐私弹窗弹起的时候，关掉其他页面的隐私弹窗
				closeOtherPagePopUp(closePopUp)
			}

			closeOtherPagePopUpHooks.add(closePopUp)
		})
	})

	onUnmounted(() => {
		closeOtherPagePopUpHooks.delete(closePopUp)
	})
	
	onShow(() => {
		disagree1.value = true
		disagree2.value = false
		_privacyShow()
	})

	onLoad((options : any) => {
		console.log('onLoad',options)
		base.value.title = options?.title
		base.value.bg = options?.bg
		base.value.tomini = options?.tomini
	})
</script>
<style lang="scss" scoped>
	.content {
		
			--bee-SVG-INVERT: invert(0);
			--bee-BG-MAIN: rgba(255, 255, 255, 1);
			--bee-BG-MAIN-00: rgba(255, 255, 255, 0);
			--bee-BG-MAIN-01: rgba(255, 255, 255, .1);
			--bee-BG-MAIN-95: rgba(255, 255, 255, .95);
			--bee-BG-MAIN-50: rgba(255, 255, 255, .5);
			--bee-BG-AIR: rgba(245, 245, 245, 1);
			--bee-BG-AIR-00: rgba(245, 245, 245, 0);
			--bee-BG-AIR-95: rgba(245, 245, 245, .95);
			--bee-BG-SUB: rgba(255, 255, 255, 1);
			--bee-BG-MAIN-FC: rgba(0, 0, 0, 1);
			--bee-BG-MAIN-FC-60: rgba(0, 0, 0, .6);
			--bee-BG-MAIN-FC-05: rgba(0, 0, 0, .05);
			--bee-BG-LOG-00: rgba(0, 0, 0, 1);
			--bee-BG-00: rgba(0, 0, 0, 1);
			--bee-BG-00-40: rgba(0, 0, 0, .4);
			--bee-BG-00-03: rgba(0, 0, 0, .03);
			--bee-BG-00-10: rgba(0, 0, 0, .1);
			--bee-BG-FFF: rgba(255, 255, 255, 1);
			--bee-FC-000-40: rgba(0, 0, 0, .4);
			--bee-FC-000-60: rgba(0, 0, 0, .6);
			--bee-FC-000-80: rgba(0, 0, 0, .8);
			--bee-FC-000: rgba(0, 0, 0, 1);
			--bee-FC-000-04: rgba(0, 0, 0, .04);
			--bee-BOR-000-05: rgba(0, 0, 0, .05);
	}
	.content {
		width: 100%;
		height:100%;
		  

		.atr-area {
			margin: 40px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		.images {
			border-radius: 8px;
			overflow: hidden;
			background-color: #f0f0f0;
			position: relative;

			.img {
				position: absolute;
				width: 100%;
				height: 100%;
			}
		}

		.hecheng {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.btn {
				width: 80%;
				height: 36px;
				border-radius: 8px;
				background-color: #65D19F;
				color: #ffffff;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.mainbtns {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		position: relative;
		margin-top: 25px;
		margin-bottom: 10px;
		padding: 0 25px;

		.btn {
			position: relative;
			flex-grow: 1;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			padding: 14px;
			font-size: 16px;

			.button {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				border: none !important;
				opacity: 0;
				z-index: 15;
			}
		}
	}

	.minicopy {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		line-height: 1.5;
		font-size: 11px;
		color: var(--bee-FC-000-40);
	}

	@keyframes shake {

		/* 水平抖动，核心代码 */
		10%,
		90% {
			transform: translate3d(-1px, 0, 0);
		}

		20%,
		80% {
			transform: translate3d(+2px, 0, 0);
		}

		30%,
		70% {
			transform: translate3d(-4px, 0, 0);
		}

		40%,
		60% {
			transform: translate3d(+4px, 0, 0);
		}

		50% {
			transform: translate3d(-4px, 0, 0);
		}
	}

	.privacyBox.on {
		animation: shake 800ms ease-in-out;
	}

	.privacyBox {
		background-color: var(--bee-BG-AIR);
		display: flex;
		flex-direction: column;
		border-radius: 16px;
		overflow: hidden;

		.title {
			width: 100%;
			text-align: center;
			font-size: 20px;
			padding: 20px 15px 0;
			flex-shrink: 0;
		}

		.msg {
			width: 100%;
			font-size: 13px;
			padding: 15px 15px 0;
			display: flex;
			flex-direction: row;
			opacity: .6;
		}

		.content {
			width: 100%;
			font-size: 13px;
			padding: 20px 20px 0;
			line-height: 1.5;
			opacity: .7;
			font-weight: 300;
		}

		.operation {
			width: 100%;
			position: relative;
			margin-top: 25px;
			margin-bottom: 10px;
			padding: 0 25px;
			display: flex;
			flex-direction: column;
			flex-shrink: 0;

			.cancel {}

			.confirm {
				border-radius: 100px;
			}

			.button {
				position: relative;
				flex-grow: 1;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				padding: 14px;
				font-size: 16px;

				.btn {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
					border: none !important;
					opacity: 0;
					z-index: 15;
				}
			}
		}
	}
</style>