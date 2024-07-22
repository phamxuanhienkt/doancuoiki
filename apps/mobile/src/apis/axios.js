import axios from 'axios';
import { API_URL } from "../../env";
import { getAccessToken } from './auth/auth';

let request = axios.create({
    baseURL: API_URL,
});

request.interceptors.request.use(
    async config => {
        if (!config.headers.Authorization){
            const token = await getAccessToken();
            config.headers.Authorization = token || '';
        }
        return config;
    },
    error => Promise.reject(error),
);

const handleError = async (error) => {
    const data = error?.response?.data;
    console.error('Response error:', error, 'Data:', data);
    return Promise.reject(error);
};

request.interceptors.response.use(response => response, handleError);

export default request;
