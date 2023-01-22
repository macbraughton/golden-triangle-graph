/* @refresh reload */
import { render } from 'solid-js/web';
import { ViewportProvider } from './lib/stores/viewport';
import './index.css';
import { vb } from './lib/utils';
import App from './App';
const vbi = vb(innerWidth, innerHeight)

render(() => <ViewportProvider viewBox={vbi}><App /></ViewportProvider>, document.getElementById('root'));
