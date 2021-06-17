import CONFIG from '../globals/config';
import RESTO_API_ENDPOINT from '../globals/api-endpoint';

const fetchProxy = async (fetchPromise) => {
  let response = null;
  try {
    response = await fetchPromise();
    if (!response.ok) {
      window.location.hash = '#/404';
      return null;
    }
  } catch (e) {
    window.location.hash = '#/offline';
    return null;
  }

  return response.json();
};

const getListRestaurant = async () => {
  const data = await fetchProxy(() => RESTO_API_ENDPOINT.getListRestaurant());
  return data;
};

const getRestaurantDetail = async (id) => {
  const data = await fetchProxy(() => RESTO_API_ENDPOINT.getRestaurantDetail(id));
  if (data !== null) {
    data.restaurant.imagesUrl = CONFIG.generateImageUrlObject(data.restaurant.pictureId);
  }
  return data;
};

export default {
  getListRestaurant,
  getRestaurantDetail,
};
