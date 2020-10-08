import axios from 'axios';
import config from '../config';

export const icdCodeService = {
    getCodes,
    query,
};

function getCodes(codes) {
    return axios
        .get(`${config.apiUrl}/icd10?codes=${codes}`)
        .then(res => res.data);
}

function query(text) {
    return axios.get(`${config.apiUrl}/icd10?q=${text}`).then(res => res.data);
}
