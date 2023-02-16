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

export const editDomain = async (domainId) => {
    const {data} = await $authHost.get('api/domains/' + domainId + '/edit', {});
    return data;
};

export const updateDomain = async (title, price, price_extension, period, is_stored, domainId) => {
    const {data} = await $authHost.patch('api/domains/'+ domainId, {title, price, price_extension, period, is_stored});
    return data;
};

export const deleteDomain = async (domainId) => {
    const {data} = await $authHost.delete('api/domains/' + domainId, {});
    return data;
};