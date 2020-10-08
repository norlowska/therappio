import axios from 'axios';
import config from '../config';

export const diagnosisService = {
    getById,
    create,
    update,
};

function getById(id) {
    return axios.get(`${config.apiUrl}/diagnosis/${id}`).then(res => res.data);
}

function create(patientId) {
    return axios
        .post(`${config.apiUrl}/diagnosis`, { patient: patientId })
        .then(res => res.data);
}

function update(diagnosis) {
    return axios
        .put(`${config.apiUrl}/diagnosis/${diagnosis.id}`, diagnosis)
        .then(res => {
            return res.data;
        });
}
