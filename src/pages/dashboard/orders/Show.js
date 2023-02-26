import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import ContentHeader from "../../../components/ContentHeader";
import {DASHBOARD_ROUTE, INDEX_ORDERS_ROUTE} from "../../../utils/consts";
import {showOrderService} from "../../../http/serviceAPI";
import moment from "moment";
import 'moment/locale/ru';


const OrdersShow = observer(() => {
    const {id} = useParams();
    const {service} = useContext(Context);
    const [loadingData, setLoadingData] = useState(true);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_ORDERS_ROUTE, name: "Список заказов" },
        { name: "Детали заказа" },
    ];

    useEffect(()=>{
        showOrderService(id).then(data => {
            service.setOrderService(data);
        }).finally(()=>{
            setLoadingData(false);
        }).catch(err => console.log(err));
    },[id]);

    useEffect(()=>{

    },[service.orderService]);

    if(!service.orderService.order_service && !loadingData) {
        return (
            <>
                <ContentHeader hrefs={hrefs} name="Детали заказа"/>
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
        console.log(dateA.getDate() + ' - ' + dateB.getDate());
        console.log(dateA + ' - ' + dateB);
        //setPrevTime(a);
        return dateA.getDate() !== dateB.getDate();
    }


    return (
        <>
            <ContentHeader hrefs={hrefs} name="Детали заказа"/>
            <section className="content">
                {!loadingData ?
                    <>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Детали заказа - {service.orderService.order_service.url} ({service.orderService.order_service.service.title})</h3>
                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse"
                                            title="Collapse">
                                        <i className="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
                                        <div className="row">
                                            <div className="col-12 col-sm-4">
                                                <div className="info-box bg-light">
                                                    <div className="info-box-content">
                                                    <span
                                                        className="info-box-text text-center text-muted">Стоимость заказа</span>
                                                        <span
                                                            className="info-box-number text-center text-muted mb-0">{service.orderService.order_service.price.toFixed(2)}р.</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4">
                                                <div className="info-box bg-light">
                                                    <div className="info-box-content">
                                                        <span className="info-box-text text-center text-muted">Оплачено</span>
                                                        <span
                                                            className="info-box-number text-center text-muted mb-0">{service.orderService.order_service.price}р.</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-4">
                                                <div className="info-box bg-light">
                                                    <div className="info-box-content">
                                                        <span className="info-box-text text-center text-muted">Ожидается оплата</span>
                                                        <span
                                                            className="info-box-number text-center text-muted mb-0">{service.orderService.order_service.price}р.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <h4>Задача</h4>
                                                <div className="post">
                                                    <p>
                                                        <small>Срок выполнения - {service.orderService.order_service.service.duration_work}</small>
                                                    </p>
                                                    <p>
                                                        {service.orderService.order_service.service.title}
                                                    </p>
                                                    <p>
                                                        <em>{service.orderService.order_service.description}</em>
                                                    </p>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                                        <h3 className="text-primary"><i className="fas fa-paint-brush"></i> {service.orderService.order_service.url}</h3>
                                        <p className="text-muted">{service.orderService.order_service.user.name}</p>
                                        <p className="text-muted">{service.orderService.order_service.user.email}</p>
                                        <br/>
                                        <div className="text-center mt-5 mb-3">
                                            <a href="#" className="btn btn-sm btn-primary">Редактировать тариф</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="timeline">
                                        {service.orderService.status && service.orderService.status.map((status, index, arr) => (
                                            <div key={status.id} className="timeline">
                                                {
                                                    timeOld(status.created_at, 0 < index ? arr[index - 1].created_at : 0)
                                                    ?
                                                    <div className="time-label">
                                                        <span
                                                            className="bg-blue">{timeRule(status.created_at)}</span>
                                                    </div>
                                                    :
                                                    null
                                                }
                                                <div>
                                                    <i className="fas fa-user bg-green"></i>
                                                    <div className="timeline-item">
                                                <span className="time"><i
                                                    className="fas fa-clock"></i> {timeRule(status.created_at)}</span>
                                                        <h3 className="timeline-header no-border">{status.title}</h3>
                                                        {status.description ?
                                                            <div className="timeline-body">
                                                                {status.description}
                                                            </div>
                                                            :
                                                            null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div>
                                            <i className="fas fa-clock bg-gray"></i>
                                        </div>
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

export default OrdersShow;