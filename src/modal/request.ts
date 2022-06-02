import axios from 'axios'
// import { getAuth } from './auth'

const BASE_URL = 'http://1.13.172.175:8080/'
export const request = axios.create({
    baseURL: BASE_URL,
    headers: {
        // auth: getAuth().auth ?? ''
    }
})
