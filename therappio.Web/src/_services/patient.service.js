import axios from 'axios';
import config from 'config';

export const patientService = {
    getAll,
    create,
    update,
};

function getAll() {
    return axios.get(`${config.apiUrl}/patients`).then(res => res.data);
}

function create(patient) {
    return axios.post(`${config.apiUrl}/patients`, patient).then(res => res);
}

function update(patient) {
    return axios
        .put(`${config.apiUrl}/patients/${patient._id}`, patient)
        .then(res => res);
}
