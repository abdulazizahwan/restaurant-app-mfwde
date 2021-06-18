/* eslint-disable max-len */
import CONFIG from '../globals/config';
import FavoriteRestoIdb from '../data/favoriteresto-idb';
import RestoDBSource from '../data/therestodb-source';

const Home = {
  container: null,
  clickListener: null,
  restaurants: null,
  init(container) {
    this.container = container;
  },
  async render() {
    const {
      restaurants,
    } = await RestoDBSource.getListRestaurant();
    this.restaurants = restaurants;
    return `
            <section class="hero home-jumbotron with-default-bg" tabindex="0">
                <div class="hero-overlay">
                    <div class="hero-content">
                        <div class="caption">
                            <span>Hari ini makan di Restoran mana ya?</span>
                            <p>RestoranQue. merupakan website yang menyediakan katalog restoran terbaik untuk Anda kunjungi!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div class="container" id="content" tabindex="0">
                <h1 class="p-1 pl-2 pt-2" tabindex="0">Explore Restaurant</h1>


                <div class="p-1">
                    <div class="list-restaurant" id="list-restaurant"></div>
                    <div id="list-restaurant-zero"></div>
                </div>
            </div>
        `;
  },

  async afterRender() {
    this.renderListRestaurant();
  },

  async renderListRestaurant() {
    const cityFilterKeyword = window.cityFilter || null;

    const elm = this.container.querySelector('#list-restaurant');

    const {
      restaurants,
    } = this;

    if (restaurants.length === 0) {
      this.container.querySelector('#list-restaurant-zero').innerHTML = this.notAvailableMessage();
      return;
    }

    const summarizeText = (text, limit = null) => {
      if (text.length <= 0) return '';

      // eslint-disable-next-line no-param-reassign
      limit = limit || 100;

      if (text.length <= limit) return text;

      return `${text.substring(0, limit)
        .replace(/\s+$/, '')
      }...`;
    };

    const saved = await FavoriteRestoIdb.checkIsSaved(restaurants.map((item) => item.id));
    elm.innerHTML = restaurants.map((restaurant) => {
      if (cityFilterKeyword !== null && cityFilterKeyword !== 'Semua Kota' && restaurant.city !== cityFilterKeyword) {
        return '';
      }
      return `
            <article class="item-restaurant">
                <div class="head">
                    <span class="city" aria-label="Kota ${restaurant.city}" tabindex="0">${restaurant.city}</span>
                    <img  tabindex="0" src="${CONFIG.BASE_IMAGE_URL.medium}${restaurant.pictureId}" alt="restoran ${restaurant.name}">
                </div>
                <div class="body">
                    <span class="title"  tabindex="0">${restaurant.name}</span>

                    <div class="ratings">
                        <div class="restaurant-stars">
                            ${'<i class="fa fa-star"></i>'.repeat(parseInt(restaurant.rating, 10))}${restaurant.rating / parseInt(restaurant.rating, 10) > 1 ? '<i class="fa fa-star-half"></i>' : ''}
                        </div>
                        <span  tabindex="0" aria-label="Restoran ini memiliki rating sebanyak ${restaurant.rating}">${restaurant.rating.toFixed(1)}
                        </span>
                    </div>
                    <p  tabindex="0">
                    ${summarizeText(restaurant.description)}
                    </p>

                </div>
                <div class="footer">
                    <div>
                        <fav-resto-button resto='${JSON.stringify(restaurant)}' is-saved="${saved[restaurant.id]}" resto-id="${restaurant.id}" ></fav-resto-button>
                    </div>
                    <div>
                    <a href="${`/#/detail/${restaurant.id}`}" class="cta">
                        <span class="clickable">Detail <i class="fa fa-arrow-circle-right"></i></span>
                    </a>
                    </div>
                </div>
            </article>
        `;
    }).join('\n');
  },

  notAvailableMessage() {
    return `
            <p>Data belum tersedia, Anda belum menyukai restoran manapun</p>
        `;
  },
};

export default Home;
