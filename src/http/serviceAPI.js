import {$authHost, $host} from ".";
// eslint-disable-next-line
import jwt_decode from "jwt-decode";


export const indexService = async () => {
    const {data} = await $authHost.get('api/services', {});
    return data;
};

export const indexOrderService = async () => {
    const {data} = await $authHost.get('api/order_services', {});
    return data;
};

export const indexCommentOrderService = async (orderId) => {
    const {data} = await $authHost.get('api/comment_order_services/' + orderId, {});
    return data;
};

export const showOrderService = async (serviceId) => {
    const {data} = await $authHost.get('api/order_services/' + serviceId, {});
    return data;
};

export const editOrderService = async (serviceId) => {
    const {data} = await $authHost.get('api/order_services/' + serviceId + '/edit', {});
    return data;
};

export const updateOrderService = async (serviceId, url, description, access, price) => {
    const {data} = await $authHost.patch('api/order_services/'+ serviceId, {url, description, access, price});
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

export const createCommentOrderService = async (order_id, comment) => {
    const {data} = await $authHost.post('api/comment_order_services', {order_id, comment});
    return data;
};

export const createInvoiceOrderService = async (service_order_id, title, amount, partial) => {
    const {data} = await $authHost.post('api/invoice_order_services', {service_order_id, title, amount, partial});
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

