/* eslint-disable @typescript-eslint/naming-convention */

import { CurveAnimation, Curves } from './common';

const ScaleTransitionRouteBuilder = ({
  primaryAnimation,
  secondaryAnimation,
  primaryAnimationStatus,
  secondaryAnimationStatus,
  userGestureInProgress,
}) => {
  const { windowWidth } = uni.getSystemInfoSync();
  const { screenHeight } = uni.getSystemInfoSync();
  console.info('ScaleTransitionRouteBuilder ', windowWidth);

  const _curvePrimaryAnimation = CurveAnimation({
    animation: primaryAnimation,
    animationStatus: primaryAnimationStatus,
    curve: Curves.linearToEaseOut,
    reverseCurve: Curves.easeInToLinear,
  });
  
  const handlePrimaryAnimation = () => {
    'worklet';
    /**
     * 1. 手势拖动时采用原始值
     * 2. 页面进入时采用 curve 曲线生成的值
     * 3. 页面返回时采用 reverseCurve 生成的值
     */
    let t = primaryAnimation.value;
    if (!userGestureInProgress.value) {
      t = _curvePrimaryAnimation.value;
    }
  	
  	const translateX = windowWidth * (1 - t) 
    // 页面从右至左推入
    return {
			opacity: 1,
      transform: `translateX(${translateX}px)`
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
		const opacity = 1 * (1-t/2);
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
    canTransitionFrom: true,
		barrierColor: "rgba(0, 0, 0, 1)",
  };
};

export default ScaleTransitionRouteBuilder;
