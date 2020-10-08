import axios from 'axios';
import config from '../config';

export const therapyService = {
    getAll,
    create,
    update,
    createTherapyPlan,
    updateTherapyPlan,
    getTherapiesBetween,
};

function getAll(id, type) {
    return axios
        .get(`${config.apiUrl}/therapy?${type}=${id}`)
        .then(res => res.data);
}

function create(therapy) {
    return axios
        .post(`${config.apiUrl}/therapy`, therapy)
        .then(res => res.data);
}

function update(therapy) {
    return axios
        .put(`${config.apiUrl}/therapy/${therapy._id}`, therapy)
        .then(res => res.data);
}

function createTherapyPlan(therapyPlan) {
    return axios
        .post(`${config.apiUrl}/therapy-plan`, therapyPlan)
        .then(res => res.data);
}

function updateTherapyPlan(therapyPlan) {
    return axios
        .put(
            `${config.apiUrl}/therapy-plan/${therapyPlan._id}`,
            therapyPlan._id
        )
        .then(res => res.data);
}

function getTherapiesBetween(from, to, therapist) {
    return axios
        .get(
            `${config.apiUrl}/therapy?from=${from}&to=${to}&therapist=${therapist}`
        )
        .then(res => res.data);
}
