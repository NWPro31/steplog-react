import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../../index";
import ContentHeader from "../../../../components/ContentHeader";
import {
    DASHBOARD_ROUTE, INDEX_CUSTOMER_HOSTING_ROUTE
} from "../../../../utils/consts";
import moment from "moment";
import 'moment/locale/ru';
import {createChangeNsDomain, showOrderDomain} from "../../../../http/domainAPI";
import Spinner from "react-bootstrap/Spinner";
import {showOrderHosting} from "../../../../http/hostingAPI";


const CustomerHostingShow = observer(() => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const {hosting} = useContext(Context);
    const [loadingData, setLoadingData] = useState(true);
    const [ns, setNs] = useState([]);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_CUSTOMER_HOSTING_ROUTE, name: "Список хостинг аккаунтов" },
        { name: "Информация о хостинг аккаунте" },
    ];

    useEffect(()=>{
        showOrderHosting(id).then(data => {
            hosting.setOrderHosting(data.order_hosting);
        }).finally(()=>{
            setLoadingData(false);
        }).catch(err => console.log(err));
    },[id]);

    useEffect(()=>{

    },[hosting.orderHosting]);

    if(!hosting.orderHosting && !loadingData) {
        return (
            <>
                <ContentHeader hrefs={hrefs} name="Информация о хостинг аккаунте"/>
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

    const click = async () => {
    };

    const timeToBefore = (time) => {
        let date = new Date(time);
        let d = date.getDate();
        date.setMonth(date.getMonth() - 3);
        if (date.getDate() !== d) {
            date.setDate(0);
        }
        return date.toLocaleDateString('fr-CA').toString();
    }

    const invoiceToBefore = (invoice) => {
        let date = new Date(invoice);
        let today = new Date();
        return today >= date;
    }

    return (
        <>
            <ContentHeader hrefs={hrefs} name="Информация о хостинг аккаунте"/>
            <section className="content">
                {!loadingData ?
                    <>
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Аккаунт - {hosting.orderHosting.url}</h3>
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
                                                    {hosting.orderHosting.status.title}
                                                </span>
                                            </div>
                                            <div className="col-12 col-lg-4 pt-3 pb-3">
                                                Стоимость
                                            </div>
                                            <div className="col-12 col-lg-8 pt-3 pb-3">
                                                <span>
                                                    {hosting.orderHosting.price}р.
                                                </span>
                                            </div>
                                            <div className="col-12 col-lg-4 pt-3 pb-3 bg-light">
                                                Оплачен
                                            </div>
                                            <div className="col-12 col-lg-8 pt-3 pb-3 bg-light">
                                                <span>
                                                    до
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-12 col-lg-3 order-1 order-md-2">
                                        {/* Кнопки смены тарифа, продления, отключения */}


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

export default CustomerHostingShow;