import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import config from '../../config';

export const userService = {
  login,
  logout,
  getDetails,
  saveAuthToken,
  getAuthToken,
  updateDetails,
};

async function saveAuthToken(name, token) {
  try {
    await SecureStore.setItemAsync(name, token);
  } catch (error) {
    console.log('Error while saving token ', error);
  }
}

async function getAuthToken() {
  try {
    return await SecureStore.getItemAsync('token');
  } catch (error) {
    console.log('Error while retrieving token ', error);
  }
}

async function login(email, password) {
  const options = {
    headers: { 'Content-Type': 'application/json' },
  };
  return axios
    .post(`${config.apiUrl}/users/login`, { email, password }, options)
    .then(async res => {
      await saveAuthToken('token', res.data.token);
      return res.data.user;
    });
}

async function logout() {
  return SecureStore.deleteItemAsync('token');
}
function getDetails() {
  return axios.get(`${config.apiUrl}/users/profile`).then(res => {
    return res.data;
  });
}

function updateDetails(user) {
  return axios.put(`${config.apiUrl}/users/${user._id}`, user).then(res => {
    return res.data;
  });
}
