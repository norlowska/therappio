import axios from 'axios';

export const moodRecordService = {
  getAll,
  create,
  update,
  delete: deleteMoodRecord,
};

function getAll() {
  return axios.get(`${global.apiUrl}/moods`).then(res => res.data);
}

function create(moodRecord) {
  return axios.post(`${global.apiUrl}/moods`, moodRecord).then(res => {
    return res.data;
  });
}

function update(moodRecord) {
  return axios.put(`${global.apiUrl}/mood/${moodRecord._id}`, moodRecord).then(res => {
    return res.data;
  });
}

function deleteMoodRecord(id) {
  return axios.delete(`${global.apiUrl}/moods/${id}`).then(res => {
    return res.data;
  });
}
