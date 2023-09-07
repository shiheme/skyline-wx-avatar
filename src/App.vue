<script setup lang="ts">
	import { onLaunch,onShow } from '@dcloudio/uni-app'
	import { installRouteBuilder } from '@/common/utils/custom-route/custom-route.js'
	import { useStore } from '@/store'
	
	onLaunch(() => {
		installRouteBuilder()
		const tip =
			'\n\n...................................\n.#####...######..######..#####...######..######.\n.##..##..##......##......##..##..##......##.....\n.#####...####....####....#####...####....####...\n.##..##..##......##......##..##..##......##.....\n.#####...######..######..#####...######..######.\n................................................\n欢迎使用比比小程序进行创作，\n需要帮助或者更新版本请进入官方公众号[APP比比]查看。\n网址：https://beebee.work/\n'
		console.log(tip)
	})
	onShow((options:any) => {
		const store = useStore()
		if(options?.referrerInfo?.extraData?.image){
			store.commit('SET_SUCAI', options?.referrerInfo?.extraData?.image)
		}
	})
</script>

<style>
	/*每个页面公共css */
</style>
