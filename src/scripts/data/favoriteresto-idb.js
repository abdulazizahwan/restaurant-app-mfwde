import {
  openDB,
} from 'idb';
import CONFIG from '../globals/config';

const {
  DATABASE_NAME,
  DATABASE_VERSION,
  OBJECT_STORE_NAME,
} = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, {
      keyPath: 'id',
    });
  },
});

const add = async (restaurant) => {
  const {
    id,
    name,
    description,
    pictureId,
    city,
    rating,
  } = restaurant;

  const restoDB = (await dbPromise);
  return restoDB.add(OBJECT_STORE_NAME, {
    id,
    name,
    description,
    pictureId,
    city,
    rating,
  });
};

const remove = async (id) => {
  const restoDB = (await dbPromise);
  return restoDB.delete(OBJECT_STORE_NAME, id);
};

const getAll = async () => {
  const restoDB = (await dbPromise);
  return restoDB.getAll(OBJECT_STORE_NAME);
};

const checkIsSaved = async (id) => {
  const ids = Array.isArray(id) ? id : [id];
  const isSaved = {};
  ids.forEach((currentId) => {
    isSaved[currentId] = false;
  });
  const restoDB = (await dbPromise);

  // eslint-disable-next-line max-len
  const results = await Promise.all(ids.map((currentId) => restoDB.get(OBJECT_STORE_NAME, currentId)));

  results.forEach((item) => {
    if (item !== undefined) {
      isSaved[item.id] = true;
    }
  });
  return isSaved;
};

export default {
  add,
  remove,
  getAll,
  checkIsSaved,
};
