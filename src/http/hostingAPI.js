import {$authHost, $host} from ".";
// eslint-disable-next-line
import jwt_decode from "jwt-decode";

export const createHosting = async (title, description, price) => {
    const {data} = await $authHost.post('api/hostings', {title, description, price});
    return data;
};
