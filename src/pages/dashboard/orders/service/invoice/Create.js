import {useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import {DASHBOARD_ROUTE, SHOW_ORDERS_ROUTE} from "../../../../../utils/consts";
import {createInvoiceOrderService} from "../../../../../http/serviceAPI";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ContentHeader from "../../../../../components/ContentHeader";

const InvoiceOrderServicesCreate = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [partial, setPartial] = useState(false);
    const [price, setPrice] = useState(0);
    const [comment, setComment] = useState('');
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + SHOW_ORDERS_ROUTE + '/' + id, name: "Детали заказа" },
        { name: "Выставить счет" },
    ];

    const click = async () => {
        try {
            setLoading(true);
            let data;
            data = await createInvoiceOrderService(id, title, price, partial);
            if(data.success) navigate(DASHBOARD_ROUTE + '/' + SHOW_ORDERS_ROUTE + '/' + id);
        } catch (e) {
            alert(e.response.data.message);
        }

    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Выставить счет"/>
            <section className="content">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Выставить счет для заказа #{id}</h3>

                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="inputTitle">Назначение платежа</label>
                            <input type="text" id="inputTitle" name="title" value={title}
                                   onChange={e => setTitle(e.target.value)}
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPrice">Сумма</label>
                            <input type="number" id="inputPrice" name="price" value={price}
                                   onChange={e => setPrice(Number(e.target.value))}
                                   className="form-control"/>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" name="is_partial" checked={partial}
                                   onChange={() => setPartial(!partial)}
                                   className="form-check-input" id="isPartial"/>
                            <label className="form-check-label" htmlFor="isPartial">частичная предоплата</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + SHOW_ORDERS_ROUTE + '/' + id);}} className="btn btn-secondary "
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
                            Отправить
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default InvoiceOrderServicesCreate;