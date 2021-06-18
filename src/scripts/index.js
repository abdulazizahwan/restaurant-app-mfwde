import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';

import App from './app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#menu-toggle-container'),
  drawer: document.querySelector('.mobile-nav'),
  content: document.querySelector('#mainContent'),
});

window.app = app;
window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
