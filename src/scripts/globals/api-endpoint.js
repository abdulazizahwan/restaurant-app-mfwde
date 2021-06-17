import CONFIG from './config';

const API_ENDPOINT = {
  listRestaurant: `${CONFIG.BASE_URL}list`,
  detailRestaurant: `${CONFIG.BASE_URL}detail/`,
};

const getListRestaurant = () => fetch(API_ENDPOINT.listRestaurant);
const getRestaurantDetail = (id) => fetch(`${API_ENDPOINT.detailRestaurant}${id}`);

export default {
  getListRestaurant,
  getRestaurantDetail,
};
