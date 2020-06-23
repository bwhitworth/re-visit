import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getMemoriesByTripId = (tripId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/memories.json?orderBy="tripId"&equalTo="${tripId}"`)
    .then((response) => {
      const memories = response.data;
      const memsArray = [];
      if (memories) {
        Object.keys(memories).forEach((memId) => {
          memories[memId].id = memId;
          memsArray.push(memories[memId]);
        });
      }
      resolve(memsArray);
    })
    .catch((err) => reject(err));
});

const getSingleMemory = (memoryId) => axios.get(`${baseUrl}/memories/${memoryId}.json`);

export default { getMemoriesByTripId, getSingleMemory };
