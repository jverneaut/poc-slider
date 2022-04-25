import { Base, createApp } from '@studiometa/js-toolkit';
import Slider from './components/Slider';

class App extends Base {
  static config = {
    name: 'App',
    components: {
      Slider,
    },
  };
}

export default createApp(App, document.body);
