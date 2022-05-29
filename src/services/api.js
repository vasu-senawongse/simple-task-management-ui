import Cookies from 'js-cookie';
import axios from 'axios';
import authConfig from '../configs/auth';

const accessToken = Cookies.get(authConfig.ACCESS_TOKEN_COOKIE);
const baseURL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:5000';

const client = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    token: accessToken,
  },
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 404) {
      let url = `${window.location.origin}/error/not-found`;
      window.location.replace(url);
    } else if (error.response.status === 403) {
      let url = `${window.location.origin}/error/un-authorized`;
      window.location.replace(url);
    }
    return Promise.reject(error);
  }
);

export default {
  async get(endpoint, params = {}) {
    return await client.get(`${endpoint}`, params);
  },

  async post(endpoint, payloads = {}) {
    return await client.post(`${endpoint}`, payloads);
  },

  async put(endpoint, payloads = {}) {
    return await client.put(`${endpoint}`, payloads);
  },

  async patch(endpoint, payloads = {}) {
    return await client.patch(`${endpoint}`, payloads);
  },

  async delete(endpoint, payloads = {}) {
    return await client.delete(`${endpoint}`, {
      params: payloads,
      data: payloads,
    });
  },
};
