export default class ServiceStore {
    constructor() {
        this._service = {};
        this._orderService = {};
        this._commentOrder = {};
    }

    setService(service){
        this._service = service;
    }

    setOrderService(orderService){
        this._orderService = orderService;
    }

    setCommentOrder(commentOrder){
        this._commentOrder = commentOrder;
    }

    get service(){
        return this._service;
    }

    get orderService(){
        return this._orderService;
    }

    get commentOrder(){
        return this._commentOrder;
    }

};