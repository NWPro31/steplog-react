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

export const updateDomain = async (title, price, price_extension, period, is_stored, reg_id, domainId) => {
    const {data} = await $authHost.patch('api/domains/'+ domainId, {title, price, price_extension, period, is_stored, reg_id});
    return data;
};

export const deleteDomain = async (domainId) => {
    const {data} = await $authHost.delete('api/domains/' + domainId, {});
    return data;
};

export const indexDomainReg = async () => {
    const {data} = await $authHost.get('api/domain/regs', {});
    return data;
};

export const createDomainReg = async (title, url) => {
    const {data} = await $authHost.post('api/domain/regs', {title, url});
    return data;
};

export const editDomainReg = async (domainRegId) => {
    const {data} = await $authHost.get('api/domain/regs/' + domainRegId + '/edit', {});
    return data;
};

export const updateDomainReg = async (title, url, domainRegId) => {
    const {data} = await $authHost.patch('api/domain/regs/'+ domainRegId, {title, url});
    return data;
};

export const deleteDomainReg = async (domainRegId) => {
    const {data} = await $authHost.delete('api/domain/regs/' + domainRegId, {});
    return data;
};