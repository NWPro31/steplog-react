import {makeAutoObservable} from "mobx";

export default class TicketStore {
    constructor() {
        this._ticket = {};
        this._ticketMessages = {};
        makeAutoObservable(this);
    }

    setTicket(ticket){
        this._ticket = ticket;
    }

    setTicketMessages(ticketMessages){
        this._ticketMessages = ticketMessages;
    }

    get ticket(){
        return this._ticket;
    }

    get ticketMessages(){
        return this._ticketMessages;
    }
}