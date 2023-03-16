import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../../index";
import ContentHeader from "../../../../components/ContentHeader";
import {
    DASHBOARD_ROUTE,
    SHOW_COMMENT_ORDER_SERVICE_ROUTE,
    INDEX_ORDERS_ROUTE,
    UPDATE_ORDERS_ROUTE, CREATE_INVOICE_ORDER_SERVICE_ROUTE, UPDATE_ORDER_DOMAIN_ROUTE
} from "../../../../utils/consts";
import moment from "moment";
import 'moment/locale/ru';
import Button from "react-bootstrap/Button";
import {showOrderDomain} from "../../../../http/domainAPI";


const OrdersDomainShow = observer(() => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {domain} = useContext(Context);
    const [loadingData, setLoadingData] = useState(true);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_ORDERS_ROUTE, name: "Список заказов" },
        { name: "Информация о домене" },
    ];

    useEffect(()=>{
        showOrderDomain(id).then(data => {
            domain.setOrderDomain(data);
        }).finally(()=>{
            setLoadingData(false);
        }).catch(err => console.log(err));
    },[id]);

    useEffect(()=>{

    },[domain.orderDomain]);

    if(!domain.orderDomain.order_domain && !loadingData) {
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

    return (
        <>
            <ContentHeader hrefs={hrefs} name="Информация о домене"/>
            <section className="content">
                {!loadingData ?
                    <>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Информация о домене - {domain.orderDomain.order_domain.url}</h3>
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
                                                    {domain.orderDomain.order_domain.status.title}
                                                </span>
                                            </div>
                                            <div className="col-12 col-lg-4 pt-3 pb-3">
                                                Нейм Сервера
                                            </div>
                                            <div className="col-12 col-lg-8 pt-3 pb-3">
                                                <span>
                                                    {domain.orderDomain.order_domain.ns.map(item =>
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
                                                    {domain.orderDomain.order_domain.price}р.
                                                </span>
                                            </div>
                                            <div className="col-12 col-lg-4 pt-3 pb-3">
                                                Стоимость продления
                                            </div>
                                            <div className="col-12 col-lg-8 pt-3 pb-3">
                                                <span>
                                                    {domain.orderDomain.order_domain.price}р.
                                                </span>
                                            </div>
                                            <div className="col-12 col-lg-4 pt-3 pb-3 bg-light">
                                                Срок регистрации
                                            </div>
                                            <div className="col-12 col-lg-8 pt-3 pb-3 bg-light">
                                                <span>
                                                    до
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-12 col-lg-3 order-1 order-md-2">
                                        <button className="btn btn-info btn-sm m-1"
                                                onClick={() => {navigate(DASHBOARD_ROUTE);}}
                                        >
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
                                                onClick={() => {navigate(DASHBOARD_ROUTE + '/' +  UPDATE_ORDER_DOMAIN_ROUTE + '/' + domain.orderDomain.order_domain.id);}}
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
        </>
    );
});

export default OrdersDomainShow;