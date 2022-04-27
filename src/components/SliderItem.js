import { SliderItem as SliderItemCore } from '@studiometa/ui';

/**
 *
 */
export default class SliderItem extends SliderItemCore {
  static config = {
    ...SliderItemCore.config,
    name: 'SliderItem',
    emits: ['clicked'],
    refs: ['img'],
  };

  /**
   * Emit the clicked event on click
   */
  onClick(event) {
    event.preventDefault();
    this.$emit('clicked', this.$el);
  }

  render() {
    super.render();
    const x = this.rect.x + this.dampedX;

    this.$refs.img.style.transform = `translate(calc(-60% + ${0.2 * x}px), -50%)`;
  }
}
