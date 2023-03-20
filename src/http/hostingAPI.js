import {$authHost, $host} from ".";
// eslint-disable-next-line
import jwt_decode from "jwt-decode";

export const createHosting = async (title, description, price) => {
    const {data} = await $authHost.post('api/hostings', {title, description, price});
    return data;
};

export const createOrderHosting = async (name, url, hosting_id) => {
    const {data} = await $authHost.post('api/order_hosting', {name, url, hosting_id});
    return data;
};

export const indexHosting = async () => {
    const {data} = await $authHost.get('api/hostings', {});
    return data;
};

export const indexOrderHosting = async () => {
    const {data} = await $authHost.get('api/order_hosting', {});
    return data;
};

export const indexChangeHostingStatus = async () => {
    const {data} = await $authHost.get('api/change_hosting_status', {});
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

export const updateHostingStatus = async (status_id, hostingId) => {
    const {data} = await $authHost.patch('api/order_hosting/'+ hostingId, {status_id});
    return data;
};

export const deleteHosting = async (hostingId) => {
    const {data} = await $authHost.delete('api/hostings/' + hostingId, {});
    return data;
};