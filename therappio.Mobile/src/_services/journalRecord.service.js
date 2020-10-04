import axios from 'axios';
import config from '../../config';

export const journalRecordService = {
  getAll,
  create,
  update,
  delete: deleteJournalRecord,
};

function getAll() {
  return axios.get(`${config.apiUrl}/journal`).then(res => res.data);
}

function create(journalRecord) {
  console.log('create');
  return axios.post(`${config.apiUrl}/journal`, journalRecord).then(res => {
    return res.data;
  });
}

function update(journalRecord) {
  return axios.put(`${config.apiUrl}/journal/${journalRecord.id}`, journalRecord).then(res => {
    return res.data;
  });
}

function deleteJournalRecord(id) {
  return axios.delete(`${config.apiUrl}/journal/${id}`).then(res => {
    return res.data;
  });
}
