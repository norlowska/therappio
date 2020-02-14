import axios from 'axios';
import config from 'config';

export const clientService = {
    getAll,
    getById,
    getDetails,
    getMoodRecords,
    getJournalRecords,
    getAssignments,
    getTherapySessions,
    create,
    update,
    createAssignment,
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

function getDetails(id) {
    function useNull() {
        return null;
    }

    const getTherapySessions = axios
        .get(`${config.apiUrl}/clients/${id}/sessions`)
        .catch(useNull);
    const getAssignments = axios
        .get(`${config.apiUrl}/clients/${id}/assignments`)
        .catch(useNull);
    const getMoodRecords = axios
        .get(`${config.apiUrl}/clients/${id}/moods`)
        .catch(useNull);
    const getJournalRecords = axios
        .get(`${config.apiUrl}/clients/${id}/journal`)
        .catch(useNull);

    return axios
        .all([
            getTherapySessions,
            getAssignments,
            getMoodRecords,
            getJournalRecords,
        ])
        .then(
            axios.spread((res1, res2, res3, res4) => {
                let data = {};
                if (res1) {
                    data['sessions'] = res1.data;
                }
                if (res2) {
                    data['assignments'] = res2.data;
                }
                if (res3) {
                    data['moods'] = res3.data;
                }
                if (res4) {
                    data['journal'] = res4.data;
                }

                return data;
            })
        );
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

function getAssignments(id) {
    return axios
        .get(`${config.apiUrl}/clients/${id}/assignments`)
        .then(res => res.data);
}

function getTherapySessions(id) {
    return axios
        .get(`${config.apiUrl}/clients/${id}/sessions`)
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

function createAssignment(assignment) {
    console.log(assignment);
    return axios.post(`${config.apiUrl}/assignments`, assignment).then(res => {
        console.log(res);
        return res.data;
    });
}
