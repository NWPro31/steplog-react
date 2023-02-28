import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {DASHBOARD_ROUTE, INDEX_DOMAIN_ROUTE, INDEX_INVOICES_ROUTE} from "../../../utils/consts";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ContentHeader from "../../../components/ContentHeader";
import {editInvoice, updateInvoice} from "../../../http/invoiceAPI";

const InvoiceUpdate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [isPaid, setIsPaid] = useState(false);
    const [statusId, setStatusId] = useState(0);
    const [status, setStatus] = useState([]);
    const {id} = useParams();
    const [loadingData, setLoadingData] = useState(true);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_INVOICES_ROUTE, name: "Платежи" },
        { name: "Редактирование платежа" },
    ];


    useEffect(()=>{
        void edit();
    },[]);

    const edit = async () => {
        let data;
        data = await editInvoice(id);
        setTitle(data.invoice.title);
        setAmount(data.invoice.amount);
        setStatusId(data.invoice.status_id);
        setIsPaid(data.invoice.is_paid);
        setStatus(data.status);
        setLoadingData(false);
    };


    const click = async () => {
        try {
            setLoading(true);
            let data;
            data = await updateInvoice(title, amount, isPaid, statusId === 0 ? null : statusId, id);
            if(data.success) navigate(DASHBOARD_ROUTE + '/' + INDEX_INVOICES_ROUTE);
        } catch (e) {
            alert(e.response.message);
        }

    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Редактирование платежа"/>
            <section className="content">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Характеристики</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    {!loadingData ?
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="inputTitle">Назначение платежа</label>
                                <input type="text" id="inputTitle" name="title" value={title}
                                       onChange={e => setTitle(e.target.value)}
                                       className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAmount">Сумма</label>
                                <input type="number" id="inputAmount" name="amount" value={amount}
                                       onChange={e => setAmount(Number(e.target.value))}
                                       className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label>Статус</label>
                                <select defaultValue={statusId} className="form-control" name="status_id"
                                        onChange={e => setStatusId(Number(e.target.value))}
                                >
                                    <option value="0">Выберите статус</option>
                                    {status.map((item, index) =>
                                        <option key={index} value={item.id}>{item.title}</option>
                                    )}
                                </select>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" name="is_paid" checked={isPaid}
                                       onChange={() => setIsPaid(!isPaid)}
                                       className="form-check-input" id="isPaid"/>
                                    <label className="form-check-label" htmlFor="isPaid">платеж зачислен</label>
                            </div>
                        </div>
                        :
                        <div className="d-flex justify-content-center m-5">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden"></span>
                            </div>
                        </div>
                    }
                </div>
                <div className="row">
                    <div className="col-12">
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + INDEX_INVOICES_ROUTE);}} className="btn btn-secondary "
                                variant="primary">
                            Отменить
                        </Button>
                        <Button onClick={click} className="btn btn-primary float-right"
                                variant="primary">
                            {loading ?
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                :
                                ''
                            }
                            Обновить
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default InvoiceUpdate;