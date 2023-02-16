import {$authHost, $host} from ".";
// eslint-disable-next-line
import jwt_decode from "jwt-decode";

export const createDomain = async (title, price, price_extension, period) => {
    const {data} = await $authHost.post('api/domains', {title, price, price_extension, period});
    return data;
};

export const indexDomain = async () => {
    const {data} = await $authHost.get('api/domains', {});
    return data;
};
/*
export const editHosting = async (hostingId) => {
    const {data} = await $authHost.get('api/hostings/' + hostingId + '/edit', {});
    return data;
};

export const updateHosting = async (title, description, price, is_stored, hostingId) => {
    const {data} = await $authHost.patch('api/hostings/'+ hostingId, {title, description, price, is_stored});
    return data;
};

export const deleteHosting = async (hostingId) => {
    const {data} = await $authHost.delete('api/hostings/' + hostingId, {});
    return data;
};
*/