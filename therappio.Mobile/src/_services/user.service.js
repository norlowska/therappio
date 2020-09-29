import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { localStorageService } from './localStorage.service';

export const userService = {
  login,
  logout,
  getDetails,
  saveToken,
  getToken,
};

async function saveToken(name, token) {
  await SecureStore.setItemAsync(name, token);
}

async function getToken() {
  return await SecureStore.getItemAsync('token');
}

function login(email, password) {
  const options = {
    headers: { 'Content-Type': 'application/json' },
  };

  return axios.post(`${global.apiUrl}/users/login`, { email, password }, options).then(res => {
    // store jwt token in local storage to keep user logged in between page refreshes
    saveToken('token', res.data.token);
    return res.data.user;
  });
}

async function logout() {
  await SecureStore.deleteItemAsync('token');
}
function getDetails() {
  const options = {
    headers: { 'Content-Type': 'application/json' },
  };

  return axios.get(`${global.apiUrl}/users/profile`, options).then(res => {
    return res.data;
  });
}
