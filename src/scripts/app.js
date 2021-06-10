/* eslint-disable no-param-reassign */
/* eslint-disable radix */
// eslint-disable-next-line no-return-await
const getListRestaurant = async () => await (await fetch('./data.json')).json();

const sumarizeText = (text, limit = null) => {
  if (text.length <= 0) return '';

  limit = limit || 100;

  if (text.length <= limit) return text;

  return `${text.substring(0, limit)
    .replace(/\s+$/, '')
  }...`;
};

// eslint-disable-next-line consistent-return
const renderListRestaurant = async (elementId) => {
  if ('cityFilter' in window === false) {
    window.cityFilter = null;
  }
  const data = 'cacheResto' in window ? window.cacheResto : await getListRestaurant();
  const { restaurants } = data;

  if (restaurants === undefined) {
    // eslint-disable-next-line no-alert
    return alert('gagal memuat data');
  }

  const element = document.querySelector(elementId);
  const cities = restaurants.map((item) => item.city)
    .filter((item, index, self) => self.indexOf(item) === index);

  const select = document.querySelector('select#kota');
  select.innerHTML = `<option>Semua Kota</option>${cities.map((item) => `
            <option ${item === window.cityFilter ? 'selected' : ''}>${item}</option>
        `)}`;

  element.innerHTML = restaurants.map((restaurant) => {
    if (window.cityFilter !== null && window.cityFilter !== 'Semua Kota' && restaurant.city !== window.cityFilter) {
      return '';
    }
    return `
            <article class="item-restaurant" tabindex="0">
                <div class="head">
                    <span class="city" aria-label="Kota ${restaurant.city}">${restaurant.city}</span>
                    <img src="${restaurant.pictureId}" alt="Restoran ${restaurant.name}">
                </div>
                <div class="body">
                    <span class="title">${restaurant.name}</span>


                    <div class="ratings">
                        <div class="restaurant-stars">
                            ${'<i class="fa fa-star"></i>'.repeat(parseInt(restaurant.rating))}${restaurant.rating / parseInt(restaurant.rating) > 1 ? '<i class="fa fa-star-half"></i>' : ''}
                        </div>
                        <span aria-label="Restoran ini memiliki rating sebanyak ${restaurant.rating}">${restaurant.rating.toFixed(1)}
                        </span>
                    </div>
                    <p>
                    ${sumarizeText(restaurant.description)}
                    </p>
                </div>
            </article>
        `;
  }).join('\n');
};

module.exports = {
  renderListRestaurant,
};
