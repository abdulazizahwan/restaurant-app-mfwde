/* eslint-disable no-shadow */
import UrlParser from '../routes/url-parser';
import RestoDBSource from '../data/therestodb-source';
import FavoriteRestoIdb from '../data/favoriteresto-idb';
import CONFIG from '../globals/config';

const Detail = {
  container: null,
  restoId: null,
  data: null,
  init(container) {
    this.container = container;
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this.restoId = url.id;
  },
  async render() {
    return `
            <section class="hero" tabindex="0">
                <div class="hero-overlay hero-overlay-darker hero-blur">
                    <div class="hero-content">
                        <div class="resto-caption">

                        </div>
                    </div>
                </div>
            </section>
            <div class="container py-4 px-4 tablet:px-none">
                <div id="resto-content">
                </div>
                <div class="tablet:mr-2 mb-1">
                    <h2 class="mb-1 sub-title">Ulasan</h2>
                    <p class="description" tabindex="0">
                        Komentar dari beberapa pelanggan restoran ini
                    </p>
                </div>
                <div class="tablet:mr-2 mb-1 review-restoran-container">
                </div>
            </div>
        `;
  },
  async afterRender() {
    this.data = await RestoDBSource.getRestaurantDetail(this.restoId);

    this.renderHero();
    this.renderDetail();
    this.renderReview();
    this.initListener();
  },

  async renderHero() {
    const {
      id, name, address, city, categories, rating, imagesUrl,
    } = this.data.restaurant;
    const element = this.container.firstElementChild;
    element.style.backgroundImage = `url("${imagesUrl.large}")`;
    const isSaved = (await FavoriteRestoIdb.checkIsSaved(id))[id] || false;
    const content = element.querySelector('.hero-content');
    content.innerHTML = `
                <div class="resto-caption">
                    <div class="image-container">
                        <img class="lazyload" data-src="${imagesUrl.medium}" tabindex="0">
                    </div>
                    <div class="desktop:pl-1 text-container">
                        <div>
                            <h1 tabindex="0">${name}</h1>
                            <span class="pt-1 block" tabindex="0">${city}</span>
                            <span class="pt-1 block" tabindex="0">${address}</span>

                        </div>
                        <div class="ratings py-1">
                            <div class="restaurant-stars">
                                ${'<i class="fa fa-star"></i>'.repeat(parseInt(rating, 10))}${rating / parseInt(rating, 10) > 1 ? '<i class="fa fa-star-half"></i>' : ''}
                            </div>
                            <span tabindex="0" aria-label="Restoran ini memiliki rating sebanyak ${rating}">${rating.toFixed(1)}
                            </span>
                        </div>
                        <div class="">
                        ${categories.map(({ name }) => `
                                <span class="p-1 bg-primary outline-white text-white mr-1 rounded">
                                #${name}
                                </span>
                            `).join('')}
                        </div>
                        <div class="mt-4">
                        <fav-resto-button is-saved="${isSaved}" resto='${JSON.stringify(this.data.restaurant)}' is-transparent="true"></fav-resto-button>
                        </div>
                    </div>
                </div>
        `;
  },

  renderDetail() {
    const { restaurant } = this.data;
    const element = this.container.querySelector('#resto-content');
    element.innerHTML = `
        <div class="detail-content">
            <div class="tablet:mr-4 mb-4">
                <h2 class="mb-1 sub-title"  tabindex="0">Tentang Restoran</h2>
                <p class="description"  tabindex="0">
                    ${restaurant.description}
                </p>
            </div>
            <div class="tablet:mr-2 mb-1">
                <h2 class="mb-1 sub-title" tabindex="0">Makanan</h2>
                <p class="description" tabindex="0">
                    Coba beberapa menu makanan yang ada di restoran ini.
                </p>
            </div>

            <div class="tablet:mr-4 mb-4" tabindex="0">
                <div class="menu-container">
                    ${restaurant.menus.foods.map(({ name }, index) => `
                        <div class="menu-item" tabindex="0" aria-label="Menu makanan nomor ${index + 1}">

                            <span tabindex="0">${name}</span>
                        </div>
                        `).join('')}
                </div>
            </div>

            <div class="tablet:mr-2 mb-1">
                <h2 class="mb-1 sub-title" tabindex="0">Minuman</h2>
                <p class="description" tabindex="0">
                    Coba beberapa menu minuman yang ada di restoran ini untuk melepaskan dahagamu.
                </p>
            </div>

            <div class="tablet:mr-4 mb-4">
                <div class="menu-container">
                    ${restaurant.menus.drinks.map(({ name }, index) => `
                        <div class="menu-item" tabindex="0" aria-label="Menu minuman nomor ${index + 1}">
                            <span>${name}</span>
                        </div>
                        `).join('')}
                </div>
            </div>
        </div>
        `;
  },

  renderReview() {
    const { customerReviews } = this.data.restaurant;

    const element = this.container.querySelector('.review-restoran-container');
    element.innerHTML = `
        <div class="list-review">

                ${customerReviews.length === 0
    ? '<div>Belum Memiliki review</div>'
    : customerReviews.filter((item) => item.review !== '' && item.name !== '').map(({ name, review, date }) => `
        <div class="review-item mb-1">
                <div class="icon">
                <i class="fa fa-user"></i>
                </div>
                        <div class="text-review">
                            <p>
                            ${review}
                            </p>

                            <span>
                            Ditulis oleh <strong class="text-black">${name}</strong> pada ${date}
                            </span>
                        </div>
                        </div>
                        `).join('')

}

        </div>
        <div class="form-review-container">
            <p>
                Berikan ulasan Anda tentang restoran ini
            </p>

            <form class="mt-1" method="POST" id="formReview">
                <div class="input-container">
                    <label for="#name">
                        Nama
                    </label>
                    <input type="text" name="name" id="name" placeholder="Masukan nama anda">
                </div>
                <div class="input-container">
                    <label for="#review">
                        Ulasan
                    </label>
                    <textarea type="text" name="review" id="review" placeholder="Masukan nama anda" rows="7"></textarea>
                </div>
                <div class="input-container flex justify-end">
                    <button type="submit" class="btn btn-primary rounded">Kirim</button>
                </div>
            </form>
        </div>
        `;
  },

  initListener() {
    this.container.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      // eslint-disable-next-line no-alert

      // Fetch POST Review
      const name = document.getElementById('name').value;
      const review = document.getElementById('review').value;

      const dataJSON = {
        id: this.restoId,
        name: `${name}`,
        review: `${review}`,
      };

      fetch(`${CONFIG.BASE_URL}review`, {
        method: 'POST',
        body: JSON.stringify(dataJSON),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'X-Auth-Key': 12345,
        },
      }).then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (json.error === false) {
            // For wait 3 seconds
            setTimeout(() => {
              // eslint-disable-next-line no-restricted-globals
              location.reload(); // Refresh page
            }, 3000);
          }
        })
        .catch((err) => console.log(err));
    });
  },
};

export default Detail;
