import axios from 'axios';
import config from '../../config';

export const moodRecordService = {
  getAll,
  create,
  update,
  delete: deleteMoodRecord,
};

function getAll() {
  console.log('fetch mood records action');
  return axios.get(`${config.apiUrl}/moods`).then(res => res.data);
}

function create(moodRecord) {
  return axios.post(`${config.apiUrl}/moods`, moodRecord).then(res => {
    return res.data;
  });
}

function update(moodRecord) {
  return axios.put(`${config.apiUrl}/mood/${moodRecord._id}`, moodRecord).then(res => {
    return res.data;
  });
}

function deleteMoodRecord(id) {
  return axios.delete(`${config.apiUrl}/moods/${id}`).then(res => {
    return res.data;
  });
}
