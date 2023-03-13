import {makeAutoObservable} from "mobx";

export default class DomainStore {
    constructor() {
        this._domain = {};
        this._domainReg = {};
        this._domainForm = {};
        this._orderDomain = {};
        makeAutoObservable(this);
    }

    setDomain(domain){
        this._domain = domain;
    }

    setOrderDomain(orderDomain){
        this._orderDomain = orderDomain;
    }

    setDomainReg(domainReg){
        this._domainReg = domainReg;
    }

    setDomainForm(domainForm){
        this._domainForm = domainForm;
    }

    get domain(){
        return this._domain;
    }

    get orderDomain(){
        return this._orderDomain;
    }

    get domainReg(){
        return this._domainReg;
    }

    get domainForm(){
        return this._domainForm;
    }

};