/* @refresh reload */
import { render } from 'solid-js/web';
import { ControlPanelProvider } from './lib/stores/controls'
import './index.css';
import App from './App';
import config from './lib/config'

render(() => <ControlPanelProvider config={config} >
  <App />
</ControlPanelProvider>, document.getElementById('root'));
