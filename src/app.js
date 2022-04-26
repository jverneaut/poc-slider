import { Base, createApp } from '@studiometa/js-toolkit';
import Transition from './components/Transition';

class App extends Base {
  static config = {
    name: 'App',
    components: {
      Transition,
    },
  };
}

export default createApp(App, document.body);
