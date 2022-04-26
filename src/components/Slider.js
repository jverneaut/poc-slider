import {
  Slider as SliderCore,
  SliderBtn,
  SliderCount,
  SliderDots,
  SliderDrag,
  SliderProgress,
} from '@studiometa/ui';

import SliderItem from './SliderItem';

import { animate } from 'motion';

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

  onGoto() {
    console.log(this.currentSliderItem.$el);
    animate(
      this.$el,
      {
        backgroundColor: this.currentSliderItem.$el.dataset.color,
      },
      { duration: 1 }
    );
  }
}
