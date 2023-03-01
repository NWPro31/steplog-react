import {$authHost, $host} from ".";
// eslint-disable-next-line
import jwt_decode from "jwt-decode";

export const indexInvoice = async () => {
    const {data} = await $authHost.get('api/invoices', {});
    return data;
};

export const editInvoice = async (invoiceId) => {
    const {data} = await $authHost.get('api/invoices/' + invoiceId + '/edit', {});
    return data;
};

export const updateInvoice = async (title, amount, is_paid, status_id, invoiceId) => {
    const {data} = await $authHost.patch('api/invoices/'+ invoiceId, {title, amount, is_paid, status_id});
    return data;
};

export const showInvoice = async (invoiceId) => {
    const {data} = await $authHost.get('api/invoices/' + invoiceId, {});
    return data;
};