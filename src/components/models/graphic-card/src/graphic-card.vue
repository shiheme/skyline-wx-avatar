<script lang="ts" setup>
	import { ref, nextTick, onMounted, watch, toRefs, computed, unref } from 'vue'
	// import { usePlayerStore } from '@/store/player';
	import { usePlayerStore } from '@/store/player';
	import { useNamespace, useUniAppSystemRectInfo } from '../../../hooks'
	import type { Song } from '@/common/tokens/song';
	import { debugWarn, generateId } from '../../../utils'
	import TnPhotoAlbum from '../../photo-album/src/photo-album.vue'
	import TnLazyLoad from '../../lazy-load/src/lazy-load.vue'
	import { linkRedPackage, wxClick, textClick } from '@/common/hooks'

	import { graphicCardEmits, graphicCardProps } from './graphic-card'
	import { useGraphicCard, useGraphicCardCustomStyle } from './composables'

	import type { CSSProperties } from 'vue'

	const { cssInfo, navBarInfo, navBarBoundingInfo, systemScreenInfo } = useUniAppSystemRectInfo()
	const { id, isPause } = toRefs(usePlayerStore());
	const { pushPlayList, togglePlay, play } = usePlayerStore();

	const props = defineProps(graphicCardProps)
	const emits = defineEmits(graphicCardEmits)

	const {
		viewUserAvatars,
		viewUserCount,
		imageCount,
		cardClickEvent,
		handleAvatarClick,
		handleDownloadClick,
		handleCopyClick,
		handleLikeClick,
	} = useGraphicCard(props, emits)
	const {
		ns,
		tagClass,
		tagStyle,
		audioStyle,
		viewClass,
		viewStyle,
		commentClass,
		commentStyle,
		likeClass,
		likeStyle,
	} = useGraphicCardCustomStyle(props)
	// let songList = props.media;
	const songList = ref<Song[]>([])
	watch(() => props.media, (val) => {
		songList.value = val
	})

	const readyAllmusic = (i : number) => {

		pushPlayList(true, ...props.media);
		// 
		if (id.value === i) {
			togglePlay()
		} else {
			play(props.media[0])
		}

		// 
	}

	const panpath = ref(''),
		pancode = ref(''),
		panpathcode = ref(''),
		pantype = ref(0),
		pancnt = ref(''),
		pathtopan = ref(false)
	const panstyle = computed<CSSProperties>(() => {
		const style : CSSProperties = {}
		// let width = `calc(100% / ${props.column} - 6px)`

		style.backgroundColor = props.tagTextColor
		style.borderRadius = '4px'
		style.flexShrink = 0
		style.width = '44px'

		return style
	})
	const copystyle = computed<CSSProperties>(() => {
		const style : CSSProperties = {}
		// let width = `calc(100% / ${props.column} - 6px)`
			style.backgroundColor = 'var(--bee-BG-00-10)'
		style.color = 'var(--bee-FC-000-80)'
		style.borderRadius = '4px'
		style.marginRight = '5px'
		style.width = '44px'
		style.flexShrink = 0

		return style
	})
	const singleVideoStyle = computed<CSSProperties>(() => {
		const style : CSSProperties = {}
		// let width = `calc(100% / ${props.column} - 6px)`
		let column = 3

		let width = 0
		let height = 0
		if (props.media[0]?.width && props.media[0]?.height) {
			if (props.media[0]?.width / props.media[0]?.height >= 1.5) {
				width = 2 * (systemScreenInfo.minwidth - 10) / Number(column) - 6
			} else if (props.media[0]?.width / props.media[0]?.height < 1.5 && props.media[0]?.width / props.media[0]?.height >= 1.2) {
				width = 2 * (systemScreenInfo.minwidth - 70) / Number(column) - 6
			} else if (props.media[0]?.width / props.media[0]?.height < 1.2 && props.media[0]?.width / props.media[0]?.height > 0.5) {
				width = 2 * (systemScreenInfo.minwidth - 160) / Number(column) - 6
			} else {
				width = (systemScreenInfo.minwidth - 30) / Number(column) - 6
				// width = 2 * (systemScreenInfo.minwidth - 70) / Number(column) - 6
			}
		} else {
			width = 2 * (systemScreenInfo.minwidth - 10) / Number(column) - 6
		}
		// let width = 2 * (systemScreenInfo.minwidth - 10) / Number(column) - 6   //weibo
		height = (props.media[0]?.width && props.media[0]?.height) ? (width * (props.media[0]?.height) / (props.media[0]?.width)) : width * 9 / 16

		style.width = `${width}px`
		style.height = `${height}px`
		style.borderRadius = '8px'

		return style
	})

	if (typeof props.mediatype === 'string' && props.mediatype === 'pan') {
		let libdownload = props.media[0]?.path;
		let test1 = libdownload.match(new RegExp(/链接:\s(.*?)\s提取码:/));
		if (test1) {
			pantype.value = 1;
			panpath.value = test1[1];
			if (test1[1].indexOf("pan.baidu.com") != -1) {
				let test4 = test1[1].match(/pan.baidu.com\/s\/(.*)/);
				panpathcode.value = test4[1];
				pathtopan.value = true;
			}
			pancode.value = libdownload.match(/提取码:\s(.*)/)[1];
		} else {
			pantype.value = 0;
			pancnt.value = libdownload;
		}
	}
</script>
<template>
	<view :class="[ns.b()]"
		@tap.stop="cardClickEvent">
		<!-- 简要信息 -->
		<view :class="[ns.e('brief-info')]">
			<view
				:class="[ns.e('brief-info__content')]">
				<view
					:class="[ns.e('brief-info__avatar')]"
					@tap.stop="handleAvatarClick">
					<image class="image"
						:src="avatar"
						mode="aspectFill" />
				</view>
				<view
					:class="[ns.e('brief-info__data')]">
					<view
						class="title tn-text-ellipsis-1">
						{{ title }}
					</view>
					<view v-if="description"
						class="desc tn-text-ellipsis-1">
						{{ description }}
					</view>
				</view>
			</view>
			<view
				:class="[ns.e('brief-info__operation')]">
				<bee-icon name="more-line" />
			</view>
		</view>
		<!-- 内容容器 -->
		<view :class="[ns.e('container')]">
			<!-- 媒体 -->
			<view :class="[ns.e('media')]"
				v-if="mediatype==='audio'&&media[0]?.url">
				<!-- 标签和内容 -->
				<view
					:class="[ns.e('media__data')]">
					<view class="audio"
						v-if="mediatype==='audio'">
						<view class="audiobtn"
							:style="audioStyle"
							@click="readyAllmusic(mediaid)">
							<bee-icon invert
								color="#ffffff"
								size="18px"
								:name="isPause||(id!==mediaid)?'play-fill':'pause-fill'" />
						</view>
					</view>
				</view>
			</view>
			<!-- 内容 -->
			<view :class="[ns.e('content')]">
				<!-- 标签和内容 -->
				<view
					:class="[ns.e('content__data')]">
					<text style="overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp:3;
								-webkit-box-orient: vertical;
								white-space: nowrap;
								}" :max-lines="3">{{ content }}</text>
					<!-- <view class="open" :style="{
						color:tagTextColor
					}"><text>展开</text><bee-icon class="icon"
							size="20px"
							name="arrow-drop-right-line" />
					</view> -->
				</view>
				<view v-if="contentAuthor"
					:class="[ns.e('content__author')]">
					<text
						class="text">{{ "—— "+contentAuthor }}</text>
				</view>
			</view>
			<!-- 视频 -->
			<view
				v-if="mediatype==='video'&&media[0]?.url"
				:class="[ns.e('video')]">
				<view
					:class="[ns.e('video__bottom')]"
					style="position: relative;"
					:style="singleVideoStyle">
					<!-- <video :src="media[0]?.url"
						:show-center-play-btn="true"
						:show-play-btn="true"
						:controls="true"
						:loop="false"
						:picture-in-picture-mode="['push', 'pop']"
						object-fit="cover"
						style="position: absolute;"
						:style="singleVideoStyle"
						:show-background-playback-button="false"
						:poster="media[0]?.pic" /> -->
					<image :src="media[0]?.pic"
						:style="singleVideoStyle"
						mode="aspectFill" />
					<view class="cover">
						<view class="playbtn"
							:style="{background:tagTextColor}">
							<bee-icon invert
								color="#ffffff"
								size="22px"
								name="play-fill" />
						</view>
					</view>
				</view>
			</view>
			<view
				v-if="mediatype==='red'&&media[0]?.url"
				:class="[ns.e('red')]">
				<view
					:class="[ns.e('red__bottom')]"
					style="position: relative;"
					:style="singleVideoStyle"
					@click="linkRedPackage({url:media[0]?.url})">
					<!-- <video :src="media[0]?.url"
						:show-center-play-btn="true"
						:show-play-btn="true"
						:controls="true"
						:loop="false"
						:picture-in-picture-mode="['push', 'pop']"
						object-fit="cover"
						style="position: absolute;"
						:style="singleVideoStyle"
						:show-background-playback-button="false"
						:poster="media[0]?.pic" /> -->
					<image :src="media[0]?.pic"
						:style="singleVideoStyle"
						mode="aspectFill" />
				</view>
			</view>
			<view
				v-if="mediatype==='pan'&&media[0]?.path"
				:class="[ns.e('pan')]">
				<view
					:class="[ns.e('pan__bottom')]"
					style="position: relative;">
					<bee-input
						v-model="media[0].path"
						type="picker">
						<template #suffix>
							<view
								style="display: flex;flex-direction: row;align-items: center;justify-content:flex-start;">
								<bee-button
									@click="textClick({
							  copytxt:media[0]?.path
						  })" :custom-style="copystyle">复制</bee-button>
								<bee-button
									v-if="pantype===1"
									:custom-style="panstyle"
									@click="wxClick({
							appid:'wxdcd3d073e47d1742',
							path:'pages/netdisk_share/share?scene='+panpathcode+'#'+pancode+'#0#0'
						})">跳转</bee-button>
							</view>
						</template>
					</bee-input>
				</view>
			</view>
			<!-- 图片列表 -->
			<view v-if="!!imageCount"
				:class="[ns.e('images')]">
				<!-- 一张图片 -->
				<view v-if="imageCount === 1"
					:class="[ns.em('images', 'item'), ns.is('one')]">
					<!-- <TnLazyLoad :src="images[0]" /> -->
					<TnPhotoAlbum :data="images"
						:column="1" />
				</view>
				<!-- 四张图片 -->
				<view v-else-if="imageCount === 4"
					:class="[ns.em('images', 'item'), ns.is('four')]">
					<TnPhotoAlbum :data="images"
						:column="2" />
				</view>
				<view v-else
					:class="[ns.e('images')]">
					<TnPhotoAlbum
						:data="images" />
				</view>
				<!-- <TnPhotoAlbum v-if="imageCount >= 5" :data="images" /> -->
			</view>
			
			<view :class="[ns.e('tags')]">
				<view
					v-for="(tagItem, tagIndex) in tags"
					:key="tagIndex"
					class="tag-item"
					:class="[tagClass]"
					:style="tagStyle">
					{{ '#'+tagItem.text }}
				</view>
			</view>
			<!-- 底部信息 -->
			<view :class="[ns.e('bottom-info')]">
				<view
					:class="[ns.e('bottom-info__left')]">
					<text class="">{{date}}</text>
				</view>
				<view
					:class="[ns.e('bottom-info__right')]">
					<view
						v-if="showDownload&&images.length"
						class="count-item-data"
						@tap.stop="handleDownloadClick">
						<bee-icon class="icon"
							size="18px"
							name="download-cloud-2-fill" />
					</view>
					<view v-if="showCopy&&content"
						class="count-item-data"
						@tap.stop="handleCopyClick">
						<bee-icon class="icon"
							size="18px"
							name="file-copy-2-line" />
					</view>
					<view v-if="showShare"
						class="count-item-data">
						<bee-icon class="icon"
							size="18px"
							name="share-circle-line" />
					</view>
					<view v-if="showLike"
						class="count-item-data"
						@tap.stop="handleLikeClick">
						<bee-icon class="icon"
							size="18px"
							:name="activeLike ? 'heart-fill' : 'heart-line'" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<style lang="scss" scoped>
	@import '../../../theme-chalk/src/grapgic-card.scss';
</style>