import {$authHost, $host} from ".";
// eslint-disable-next-line
import jwt_decode from "jwt-decode";


export const registration = async (name, email, password, password_confirmation) => {
    const {data} = await $host.post('api/auth/register', {name, email, password, password_confirmation});
    localStorage.setItem('token', data.access_token);
    return jwt_decode(data.access_token);
};

export const login = async (email, password) => {
    const {data} = await $host.post('api/auth/login', {email, password});
    localStorage.setItem('token', data.access_token);
    return jwt_decode(data.access_token);
};

export const check = async () => {
    const {data} = await $authHost.post('api/auth/refresh', {});
    localStorage.setItem('token', data.access_token);
    return jwt_decode(data.access_token);
};