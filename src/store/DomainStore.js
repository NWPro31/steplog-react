export default class DomainStore {
    constructor() {
        this._domain = {};
        this._domainReg = {};
        this._domainForm = {};
    }

    setDomain(domain){
        this._domain = domain;
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

    get domainReg(){
        return this._domainReg;
    }

    get domainForm(){
        return this._domainForm;
    }

};