import DrawerInitiator from './utils/drawer-initiator';
import UrlParser from './routes/url-parser';
import routes from './routes/routes';
import Utility from './globals/utility';
import FavRestoButton from './components/fav-resto-button';

class App {
  constructor({
    button,
    drawer,
    content,
  }) {
    this.button = button;
    this.drawer = drawer;
    this.content = content;
    App.initCustomElements();
    this.initialAppShell();
  }

  initialAppShell() {
    const {
      button,
      drawer,
      content,
    } = this;
    DrawerInitiator.init({
      button,
      drawer,
      content,
    });

    this.renderPage();
    document.addEventListener('DOMContentLoaded', Utility.hideLoadingOverLay);
    App.initSkipToContent();
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url] || routes['/404'];
    page.init(this.content);
    Utility.showLoadingOverlay();
    this.content.innerHTML = await page.render();
    try {
      await page.afterRender();
      window.scrollTo(0, 0);
      // eslint-disable-next-line no-empty
    } catch (e) {}

    Utility.hideLoadingOverLay();
  }

  static initCustomElements() {
    window.customElements.define('fav-resto-button', FavRestoButton);
  }

  static initSkipToContent() {
    document.querySelector('.skip-link').addEventListener('click', (e) => {
      e.preventDefault();
      const content = document.querySelector('#content');
      if (content === null) return;
      content.scrollIntoView();
      content.focus();
    });
  }
}

export default App;
