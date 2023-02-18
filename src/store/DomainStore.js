export default class DomainStore {
    constructor() {
        this._domain = {};
        this._domainReg = {};
    }

    setDomain(domain){
        this._domain = domain;
    }

    setDomainReg(domainReg){
        this._domainReg = domainReg;
    }

    get domain(){
        return this._domain;
    }

    get domainReg(){
        return this._domainReg;
    }

};