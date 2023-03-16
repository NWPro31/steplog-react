import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {DASHBOARD_ROUTE, INDEX_DOMAIN_ROUTE, INDEX_ORDERS_ROUTE} from "../../../../utils/consts";
import {showOrderDomain, updateDomain, updateOrderDomain} from "../../../../http/domainAPI";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ContentHeader from "../../../../components/ContentHeader";
import InputMask from "react-input-mask";


const OrderDomainUpdate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [ns, setNs] = useState([]);
    const [statusId, setStatusId] = useState(0);
    const [status, setStatus] = useState([]);
    const [regBefore, setRegBefore] = useState('');
    const {id} = useParams();
    const [loadingData, setLoadingData] = useState(true);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_ORDERS_ROUTE, name: "Список заказов" },
        { name: "Редактирование заказа домена" },
    ];


    useEffect(()=>{
        void edit();
    },[]);

    const edit = async () => {
        let data;
        data = await showOrderDomain(id);
        setUrl(data.order_domain.url);
        setNs(data.order_domain.ns);
        setRegBefore(data.order_domain.reg_before);
        setStatusId(data.order_domain.status.id);
        setStatus(data.status);
        setLoadingData(false);
    };

    const addNs = () => {
        setNs([...ns, {ns: '', ip: '', number: Date.now()}]);
    };

    const changeNs = (key, value, number) => {
        setNs(ns.map(i => i.number === number ? {...i, [key]: value} : i));
    };

    const removeNs = (number) => {
        setNs(ns.filter(i => i.number !== number));
    };


    const click = async () => {
        try {
            setLoading(true);
            let data;
            data = await updateOrderDomain(url, statusId, regBefore, ns, id);
            console.log(data);
            if(data.success) navigate(DASHBOARD_ROUTE + '/' + INDEX_ORDERS_ROUTE);
        } catch (e) {
            console.log(e.response.message);
        }

    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Редактирование заказа домена"/>
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
                                <label htmlFor="inputUrl">Адрес</label>
                                <input type="text" id="inputUrl" name="url" value={url}
                                       onChange={e => setUrl(e.target.value)}
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
                            <div className="form-group">
                                <label htmlFor="inputRegBefore">Делегирован до</label>
                                    <InputMask mask="2099-99-99" value={regBefore}
                                               onChange={e => setRegBefore(e.target.value)}>
                                        {() =>
                                            <input type="text" id="inputRegBefore" name="reg_before"
                                                   placeholder="ГГГГ-ММ-ДД"
                                                   className="form-control"/>
                                        }
                                    </InputMask>
                            </div>
                            <label>НСы</label>
                            {
                                ns.map(i =>
                                    <div
                                        className="row mb-3"
                                        key={i.number}>
                                        <div className="col-5"><input
                                            value={i.ns === null ? '' : i.ns}
                                            className="form-control"
                                            onChange={(e) => changeNs('ns', e.target.value, i.number)}
                                            placeholder="ns1.steplog.ru"/></div>
                                        <div className="col-4"><input
                                            value={i.ip === null ? '' : i.ip}
                                            className="form-control"
                                            onChange={(e) => changeNs('ip', e.target.value, i.number)}
                                            placeholder="1.1.1.1"/></div>
                                        <div className="col-3"><button className="btn btn-outline-danger btn-block" onClick={() => removeNs(i.number)}>Удалить</button></div>
                                    </div>
                                )
                            }
                            <button className="btn btn-outline-primary"
                                    onClick={addNs}
                            >
                                Добавить НС
                            </button>

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
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + INDEX_ORDERS_ROUTE);}} className="btn btn-secondary "
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

export default OrderDomainUpdate;