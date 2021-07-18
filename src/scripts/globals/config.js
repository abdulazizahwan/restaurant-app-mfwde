const CONFIG = {
  BASE_URL: 'https://restaurant-api.dicoding.dev/',
  BASE_IMAGE_URL: {
    small: 'https://restaurant-api.dicoding.dev/images/small/',
    medium: 'https://restaurant-api.dicoding.dev/images/medium/',
    large: 'https://restaurant-api.dicoding.dev/images/large/',
  },
  DEFAULT_LANGUAGE: 'en-us',
  CACHE_NAME: 'RestoranQue-V1',
  generateImageUrlObject(pictureId) {
    return {
      small: `${this.BASE_IMAGE_URL.small}${pictureId}`,
      medium: `${this.BASE_IMAGE_URL.medium}${pictureId}`,
      large: `${this.BASE_IMAGE_URL.large}${pictureId}`,
    };
  },
  DATABASE_NAME: 'restoranque-apps',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'restaurants',
};

export default CONFIG;
