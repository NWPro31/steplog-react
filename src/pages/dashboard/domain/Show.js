import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import ContentHeader from "../../../components/ContentHeader";
import {DASHBOARD_ROUTE, INDEX_DOMAIN_ROUTE} from "../../../utils/consts";
import {indexDomain} from "../../../http/domainAPI";
import AgeToStr from "../../../components/AgeToStr";


const DomainShow = observer(() => {
    const {id} = useParams();
    const {domain} = useContext(Context);
    const [title, setTitle] = useState('');
    const [price,setPrice] = useState(0);
    const [priceExtension,setPriceExtension] = useState(0);
    const [period,setPeriod] = useState(0);
    const [loadingData, setLoadingData] = useState(false);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_DOMAIN_ROUTE, name: "Список тарифов" },
        { name: "Детали тарифа" },
    ];
    const show = async () => {
        indexDomain().then(data => {
            domain.setDomain(data.domains);
        }).finally(()=>{
            setLoadingData(false);
        }).catch(err => console.log(err));
    };
    useEffect(()=>{
        if(typeof domain.domain === 'object' && !Array.isArray(domain.domain)){
            setLoadingData(true);
            void show();
        }
    },[id]);

    useEffect(()=>{
        if(domain.domain.length > 0) {
            let dom = domain.domain.filter(dom => dom.id === Number(id)).map(item => item)[0];
            setTitle(dom.title);
            setPrice(dom.price);
            setPriceExtension(dom.price_extension);
            setPeriod(dom.period);
        }
    },[domain.domain]);

    return (
        <>
            <ContentHeader hrefs={hrefs} name="Детали тарифа"/>
            <section className="content">
                {!loadingData ?
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Детали тарифа - {title}</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse"
                                        title="Collapse">
                                    <i className="fas fa-minus"></i>
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times"></i>
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
                                                    className="info-box-text text-center text-muted">Стоимость за год</span>
                                                    <span
                                                        className="info-box-number text-center text-muted mb-0">{price}р.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="info-box bg-light">
                                                <div className="info-box-content">
                                                    <span className="info-box-text text-center text-muted">Стоимость продления за год</span>
                                                    <span
                                                        className="info-box-number text-center text-muted mb-0">{priceExtension}р.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="info-box bg-light">
                                                <div className="info-box-content">
                                                    <span className="info-box-text text-center text-muted">Максимальный период</span>
                                                    <span
                                                        className="info-box-number text-center text-muted mb-0">{period} <AgeToStr age={period}/></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <h4>Новые клиенты</h4>
                                            <div className="post">
                                                <div className="user-block">
                                                    <img className="img-circle img-bordered-sm"
                                                         src="/img/user1-128x128.jpg" alt="user image"/>
                                                    <span className="username">
                          <a href="#">Jonathan Burke Jr.</a>
                        </span>
                                                    <span className="description">Заказ тарифа - 7:45 сегодня</span>
                                                </div>
                                                <p>
                                                    Сайт такой-то
                                                </p>
                                            </div>

                                            <div className="post clearfix">
                                                <div className="user-block">
                                                    <img className="img-circle img-bordered-sm"
                                                         src="/img/user7-128x128.jpg" alt="User Image"/>
                                                    <span className="username">
                          <a href="#">Sarah Ross</a>
                        </span>
                                                    <span className="description">Заказ тарифа - 3 дня назад</span>
                                                </div>
                                                <p>
                                                    Сайт такой-то
                                                </p>
                                            </div>

                                            <div className="post">
                                                <div className="user-block">
                                                    <img className="img-circle img-bordered-sm"
                                                         src="/img/user1-128x128.jpg" alt="user image"/>
                                                    <span className="username">
                          <a href="#">Jonathan Burke Jr.</a>
                        </span>
                                                    <span className="description">Заказ тарифа - 7 дней назад</span>
                                                </div>
                                                <p>
                                                    Сайт такой-то
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                                    <h3 className="text-primary"><i className="fas fa-paint-brush"></i> {title}</h3>
                                    <div className="text-muted">
                                        <p className="text-sm">Клиентов на тарифе
                                            <b className="d-block">25</b>
                                        </p>
                                        <p className="text-sm">Характеристики тарифа
                                            <b className="d-block">регистратор</b>
                                        </p>
                                    </div>
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

export default DomainShow;