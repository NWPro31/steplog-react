import {$authHost, $host} from ".";
// eslint-disable-next-line
import jwt_decode from "jwt-decode";

export const createHosting = async (title, description, price) => {
    const {data} = await $authHost.post('api/hostings', {title, description, price});
    return data;
};

export const indexHosting = async () => {
    const {data} = await $authHost.get('api/hostings', {});
    return data;
};

export const editHosting = async (hostingId) => {
    const {data} = await $authHost.get('api/hostings/' + hostingId + '/edit', {});
    return data;
};

export const updateHosting = async (title, description, price, is_stored, hostingId) => {
    const {data} = await $authHost.patch('api/hostings/'+ hostingId, {title, description, price, is_stored});
    return data;
};