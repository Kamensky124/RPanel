import * as axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://api.polyansky.pro/public/api/',    
    withCredentials: true,
    headers: {}
});

let getAuthHeader = (access_token) => {
    let authHeaderPrefix = 'Bearer ';
    
    return authHeaderPrefix + access_token;
}

export const setAuthHeader = (access_token) => {
    instance.defaults.headers.Authorization = getAuthHeader(access_token);
    localStorage.setItem('access_token', access_token);
}

if(localStorage.getItem('access_token')) {
    setAuthHeader(localStorage.getItem('access_token'));
}