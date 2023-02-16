export default class DomainStore {
    constructor() {
        this._domain = {};
    }

    setDomain(domain){
        this._domain = domain;
    }

    get domain(){
        return this._domain;
    }

};