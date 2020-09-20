import axios from 'axios';
import config from 'config';

export const clientService = {
    getAll,
    create,
    update,
};

function getAll() {
    return axios.get(`${config.apiUrl}/clients`).then(res => res.data);
}

function create(client) {
    return axios.post(`${config.apiUrl}/clients`, client).then(res => res);
}

function update(client) {
    return axios
        .put(`${config.apiUrl}/clients/${client._id}`, client)
        .then(res => res);
}
