export default class ServiceStore {
    constructor() {
        this._service = {};
    }

    setService(service){
        this._service = service;
    }

    get service(){
        return this._service;
    }

};