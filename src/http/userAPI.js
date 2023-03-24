import {$authHost, $host} from ".";
// eslint-disable-next-line
import jwt_decode from "jwt-decode";


export const registration = async (name, email, password, password_confirmation) => {
    const {data} = await $host.post('api/auth/register', {name, email, password, password_confirmation});
    localStorage.setItem('token', data.access_token);
    return data;
};

export const login = async (email, password) => {
    const {data} = await $host.post('api/auth/login', {email, password});
    localStorage.setItem('token', data.access_token);
    return data;
};

export const check = async () => {
    const {data} = await $authHost.post('api/auth/refresh', {});
    localStorage.setItem('token', data.access_token);
    return data;
};

export const logout = async () => {
    const {data} = await $authHost.post('api/auth/logout', {});
    localStorage.removeItem('token');
    return data;
};

export const usersList = async () => {
    const {data} = await $authHost.post('api/users', {});
    return data;
};

export const updateCustomerProfile = async (profile) => {
    const {data} = await $authHost.post('api/customer_update/', profile);
    return data;
};

export const updatePasswordProfile = async (old_password, new_password, confirm_password) => {
    const {data} = await $authHost.patch('api/password_update/', {old_password, new_password, confirm_password});
    return data;
};