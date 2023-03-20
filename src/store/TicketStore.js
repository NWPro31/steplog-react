import {makeAutoObservable} from "mobx";

export default class TicketStore {
    constructor() {
        this._ticket = {};
        makeAutoObservable(this);
    }

    setTicket(ticket){
        this._ticket = ticket;
    }

    get ticket(){
        return this._ticket;
    }
}