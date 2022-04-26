import {
  Slider as SliderCore,
  SliderBtn,
  SliderCount,
  SliderDots,
  SliderDrag,
  SliderProgress,
} from '@studiometa/ui';

import SliderItem from './SliderItem';
export default class Slider extends SliderCore {
  static config = {
    name: 'Slider',
    components: {
      SliderBtn,
      SliderCount,
      SliderDots,
      SliderDrag,
      SliderItem,
      SliderProgress,
    },
    emits: ['item-clicked'],
  };

  /**
   * `item-clicked` event pass through
   * @param {HTMLElement} sliderItem
   */
  onSliderItemClicked(sliderItem) {
    this.$emit('item-clicked', sliderItem);
  }
}
