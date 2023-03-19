import {$authHost, $host, $whois} from ".";
// eslint-disable-next-line
import jwt_decode from "jwt-decode";

export const createDomain = async (title, price, price_extension, period) => {
    const {data} = await $authHost.post('api/domains', {title, price, price_extension, period});
    return data;
};

export const createOrderDomain = async (url, domain_id, family_ru, family_en, name_ru, name_en, otchestvo_ru, otchestvo_en, phone, email, birthday, address_city, address_oblast, address_country, address_index, address_street, passport_date, passport_code, passport_number, passport_org, ns) => {
    const {data} = await $authHost.post('api/order_domains', {url, domain_id, family_ru, family_en, name_ru, name_en, otchestvo_ru, otchestvo_en, phone, email, birthday, address_city, address_oblast, address_country, address_index, address_street, passport_date, passport_code, passport_number, passport_org, ns});
    return data;
};

export const createChangeNsDomain = async (ns, order_domain_id) => {
    const {data} = await $authHost.post('api/change_ns_domain', {ns, order_domain_id});
    return data;
};

export const indexDomain = async () => {
    const {data} = await $authHost.get('api/domains', {});
    return data;
};

export const indexChangeNsDomain = async () => {
    const {data} = await $authHost.get('api/change_ns_domain', {});
    return data;
};

export const indexChangeNsStatus = async () => {
    const {data} = await $authHost.get('api/change_ns_status', {});
    return data;
};

export const updateChangeNsStatus = async (status_id, changeNs) => {
    const {data} = await $authHost.patch('api/change_ns_domain/'+ changeNs, {status_id});
    return data;
};

export const indexContactRuDomain = async () => {
    const {data} = await $authHost.get('api/contact_ru_domains', {});
    return data;
};

export const indexOrderDomain = async () => {
    const {data} = await $authHost.get('api/order_domains', {});
    return data;
};

export const showOrderDomain = async (domainId) => {
    const {data} = await $authHost.get('api/order_domains/' + domainId, {});
    return data;
};

export const whoisDomain = async (url) => {
    const {data} = await $whois.get('?q=' + url, {});
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

export const updateOrderDomain = async (url, status_id, reg_before, ns, orderDomainId) => {
    const {data} = await $authHost.patch('api/order_domains/'+ orderDomainId, {url, status_id, reg_before, ns});
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