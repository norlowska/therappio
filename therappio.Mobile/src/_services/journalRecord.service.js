import axios from 'axios';

export const journalRecordService = {
  getAll,
  create,
  update,
  delete: deleteJournalRecord,
};

function getAll() {
  return axios.get(`${global.apiUrl}/journal`).then(res => res.data);
}

function create(journalRecord) {
  return axios.post(`${global.apiUrl}/journal`, journalRecord).then(res => {
    return res.data;
  });
}

function update(journalRecord) {
  return axios.put(`${global.apiUrl}/journal/${journalRecord._id}`, journalRecord).then(res => {
    return res.data;
  });
}

function deleteJournalRecord(id) {
  return axios.delete(`${global.apiUrl}/journal/${id}`).then(res => {
    return res.data;
  });
}
