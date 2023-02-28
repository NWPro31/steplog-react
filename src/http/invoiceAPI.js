import {$authHost, $host} from ".";
// eslint-disable-next-line
import jwt_decode from "jwt-decode";

export const indexInvoice = async () => {
    const {data} = await $authHost.get('api/invoices', {});
    return data;
};