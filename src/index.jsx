/* @refresh reload */
import { render } from 'solid-js/web';
import { ViewportProvider } from './lib/stores/viewport';
import { ControlPanelProvider } from './lib/stores/controls'
import './index.css';
import { vb } from './lib/utils';
import App from './App';
const vbi = vb(innerWidth, innerHeight)
import config from './lib/config'

render(() => <ViewportProvider viewBox={vbi}>
  <ControlPanelProvider config={config} >
    <App />
  </ControlPanelProvider>
</ViewportProvider>, document.getElementById('root'));
