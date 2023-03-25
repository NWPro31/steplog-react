import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {
    DASHBOARD_ROUTE, INDEX_INVOICES_ROUTE, SHOW_ORDERS_ROUTE, UPDATE_INVOICES_ROUTE
} from "../../../utils/consts";
import ContentHeader from "../../../components/ContentHeader";
import {useNavigate, useParams} from "react-router-dom";
import {showInvoice} from "../../../http/invoiceAPI";


const InvoicesSelect = observer(() => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {invoice} = useContext(Context);
    const [title, setTitle] = useState('');
    const [bank, setBank] = useState('');
    const [amount, setAmount] = useState(0);
    const [loading,setLoading] = useState(true);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_INVOICES_ROUTE, name: "Платежи" },
        { name: "Выбор способа платежа" },
    ];

    useEffect(()=>{
        setLoading(true);
        showInvoice(id).then(data => {
            setTitle(data.invoice.title);
            setAmount(data.invoice.amount);
            setBank(data.bank_account.bank);
        }).finally(()=>{
            setLoading(false);
        })
            .catch(err => console.log(err));
    },[]);

    useEffect(() => {
        //loading
    },[invoice.invoice]);

    const formatDate = (date) => {
        return new Date(date).toLocaleString('ru', {
            day:   '2-digit',
            month: '2-digit',
            year:  'numeric'
        });
    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Выбор способа платежа"/>
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Выбор способа платежа</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body table-responsive p-0">
                        <Table striped>
                            <thead>
                            <tr>
                                <th width={'8%'}>#</th>
                                <th width={'20%'}>Назначение</th>
                                <th width={'10%'} className="text-center">Сумма</th>
                                <th width={'35%'} className="text-center">Метод оплаты</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {loading ?
                                <tr>
                                    <td colSpan={8}>
                                        <div className="d-flex justify-content-center">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden"></span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                : ''}
                                <tr>
                                    <td className="align-middle">1</td>
                                    <td className="align-middle">{title}</td>
                                    <td className="align-middle text-center">{amount}р.</td>
                                    <td className="align-middle text-center">
                                        Банковский перевод (оплата на реквизиты по счету)
                                    </td>
                                    <td className="align-middle text-right">
                                        <Button className="btn btn-primary btn-sm m-1"
                                                data-toggle="modal"
                                                data-target="#modal-default"
                                        >
                                            <i className="fas fa-folder m-1">
                                            </i>
                                            выбрать
                                        </Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="align-middle">2</td>
                                    <td className="align-middle">{title}</td>
                                    <td className="align-middle text-center">{amount}р.</td>
                                    <td className="align-middle text-center">
                                        Freekassa (оплата картой, qiwi, и т.д.)
                                    </td>
                                    <td className="align-middle text-right">
                                        <Button className="btn btn-primary btn-sm m-1"
                                                data-toggle="modal"
                                                data-target="#modal-freekassa"
                                        >
                                            <i className="fas fa-folder m-1">
                                            </i>
                                            выбрать
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modal-default">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Банковский перевод</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{whiteSpace:'pre'}}>
                            <p>{bank}</p>
                            <p>Назначение платежа: {title} №{id}</p>
                        </div>
                        <div className="modal-footer float-right">
                            <button type="button" id="close-button" className="btn btn-default" data-dismiss="modal">Закрыть окно</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modal-freekassa">
                <div className="modal-dialog">
                    <div className="modal-content bg-light">
                        <div className="modal-header">
                            <h4 className="modal-title">Оплата через Freekassa</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{whiteSpace:'pre'}}>
                            <p>Данный способ временно выключен, следите за новостями.</p>
                        </div>
                        <div className="modal-footer float-right">
                            <button type="button" id="close-button" className="btn btn-default" data-dismiss="modal">Закрыть окно</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default InvoicesSelect;