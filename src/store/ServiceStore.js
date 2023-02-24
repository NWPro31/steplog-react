export default class ServiceStore {
    constructor() {
        this._service = {};
        this._orderService = {};
    }

    setService(service){
        this._service = service;
    }

    setOrderService(orderService){
        this._orderService = orderService;
    }

    get service(){
        return this._service;
    }

    get orderService(){
        return this._orderService;
    }

};