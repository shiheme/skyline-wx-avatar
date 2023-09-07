import { computed, onMounted } from 'vue';

export const toPrivacy = () => {
	return new Promise((resolve) => {
		uni.openPrivacyContract({
			success(res : any) {
				resolve(res)
			},
			fail(err : any) {
				resolve(err)
			}
		})
	})
}

export const wxToPromise = (api : any, option : any) => {
	if (!api) {
		uni.showModel({
			title: '提示',
			content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试'
		})
		return Promise.reject()
	}

	return new Promise((resolve) => {
		api({
			...option,
			success(res : any) {
				resolve([res, undefined])
			},
			fail(err : any) {
				resolve([undefined, err])
			}
		})
	})
}

export interface vibrate {
	type ?: string
}

export const getvibrateShort = (options ?: vibrate) => {
	const type = options?.type ?? 'light'
	uni.vibrateShort({
		type: type
	})
}

// 跳转自定义链接
export interface custompath {
	path ?: string
}

export const linkClick = (options ?: custompath) => {
	const path = options?.path ?? ''
	uni.navigateTo({
		url: path
	})
}

export const redirectToClick = (options ?: custompath) => {
	const path = options?.path ?? ''
	uni.redirectTo({
		url: path
	})
}

// 复制文本内容
export interface poptxt {
	copytxt ?: string
	tiptext ?: string
}

export const textClick = async (options ?: poptxt) => {
	const copytxt = options?.copytxt ?? ''
	if (uni.requirePrivacyAuthorize) {
		let [res, err] = await wxToPromise(uni.requirePrivacyAuthorize, {})
		if (res) {
			uni.setClipboardData({
				data: copytxt
			})
		}
		if (err) {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: '请先同意《协议》'
			});
		}
	} else {
		uni.setClipboardData({
			data: copytxt
		})
	}

}

// 打开小程序
export interface wx {
	appid ?: string
	path ?: string
	extradata ?: object
	shortlink ?: string
}

export const wxClick = (options ?: wx) => {
	const appid = options?.appid ?? ''
	const path = options?.path ?? ''
	const extradata = options?.extradata ?? {}
	const shortlink = options?.shortlink ?? ''
	uni.navigateToMiniProgram({
		appId: appid,
		path: path,
		extraData: extradata,
		shortLink: shortlink,
		success(res) {
			// 打开成功
		},
		fail(res) {
			uni.showToast({
				title: '打开失败',
				duration: 2000
			});
		},
	})
}

export const embeddedwxClick = (options ?: wx) => {
	const appid = options?.appid ?? ''
	const path = options?.path ?? ''
	const extradata = options?.extradata ?? {}
	const shortlink = options?.shortlink ?? ''
	uni.openEmbeddedMiniProgram({
		appId: appid,
		path: path,
		extraData: extradata,
		shortLink: shortlink,
		success(res) {
			// 打开成功
		},
		fail(res) {
			uni.showToast({
				title: '打开失败',
				duration: 2000
			});
		},
	})
}

// 打开客服对话
export interface kf {
	extinfo ?: string
	corpid ?: string
	showmessagecard ?: boolean
	sendmessagetitle ?: string
	sendmessagepath ?: string
	sendmessageimg ?: string
}

export const linkwxkf = (options ?: kf) => {
	const extinfo = options?.extinfo ?? ''
	const corpid = options?.corpid ?? ''
	const showmessagecard = options?.showmessagecard ?? false
	const sendmessagetitle = options?.sendmessagetitle ?? ''
	const sendmessagepath = options?.sendmessagepath ?? ''
	const sendmessageimg = options?.sendmessageimg ?? ''
	if (extinfo && corpid) {
		uni.openCustomerServiceChat({
			extInfo: {
				url: extinfo
			},
			corpId: corpid,
			showMessageCard: showmessagecard,
			sendMessageTitle: sendmessagetitle,
			sendMessagePath: sendmessagepath,
			sendMessageImg: sendmessageimg
		})
	}
}

//  *************
// 自定义下载图片方法
const openSetting = () => {
	uni.showModal({
		title: '提示', //提示的标题,
		content: '需要您授权保存相册', //提示的内容,
		showCancel: false,
		success: res => {
			// openSetting 是需要事件驱动的，保证它的同步性。
			uni.openSetting({
				success(res) {
					if (res.authSetting['scope.writePhotosAlbum']) {
						uni.showModal({
							title: '提示',
							content: '获取权限成功,再次点击图片即可保存',
							showCancel: false,
						})
					} else {
						uni.showModal({
							title: '提示',
							content: '获取权限失败，将无法保存到相册',
							showCancel: false,
						})
					}
				},
				fail(res) { },
				complete(res) { }
			})
		}
	})
}

const saveImage = (image : string) => {
	return new Promise((resolve, reject) => {
		uni.downloadFile({
			url: image,
			success: function (res) {
				if (res.statusCode === 200) {
					let file = res.tempFilePath;
					// #ifdef H5
					var oA = document.createElement("a");
					oA.download = ''; // 设置下载的文件名，默认是'下载'
					oA.href = file; //临时路径再保存到本地
					document.body.appendChild(oA);
					oA.click();
					oA.remove(); // 下载之后把创建的元素删除、
					resolve(res)
					// #endif
					// #ifndef H5
					uni.saveImageToPhotosAlbum({
						filePath: file,
						success(res) {
							resolve(res)
						},
						fail(res) {
							reject(res)
						}
					});
					// #endif
				}
			},
			fail: function (err) {
				reject(err)
			}
		})
	})
}

const saveVideo = (video : string) => {
	uni.showLoading({
		title: '保存中...',
		mask: true,
	});
	uni.downloadFile({
		url: video,
		success: function (res) {
			if (res.statusCode === 200) {
				let file = res.tempFilePath;
				uni.saveVideoToPhotosAlbum({
					filePath: file,
					success(res) {
						uni.hideLoading();
						uni.showToast({
							title: '保存成功',
							icon: 'success',
							duration: 2000
						})
					},
					fail(res) {
						uni.hideLoading();
						uni.showToast({
							title: '保存失败',
							duration: 2000
						})
					}
				})
			}
		},
	})
}

const queue = (images : string[]) => {
	let promise = Promise.resolve()
	images.forEach((image, index) => {
		promise = promise.then(() => {
			return saveImage(image)
		})
	})
	return promise
}

export interface download {
	image ?: string
	images ?: string[]
	video ?: string
}

export const dlimg = async(options ?: download) => {
	const image = options?.image ?? ''

	// #ifdef MP
	if (uni.requirePrivacyAuthorize) {
		let [res, err] = await wxToPromise(uni.requirePrivacyAuthorize, {})
		if (res) {
			uni.getSetting({
				success(res) {
					if (!res.authSetting['scope.writePhotosAlbum']) {
						uni.authorize({
							scope: 'scope.writePhotosAlbum',
							success() {
								uni.showLoading({
									title: '加载中',
									mask: true
								})
								saveImage(image).then(res => {
									uni.hideLoading()
									uni.showToast({
										title: '下载完成'
									})
								})
									.catch(err => {
										uni.hideLoading()
									})
							},
							fail() {
								if (uni.openSetting) {
									// 如果没有授权摄像头权限，引导用户开启
									openSetting();
								}
								return;
							}
						})
					} else {
						uni.showLoading({
							title: '加载中',
							mask: true
						})
						saveImage(image).then(res => {
							uni.hideLoading()
							uni.showToast({
								title: '下载完成'
							})
						})
							.catch(err => {
								uni.hideLoading()
							})
					}
				}
			});
		}
		if (err) {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: '请先同意《协议》'
			});
		}
	}
	// #endif
	// #ifndef MP
	uni.showLoading({
		title: '加载中',
		mask: true
	})

	saveImage(image).then(res => {
		uni.hideLoading()
		uni.showToast({
			title: '下载完成'
		})
	})
		.catch(err => {
			uni.hideLoading()
		})
	// #endif
}

export const dlimgs = async(options ?: download) => {
	const images = options?.images ?? []
	if (uni.requirePrivacyAuthorize) {
		let [res, err] = await wxToPromise(uni.requirePrivacyAuthorize, {})
		if (res) {
			uni.getSetting({
				success(res) {
					if (!res.authSetting['scope.writePhotosAlbum']) {
						uni.authorize({
							scope: 'scope.writePhotosAlbum',
							success() {
								uni.showLoading({
									title: '加载中',
									mask: true
								})
								queue(images).then(res => {
									uni.hideLoading()
									uni.showToast({
										title: '下载完成'
									})
								})
									.catch(err => {
										uni.hideLoading()
									})
							},
							fail() {
								if (uni.openSetting) {
									// 如果没有授权摄像头权限，引导用户开启
									openSetting();
								}
								return;
							}
						})
					} else {
						uni.showLoading({
							title: '加载中',
							mask: true
						})
						queue(images).then(res => {
							uni.hideLoading()
							uni.showToast({
								title: '下载完成'
							})
						})
							.catch(err => {
								uni.hideLoading()
							})
					}
				}
			})
		}
		if (err) {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: '请先同意《协议》'
			});
		}
	}

}

export const dlvideo = async(options ?: download) => {
	const video = options?.video ?? ''
	if (uni.requirePrivacyAuthorize) {
		let [res, err] = await wxToPromise(uni.requirePrivacyAuthorize, {})
		if (res) {
			uni.getSetting({
				success(res) {
					if (!res.authSetting['scope.writePhotosAlbum']) {
						uni.authorize({
							scope: 'scope.writePhotosAlbum',
							success() {
								saveVideo(video)
							},
							fail() {
								if (uni.openSetting) {
									// 如果没有授权摄像头权限，引导用户开启
									openSetting()
								}
								return;
							}
						});
					} else {
						saveVideo(video)
					}
				}
			})
		}
		if (err) {
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: '请先同意《协议》'
			});
		}
	}
}