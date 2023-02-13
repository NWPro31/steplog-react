export default class HostingStore {
    constructor() {
        this._hosting = {};
    }

    setHosting(hosting){
        this._hosting = hosting;
    }

    get hosting(){
        return this._hosting;
    }

};