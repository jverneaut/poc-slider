import { SliderItem as SliderItemCore } from '@studiometa/ui';

/**
 *
 */
export default class SliderItem extends SliderItemCore {
  static config = {
    ...SliderItemCore.config,
    name: 'SliderItem',
    emits: ['clicked'],
  };

  /**
   * Emit the clicked event on click
   */
  onClick(event) {
    event.preventDefault();
    this.$emit('clicked', this.$el);
  }
}
