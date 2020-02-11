import axios from 'axios';
import config from 'config';

export const clientService = {
    getAll,
    getById,
    getMoodRecords,
    getJournalRecords,
    // getAssignments,
    // getTherapySessions,
    create,
    update,
};

function getAll() {
    return axios.get(`${config.apiUrl}/clients`).then(res => res.data);
}

function getById(id) {
    return axios.get(`${config.apiUrl}/clients/${id}`).then(res => {
        console.log('get by id', res.data);
        return res.data;
    });
}

function getMoodRecords(id) {
    return axios
        .get(`${config.apiUrl}/clients/${id}/moods`)
        .then(res => res.data);
}

function getJournalRecords(id) {
    return axios
        .get(`${config.apiUrl}/clients/${id}/journal`)
        .then(res => res.data);
}

function create(client) {
    return axios.post(`${config.apiUrl}/clients`, client).then(res => {
        console.log(res);
    });
}

function update(client) {
    return axios.put(`${config.apiUrl}/clients`, client).then(res => {
        console.log(res);
    });
}
