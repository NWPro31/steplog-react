import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../../index";
import ContentHeader from "../../../../components/ContentHeader";
import {
    DASHBOARD_ROUTE,
    INDEX_ORDERS_ROUTE,
    UPDATE_ORDER_DOMAIN_ROUTE
} from "../../../../utils/consts";
import moment from "moment";
import 'moment/locale/ru';
import {createChangeNsDomain, showOrderDomain} from "../../../../http/domainAPI";
import Spinner from "react-bootstrap/Spinner";


const OrdersDomainShow = observer(() => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const {domain} = useContext(Context);
    const [loadingData, setLoadingData] = useState(true);
    const [ns, setNs] = useState([]);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_ORDERS_ROUTE, name: "Список заказов" },
        { name: "Информация о домене" },
    ];

    useEffect(()=>{
        showOrderDomain(id).then(data => {
            domain.setOrderDomain(data.order_domain);
            setNs(data.order_domain.ns);
        }).finally(()=>{
            setLoadingData(false);
        }).catch(err => console.log(err));
    },[id]);

    useEffect(()=>{

    },[domain.orderDomain]);

    if(!domain.orderDomain && !loadingData) {
        return (
            <>
                <ContentHeader hrefs={hrefs} name="Информация о домене"/>
                <section className="content">
                    <div className="d-flex justify-content-center m-5">
                        <h3>Нет данных</h3>
                    </div>
                </section>
            </>
        )
    }

    const timeRule = (time) => {
        return moment(time).locale('ru').fromNow()
    }

    const timeOld = (a, b) => {
        if(b === 0) return true;
        const dateA = new Date(a);
        const dateB = new Date(b);
        //setPrevTime(a);
        return dateA.getDate() !== dateB.getDate();
    }

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
            document.getElementById('close-button').click();
            let data;
            data = await createChangeNsDomain(ns, id);
            if(data.success) {
                showOrderDomain(id).then(data => {
                    domain.setOrderDomain(data.order_domain);
                    setNs(data.order_domain.ns);
                }).finally(()=>{
                    setLoadingData(false);
                }).catch(err => console.log(err));
            }
            console.log(data);
            //if(data.success) navigate(DASHBOARD_ROUTE + '/' + INDEX_ORDERS_ROUTE);
        } catch (e) {
            console.log(e.response.message);
        }

    };

    return (
        <>
            <ContentHeader hrefs={hrefs} name="Информация о домене"/>
            <section className="content">
                {!loadingData ?
                    <>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Информация о домене - {domain.orderDomain.url}</h3>
                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse"
                                            title="Collapse">
                                        <i className="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-md-12 col-lg-9 order-2 order-md-1">
                                        <div className="row">
                                            <div className="col-12 col-lg-4 pt-3 pb-3 bg-light">
                                                Статус
                                            </div>
                                            <div className="col-12 col-lg-8 pt-3 pb-3 bg-light">
                                                <span>
                                                    {domain.orderDomain.status.title}
                                                </span>
                                            </div>
                                            <div className="col-12 col-lg-4 pt-3 pb-3">
                                                Нейм Сервера
                                            </div>
                                            <div className="col-12 col-lg-8 pt-3 pb-3">
                                                <span>
                                                    {domain.orderDomain.ns.map(item =>
                                                    <div key={item.number}>
                                                        {item.ns}
                                                    </div>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="col-12 col-lg-4 pt-3 pb-3 bg-light">
                                                Стоимость
                                            </div>
                                            <div className="col-12 col-lg-8 pt-3 pb-3 bg-light">
                                                <span>
                                                    {domain.orderDomain.price}р.
                                                </span>
                                            </div>
                                            <div className="col-12 col-lg-4 pt-3 pb-3">
                                                Стоимость продления
                                            </div>
                                            <div className="col-12 col-lg-8 pt-3 pb-3">
                                                <span>
                                                    {domain.orderDomain.price}р.
                                                </span>
                                            </div>
                                            <div className="col-12 col-lg-4 pt-3 pb-3 bg-light">
                                                Срок регистрации
                                            </div>
                                            <div className="col-12 col-lg-8 pt-3 pb-3 bg-light">
                                                <span>
                                                    до {domain.orderDomain.reg_before}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-12 col-lg-3 order-1 order-md-2">
                                        <button className="btn btn-info btn-sm m-1"
                                                data-toggle="modal"
                                                data-target="#modal-default">
                                            <i className="fas fa-file-invoice m-1">
                                            </i>
                                            Поменять НС
                                        </button>
                                        <button className="btn btn-info btn-sm m-1"
                                                onClick={() => {navigate(DASHBOARD_ROUTE);}}
                                        >
                                            <i className="fas fa-file-invoice m-1">
                                            </i>
                                            Продлить
                                        </button>
                                        <button className="btn btn-info btn-sm m-1"
                                                onClick={() => {navigate(DASHBOARD_ROUTE + '/' +  UPDATE_ORDER_DOMAIN_ROUTE + '/' + domain.orderDomain.id);}}
                                        >
                                            <i className="fas fa-file-invoice m-1">
                                            </i>
                                            Редактировать
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <div className="d-flex justify-content-center m-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>
                }
            </section>
            {ns &&
                <div className="modal fade" id="modal-default">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Изменить НС серверы</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Обновление этих настроек может занять примерно 24 часа.</p>
                                {
                                    ns.map(i =>
                                        <div
                                            className="row mb-3"
                                            key={i.number}>
                                            <div className="col-5"><input
                                                value={i.ns ?? ''}
                                                className="form-control"
                                                onChange={(e) => changeNs('ns', e.target.value, i.number)}
                                                placeholder="ns1.steplog.ru"/></div>
                                            <div className="col-4"><input
                                                value={i.ip ?? ''}
                                                className="form-control"
                                                onChange={(e) => changeNs('ip', e.target.value, i.number)}
                                                placeholder="1.1.1.1"/></div>
                                            <div className="col-3">
                                                <button className="btn btn-outline-danger btn-block"
                                                        onClick={() => removeNs(i.number)}>Удалить
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                                <button className="btn btn-outline-primary"
                                        onClick={addNs}
                                >
                                    Добавить НС
                                </button>
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button" id="close-button" className="btn btn-default"
                                        data-dismiss="modal">Отмена
                                </button>
                                <button type="button" className="btn btn-primary" onClick={click}>
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
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
});

export default OrdersDomainShow;