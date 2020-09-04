export const localStorageService = {
    setToken,
    getToken,
    clearToken,
};

function setToken(token) {
    localStorage.setItem('token', token);
}

function getToken() {
    return localStorage.getItem('token');
}

function clearToken() {
    localStorage.removeItem('token');
}
