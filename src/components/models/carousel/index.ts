import { withInstall, withNoopInstall } from '../../utils'
import Carousel from './src/carousel.vue'
// import CarouselItem from './src/carousel-item.vue'
export const TnCarousel = withNoopInstall(Carousel,)
// export const TnCarousel = withInstall(Carousel, {
//   CarouselItem,
// })
// export const TnCarouselItem = withNoopInstall(CarouselItem)
export default TnCarousel

export * from './src/carousel'
// export * from './src/carousel-item'
// export * from './src/types'
// export type { TnCarouselInstance, TnCarouselItemInstance } from './src/instance'
