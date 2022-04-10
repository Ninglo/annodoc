import axios from 'axios';
// import { getAuth } from './auth';

const BASE_URL = '/';
export const request = axios.create({
    baseURL: BASE_URL,
    headers: {
        // auth: getAuth().auth ?? ''
    }
});
