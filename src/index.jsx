/* @refresh reload */
import { render } from 'solid-js/web';
import { ViewportProvider } from './lib/stores/viewport';
import { ControlPanelProvider } from './lib/stores/controls'
import { BitmapProvider } from './lib/stores/bitmap';
import './index.css';
import { vb } from './lib/utils';
import App from './App';
const vbi = vb(innerWidth, innerHeight)
import config from './lib/config'
import { H } from './lib/bitmaps';

render(() => <ViewportProvider viewBox={vbi}>
  <ControlPanelProvider config={config} >
    <BitmapProvider config={H()}>
      <App />
    </BitmapProvider>
  </ControlPanelProvider>
</ViewportProvider>, document.getElementById('root'));
