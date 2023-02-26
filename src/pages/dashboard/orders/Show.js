import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import ContentHeader from "../../../components/ContentHeader";
import {DASHBOARD_ROUTE, INDEX_ORDERS_ROUTE} from "../../../utils/consts";
import {indexOrderService} from "../../../http/serviceAPI";


const OrdersShow = observer(() => {
    const {id} = useParams();
    const {service} = useContext(Context);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [access, setAccess] = useState('');
    const [price,setPrice] = useState(0);
    const [loadingData, setLoadingData] = useState(false);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_ORDERS_ROUTE, name: "Список заказов" },
        { name: "Детали заказа" },
    ];
    const show = async () => {
        indexOrderService().then(data => {
            service.setOrderService(data.order_services);
        }).finally(()=>{
            setLoadingData(false);
        }).catch(err => console.log(err));
    };
    useEffect(()=>{
        if(typeof service.orderService === 'object' && !Array.isArray(service.orderService)){
            setLoadingData(true);
            void show();
        }
    },[id]);

    useEffect(()=>{
        if(service.orderService.length > 0) {
            let serv = service.orderService.filter(host => host.id === Number(id)).map(item => item)[0];
            setUrl(serv.url);
            setDescription(serv.description);
            setAccess(serv.access);
            setPrice(serv.price);
            setTitle(serv.service.title);
            setDuration(serv.service.duration_work);
            setName(serv.user.name);
            setEmail(serv.user.email);
        }
    },[service.orderService]);

    return (
        <>
            <ContentHeader hrefs={hrefs} name="Детали заказа"/>
            <section className="content">
                {!loadingData ?
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Детали заказа - {url} ({title})</h3>
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
                                                        className="info-box-number text-center text-muted mb-0">{price.toFixed(2)}р.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="info-box bg-light">
                                                <div className="info-box-content">
                                                    <span className="info-box-text text-center text-muted">Оплачено</span>
                                                    <span
                                                        className="info-box-number text-center text-muted mb-0">{price}р.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="info-box bg-light">
                                                <div className="info-box-content">
                                                    <span className="info-box-text text-center text-muted">Ожидается оплата</span>
                                                    <span
                                                        className="info-box-number text-center text-muted mb-0">{price}р.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <h4>Задача</h4>
                                            <div className="post">
                                                <p>
                                                    <small>Срок выполнения - {duration}</small>
                                                </p>
                                                <p>
                                                    {title}
                                                </p>
                                                <p>
                                                    <em>{description}</em>
                                                </p>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                                    <h3 className="text-primary"><i className="fas fa-paint-brush"></i> {url}</h3>
                                    <p className="text-muted">{name}</p>
                                    <p className="text-muted">{email}</p>
                                    <br/>
                                    <div className="text-center mt-5 mb-3">
                                        <a href="#" className="btn btn-sm btn-primary">Редактировать тариф</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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