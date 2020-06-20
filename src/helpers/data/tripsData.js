import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getTripsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/trips.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const fbTrips = response.data;
      const tripsArray = [];
      if (fbTrips) {
        Object.keys(fbTrips).forEach((fbId) => {
          fbTrips[fbId].id = fbId;
          tripsArray.push(fbTrips[fbId]);
        });
      }
      resolve(tripsArray);
    })
    .catch((err) => reject(err));
});

export default { getTripsByUid };
