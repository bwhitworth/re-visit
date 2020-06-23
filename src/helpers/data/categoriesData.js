import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getCategories = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/categories.json`)
    .then((response) => {
      const categories = response.data;
      const catsArray = [];
      if (categories) {
        Object.keys(categories).forEach((catId) => {
          categories[catId].id = catId;
          catsArray.push(categories[catId]);
        });
      }
      resolve(catsArray);
    })
    .catch((err) => console.error('could not get categories', err));
});

export default { getCategories };
