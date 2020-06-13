/**
 * This is for any api related configuration
 */
/* istanbul ignore file */
import axios from 'axios';
import Config from 'react-native-config';
import { Buffer } from 'buffer';
import { decode as atob, encode as btoa } from 'base-64';

export const apiClient = axios.create({
  baseURL: Config.BASE_URL + '/api',
  timeout: 20000, // Timeout 20s
});

export const setupApiAuth = (payload = {}) => {
  const { accessToken } = payload;
  if (accessToken) {
    // Apply token auth if access token available
    apiClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
  }
};

export const getBasicAuthConfig = () => {
  const encodedToken = Buffer.from(
    `${Config.CLIENT_ID}:${Config.CLIENT_SECRET}`,
  ).toString('base64');

  return {
    baseURL: 'https://api.prod.evently.rocks/oauth',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${encodedToken}`,
    },
  };
};

export const uploadClient = (formdata) =>
  axios.post(
    'https://media-service-garurruona-uc.a.run.app/api/files',
    formdata,
    {
      auth: {
        username: 'root',
        password: 'toor',
      },
    },
  );

export const getMediaConfig = () => {
  const encodedToken = Buffer.from(
    `${Config.MEDIA_ID}:${Config.MEDIA_SECRET}`,
  ).toString('base64');

  return {
    baseURL: Config.MEDIA_URL + '/api',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Basic ${encodedToken}`
    }
  };
};

/**
 * Intercepts all ongoing responses to get the required data or error message directly
 */
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.message);
  },
);
