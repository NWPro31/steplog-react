import {makeAutoObservable} from "mobx";

export default class HostingStore {
    constructor() {
        this._hosting = {};
        this._orderHosting = {};
        makeAutoObservable(this);
    }

    setHosting(hosting){
        this._hosting = hosting;
    }

    setOrderHosting(orderHosting){
        this._orderHosting = orderHosting;
    }

    get hosting(){
        return this._hosting;
    }

    get orderHosting(){
        return this._orderHosting;
    }

};