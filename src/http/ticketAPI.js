import {$authHost, $host} from ".";
// eslint-disable-next-line
import jwt_decode from "jwt-decode";

export const indexTicket = async () => {
    const {data} = await $authHost.get('api/tickets', {});
    return data;
};

export const createTicket = async (title, message, order) => {
    const {data} = await $authHost.post('api/tickets', {title, message, order});
    return data;
};

export const createTicketMessages = async (ticket_id, message) => {
    const {data} = await $authHost.post('api/ticket_messages', {ticket_id, message});
    return data;
};

export const showTicketMessages = async (ticket_id) => {
    const {data} = await $authHost.get('api/ticket_messages/' + ticket_id, {});
    return data;
};