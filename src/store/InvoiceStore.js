export default class InvoiceStore {
    constructor() {
        this._invoice = {};
    }

    setInvoice(invoice){
        this._invoice = invoice;
    }

    get invoice(){
        return this._invoice;
    }
}