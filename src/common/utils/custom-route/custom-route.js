import CupertinoRouteBuilder from './cupertino-route';
import OpacityTransitionRouteBuilder from './opacity-route';
import ScaleTransitionRouteBuilder from './scale-route';
import HalfScreenDialogRouteBuilder from './hafl-screen-route';
import PopupTransitionRouteBuilder from './popup-route';
import PopupSTransitionRouteBuilder from './popup-s-route';

/**
 * 示例用法
 * wx.navigateTo({url, routeType: Cupertino})
 */

let hasInstalled = false;
export function installRouteBuilder() {
	if (hasInstalled) {
		return;
	}

	if (!wx.worklet) {
		// console.warn('worklet not support on current version');
		return;
	}

	// console.info('installRouteBuilder');
	wx.router.addRouteBuilder('Cupertino', CupertinoRouteBuilder);
	wx.router.addRouteBuilder('ScaleTransition', ScaleTransitionRouteBuilder);
	wx.router.addRouteBuilder('OpacityTransition', OpacityTransitionRouteBuilder);
	wx.router.addRouteBuilder('HalfScreenDialog', HalfScreenDialogRouteBuilder);
	wx.router.addRouteBuilder('PopupTransition', PopupTransitionRouteBuilder);
	wx.router.addRouteBuilder('PopupSTransition', PopupSTransitionRouteBuilder);



	hasInstalled = true;
}

const CustomRouteType = {
	Cupertino: 'Cupertino',
	ScaleTransition: 'ScaleTransition',
	HalfScreenDialog: 'HalfScreenDialog',
	OpacityTransition: 'OpacityTransition',
	PopupTransition: 'PopupTransition',
	PopupSTransition: 'PopupSTransition',
};

export default CustomRouteType;