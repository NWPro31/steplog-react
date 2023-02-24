import {$authHost, $host} from ".";
// eslint-disable-next-line
import jwt_decode from "jwt-decode";


export const indexService = async () => {
    const {data} = await $authHost.get('api/services', {});
    return data;
};


export const createService = async (title, description, price, price_min, duration_work) => {
    const {data} = await $authHost.post('api/services', {title, description, price, price_min, duration_work});
    return data;
};

export const createOrderService = async (service_id, url, description, access, price) => {
    const {data} = await $authHost.post('api/order_services', {service_id, url, description, access, price});
    return data;
};

export const editService = async (serviceId) => {
    const {data} = await $authHost.get('api/services/' + serviceId + '/edit', {});
    return data;
};

export const updateService = async (title, description, price, price_min, duration_work, is_stored, serviceId) => {
    const {data} = await $authHost.patch('api/services/'+ serviceId, {title, description, price, price_min, duration_work, is_stored});
    return data;
};

export const deleteService = async (serviceId) => {
    const {data} = await $authHost.delete('api/services/' + serviceId, {});
    return data;
};

