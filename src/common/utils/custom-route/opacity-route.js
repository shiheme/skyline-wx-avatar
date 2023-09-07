import {
	CurveAnimation,
	Curves
} from './common';

const OpacityTransitionRouteBuilder = ({
	primaryAnimation,
	secondaryAnimation,
	secondaryAnimationStatus,
	userGestureInProgress
}) => {
	const {
		windowWidth
	} = uni.getSystemInfoSync();
	const {
		screenHeight
	} = uni.getSystemInfoSync();
	const handlePrimaryAnimation = () => {
		'worklet';
		return {
			opacity: Curves.fastOutSlowIn(primaryAnimation.value),
		};
	};

	const _curveSecondaryAnimation = CurveAnimation({
		animation: secondaryAnimation,
		animationStatus: secondaryAnimationStatus,
		curve: Curves.fastOutSlowIn,
	});

	const handleSecondaryAnimation = () => {
		'worklet';
		let t = secondaryAnimation.value;
		if (!userGestureInProgress.value) {
			t = _curveSecondaryAnimation.value;
		}
		const top = 0.1;
		const scaleRatio = 0.08;

		const translateY = screenHeight * (top - 0.5 * scaleRatio) * t;
		const scale = 1 - scaleRatio * t;
		const radius = 12 * t;
		const opacity = 1 * (1 - t / 2);
		return {
			borderRadius: `${radius}px`,
			opacity: opacity,
			transform: `translateY(${translateY}px) scale(${scale})`,
		};
	};

	return {
		opaque: true,
		handlePrimaryAnimation,
		handleSecondaryAnimation,
		transitionDuration: 300,
		reverseTransitionDuration: 300,
		canTransitionTo: true,
		canTransitionFrom: false,
		barrierColor: 'rgba(0,0,0,0)',
		barrierDismissible: false
	};
};

export default OpacityTransitionRouteBuilder;