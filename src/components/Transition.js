import { Base } from '@studiometa/js-toolkit';
import { addClass, removeClass, lerp } from '@studiometa/js-toolkit/utils';
import { animate } from 'motion';
import { inOutCubic } from '../utilities/easings.js';

import Slider from './Slider';

export default class Transition extends Base {
  static config = {
    name: 'Transition',
    components: { Slider },
    refs: [
      'placeholder',
      'clipPath',
      'clipPathRect',
      'placeholderClipPath',
      'placeholderClipPathRect',
    ],
  };

  static easing = inOutCubic;

  static duration = 1.2;

  /**
   * @type {HTMLElement}
   */
  content = null;

  /**
   * @type {HTMLElement}
   */
  sliderItem = null;

  /**
   * @type {HTMLImageElement}
   */
  image = null;

  mounted() {
    this.content = document.createElement('div');
    addClass(this.content, 'opacity-0 fixed top-0 left-0 w-screen pointer-events-none');

    // window.addEventListener('popstate', () => {
    //   location.reload();
    // });

    document.body.appendChild(this.content);
  }

  /**
   * Handles the `image-clicked` event from the child component
   * @param {HTMLElement} sliderItem
   */
  onSliderItemClicked(sliderItem) {
    addClass(document.body, 'cursor-wait');
    addClass(this.$el, 'pointer-events-none');

    this.sliderItem = sliderItem;
    addClass(this.sliderItem, 'z-above');

    this.image = this.sliderItem.querySelector('img');
    this.$refs.placeholder.src = this.image.src;
  }

  async onPlaceholderLoad() {
    const url = this.sliderItem.getAttribute('href');
    const html = await (await fetch(url)).text();

    const parser = new DOMParser();
    const newDocument = parser.parseFromString(html, 'text/html');

    this.content.innerHTML = newDocument.body.innerHTML;
    window.history.pushState('details', newDocument.title, url);
    document.title = newDocument.title;

    // Artificial delay
    setTimeout(this.animate.bind(this), 300);
  }

  animate() {
    const targetImage = this.content.querySelector('#cover');
    const fromTransformMatrix = this.getTransformMatrix(this.$refs.placeholder, this.image);
    const toTransformMatrix = this.getTransformMatrix(this.$refs.placeholder, targetImage);

    removeClass(this.$refs.placeholder, 'opacity-0');
    addClass(this.image, 'opacity-0');

    animate(
      this.$refs.placeholder,
      {
        scaleX: [fromTransformMatrix.scale, toTransformMatrix.scale],
        scaleY: [fromTransformMatrix.scale, toTransformMatrix.scale],
        x: [fromTransformMatrix.x, toTransformMatrix.x],
        y: [fromTransformMatrix.y, toTransformMatrix.y],
      },
      { duration: Transition.duration, easing: Transition.easing }
    );

    const scale =
      targetImage.clientHeight /
      targetImage.clientWidth /
      (this.image.clientHeight / this.image.clientWidth);

    animate(
      (progress) => {
        this.$refs.placeholderClipPathRect.setAttribute('x', lerp(0.05, 0, progress));
        this.$refs.placeholderClipPathRect.setAttribute(
          'y',
          lerp(0.05, 0.5 * (1 - scale), progress)
        );
        this.$refs.placeholderClipPathRect.setAttribute('width', lerp(0.9, 1, progress));
        this.$refs.placeholderClipPathRect.setAttribute('height', lerp(0.9, scale, progress));
      },
      { duration: Transition.duration, easing: Transition.easing }
    ).finished.then(() => {
      this.complete();
    });
  }

  complete() {
    removeClass(document.body, 'cursor-wait');

    animate(
      this.content,
      {
        opacity: 1,
      },
      { duration: 0.8 }
    ).finished.then(() => {
      document.body.querySelector('main').outerHTML =
        this.content.querySelector('main').outerHTML;
      window.scrollTo(0, 0);

      this.content.innerHTML = '';
      this.$root.$update();
    });
  }

  getTransformMatrix(base, target) {
    const originalDimensions = base.getBoundingClientRect();
    const targetDimensions = target.getBoundingClientRect();

    const scale = Math.max(
      targetDimensions.width / originalDimensions.width,
      targetDimensions.height / originalDimensions.height
    );

    return {
      scale,
      x:
        targetDimensions.x +
        0.5 * targetDimensions.width -
        (originalDimensions.x + 0.5 * originalDimensions.width),
      y:
        targetDimensions.y +
        0.5 * targetDimensions.height -
        (originalDimensions.y + 0.5 * originalDimensions.height),
    };
  }
}
