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

const postNewMemory = (newMemory) => axios.post(`${baseUrl}/memories.json`, newMemory);

const deleteSingleMemory = (memoryId) => axios.delete(`${baseUrl}/memories/${memoryId}.json`);

const deleteMemoriesByTripId = (tripId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/memories.json?orderBy="tripId"&equalTo="${tripId}"`)
    .then((response) => {
      const memories = response.data;
      if (memories) {
        Object.keys(memories).forEach((mem) => {
          axios.delete(`${baseUrl}/memories/${mem}.json`);
        });
      }
      resolve();
    })
    .catch((err) => reject(err));
});

const updateMemory = (memoryId, updatedMemObj) => axios.put(`${baseUrl}/memories/${memoryId}.json`, updatedMemObj);


export default {
  getMemoriesByTripId,
  getSingleMemory,
  postNewMemory,
  deleteMemoriesByTripId,
  deleteSingleMemory,
  updateMemory,
};
