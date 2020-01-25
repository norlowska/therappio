import axios from 'axios';
import config from 'config';

export const clientService = {
    getAll,
    getById,
    create,
    update,
};

function getAll() {
    const options = {
        headers: { 'Content-Type': 'application/json' },
    };

    return axios.get(`${config.apiUrl}/clients`, options).then(res => {
        return res.data;
    });
}

function getById(id) {
    const options = {
        headers: { 'Content-Type': 'application/json' },
    };

    return axios.get(`${config.apiUrl}/clients/${id}`, options).then(res => {
        console.log(res.data);
        return res.data;
    });
}

function create(client) {
    const options = {
        headers: { 'Content-Type': 'application/json' },
    };
    return axios.post(`${config.apiUrl}/clients`, client, options).then(res => {
        console.log(res);
    });
}

function update(client) {
    const options = {
        headers: { 'Content-Type': 'application/json' },
    };

    return axios.put(`${config.apiUrl}/clients`, client, options).then(res => {
        console.log(res);
    });
}
