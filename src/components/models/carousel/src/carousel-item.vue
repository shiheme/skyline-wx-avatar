<script lang="ts" setup>
	import { ref, onMounted, unref, onUnmounted } from "vue";
	import { carouselEmits, carouselProps } from './carousel'
	import { useCarousel, useCarouselCustomStyle } from './composables'
	// import anime from 'animejs';
	import { useTranslateX, useTranslateY, useAnime } from '@/common/hooks'
	const top = ref<HTMLElement | null>(null);
	const middle = ref<HTMLElement | null>(null);
	const bottom = ref<HTMLElement | null>(null);

	
	const props = defineProps(carouselProps)
	const emits = defineEmits(carouselEmits)

	// const { currentCarouselIndex, carouselCount, carouselChangeHandle, itemClickHandle } =
	// 	useCarousel(props, emits)
	const { ns, carouselStyle, carouselColorStyle, indicatorColorClass, indicatorColorStyle } =
		useCarouselCustomStyle(props)

	let tiemr = ref(null);
	const switchIndex = ref(0);
	const rotationRef = ref<HTMLElement | null>(null);
	const indicatorRef = ref<HTMLElement | null>(null);
	const description = ref(null); //&#x56FE;&#x7247;&#x63CF;&#x8FF0;
	
	useTranslateY(rotationRef, -60, 0, 600, 200);
	useAnime({
		targets: indicatorRef,
		translateX: [-600, 0],
		duration: 600,
		easing: 'easeInOutQuad',
		opacity: [0, 1],
	});
	

	//banner&#x64AD;&#x653E;&#x65B9;&#x5F0F;
	const addTimer = () => {
		if (props.autoSwitch === true) {
			//&#x81EA;&#x52A8;&#x64AD;&#x653E;
			tiemr = setInterval(() => {
				switchBanner("right");
			}, props.interval);
		}
	};

	// &#x6E05;&#x9664;&#x5B9A;&#x65F6;&#x5668;
	const stopInterval = () => {
		clearInterval(tiemr);
	};

	//banner&#x6587;&#x5B57;&#x63D0;&#x793A;&#xFF08;&#x975E;&#x5FC5;&#x987B;&#xFF09;
	const switchDescription = () => {
		if (props.listBanner) {
			props.listBanner.map((item, index) => {
				if (index === switchIndex.value) {
					description.value = item.description;
				}
			});
		}
	};

	//&#x4E0A;&#x4E00;&#x5F20;&#x548C;&#x4E0B;&#x4E00;&#x5F20;&#x56FE;&#x7247;&#x900F;&#x660E;&#x5EA6;&#x5207;&#x6362;
	const changePicture = (num : number) => {
		toBannerBar(num);
	};

	//&#x5E95;&#x90E8;&#x5C0F;&#x6A2A;&#x6761;&#x989C;&#x8272;&#x5207;&#x6362;
	const toBannerBar = (val : number) => {
		// for (let i of indicatorRef.value) {
		// 	i.style.backgroundColor = "rgba(221, 221, 221, 0.541)";
		// }
		// if (indicatorRef.value.length !== 0) {
		// 	indicatorRef.value[val].style.backgroundColor = "#ffffff";
		// }
	};

	//&#x5DE6;&#x53F3;&#x5207;&#x6362;banner
	const switchBanner = (value : any) => {
		if (value === "right") {
			switchIndex.value++;
			if (switchIndex.value === props.listBanner.length) {
				switchIndex.value = 0;
			}
		} else {
			switchIndex.value--;
			if (switchIndex.value === -1) {
				switchIndex.value = props.listBanner.length - 1;
			}
		}
		changePicture(switchIndex.value);
		switchDescription();
	};

	//&#x5E95;&#x90E8;&#x6A2A;&#x6761;&#x5207;&#x6362;banner
	const swatchIndicator = (value : any) => {
		switchIndex.value = value;
		changePicture(switchIndex.value);
		switchDescription();
	};

	//banner&#x94FE;&#x63A5;&#x8DF3;&#x8F6C;&#xFF08;&#xFF08;&#x975E;&#x5FC5;&#x987B;&#xFF09;
	const bannerLink = () => {
		if (props.listBanner) {
			props.listBanner.map((item, index) => {
				if (index === switchIndex.value && item.url !== "" && item.url !== null) {
					window.location.href = item.url;
				}
			});
		}
	};
	// let bgAnimate:anime.AnimeInstance
	onMounted(() => {
		addTimer();

		// bgAnimate = anime({
		// 	targets: '.fade-banner',
		// 	translateX: 250,
		// 	easing: 'easeInOutSine'
		// });
	});
	onUnmounted(() => {
		stopInterval();
	});
</script>

// #ifdef MP-WEIXIN
<script lang="ts">
	export default {
		options: {
			// &#x5728;&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;&#x4E2D;&#x5C06;&#x7EC4;&#x4EF6;&#x8282;&#x70B9;&#x6E32;&#x67D3;&#x4E3A;&#x865A;&#x62DF;&#x8282;&#x70B9;&#xFF0C;&#x66F4;&#x52A0;&#x63A5;&#x8FD1;Vue&#x7EC4;&#x4EF6;&#x7684;&#x8868;&#x73B0;(&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;shadow&#x8282;&#x70B9;&#x4E0B;&#x518D;&#x53BB;&#x521B;&#x5EFA;&#x5143;&#x7D20;)
			virtualHost: true,
		},
	}
</script>
// #endif

<template>
	<view class="banner-container" :style="carouselStyle">
		<view class="fade-banner">
			<view class="rotation-banner" ref="rotationRef" :style="carouselColorStyle(index === switchIndex)"
				v-for="(item, index) in listBanner" :key="index">
				<image class="banner-img" @click="bannerLink" :src="item.img" :title="description" />
			</view>
		</view>
		<view class="left-button" @click="switchBanner('left')" />
		<view class="right-button" @click="switchBanner('right')" />
		<view class="indicator-number">
			<view v-for="index in listBanner.length" :key="index" class="barExternal"
				@click="swatchIndicator(index - 1)">
				<view ref="indicatorRef" class="default-indicator" :class="{'active-indicator':index - 1 === 0}"
					:style="indicatorColorStyle(index === switchIndex)"></view>
			</view>
		</view>
	</view>
</template>

<style lang="scss">
	.banner-container {
		position: relative;

		.fade-banner {
			position: relative;
			list-style: none
		}

		.rotation-banner {
			position: absolute;
			opacity: 0;
			transition-duration: 1.5s;
			width: 100%;

			&:first-child {
				opacity: 1
			}
		}

		.banner-img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			cursor: pointer
		}

		.left-button {
			position: absolute;
			cursor: pointer;
			top: 50%;
			left: 25px;
			width: 36px;
			height: 36px;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: rgb(31, 45, 61, 0.3);
			border-radius: 50%;
			opacity: 0
		}

		.right-button {
			position: absolute;
			width: 36px;
			height: 36px;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			top: 50%;
			right: 25px;
			background-color: rgb(31, 45, 61, 0.3);
			border-radius: 50%;
			opacity: 0
		}

		.icon {
			height: 20px;
			width: 20px
		}

		.indicator-number {
			position: absolute;
			left: 50%;
			bottom: 15px;
			transform: translateX(-50%);
			cursor: pointer;
			display: flex;

			.barExternal {
				height: 20px;
				display: flex;
				justify-content: center;
				align-items: center;

				.default-indicator {
					width: 30px;
					height: 2px;
					background: var(--tn-color-white);
					display: block;
					float: left;
					margin-right: 10px
				}

				.active-indicator {
					background: #ffffff
				}
			}
		}

		&:hover {
			.left-button {
				opacity: 1
			}

			.right-button {
				opacity: 1
			}
		}
	}
</style>