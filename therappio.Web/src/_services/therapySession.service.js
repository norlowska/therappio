import axios from 'axios';
import config from '../config';

export const therapySessionService = {
    getAll,
    create,
    update,
    delete: deleteTherapySession,
};

function getAll() {
    return axios.get(`${config.apiUrl}/sessions`).then(res => res.data);
}

function create(therapySession) {
    return axios.post(`${config.apiUrl}/sessions`, therapySession).then(res => {
        return res.data;
    });
}

function update(therapySession) {
    return axios
        .put(`${config.apiUrl}/sessions/${therapySession._id}`, therapySession)
        .then(res => {
            return res.data;
        });
}

function deleteTherapySession(id) {
    return axios.delete(`${config.apiUrl}/sessions/${id}`).then(res => {
        return res.data;
    });
}
