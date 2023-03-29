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
    const [changeTarifModal, setChangeTarifModal] = useState(true);
    const [loadingChangeTarif, setLoadingChangeTarif] = useState(true);
    const [loadingChangeTarifButton, setLoadingChangeTarifButton] = useState(false);
    const [changeTarif, setChangeTarif] = useState(0);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_CUSTOMER_HOSTING_ROUTE, name: "Список хостинг аккаунтов" },
        { name: "Информация о хостинг аккаунте" },
    ];

    useEffect(()=>{
        showOrderHosting(id).then(data => {
            hosting.setOrderHosting(data.order_hosting);
            setChangeTarif(data.order_hosting.hosting_id);
        }).finally(()=>{
            setLoadingData(false);
            setLoadingChangeTarif(false);
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
                                                Тариф
                                            </div>
                                            <div className="col-12 col-lg-8 pt-3 pb-3">
                                                <span>
                                                    {hosting.orderHosting.hosting.title}
                                                </span>
                                            </div>
                                            <div className="col-12 col-lg-4 pt-3 pb-3 bg-light">
                                                Стоимость
                                            </div>
                                            <div className="col-12 col-lg-8 pt-3 pb-3 bg-light">
                                                <span>
                                                    {hosting.orderHosting.price}р.
                                                </span>
                                            </div>
                                            <div className="col-12 col-lg-4 pt-3 pb-3">
                                                Оплачен
                                            </div>
                                            <div className="col-12 col-lg-8 pt-3 pb-3">
                                                <span>
                                                    до
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-12 col-lg-3 order-1 order-md-2">
                                        {/* Кнопки смены тарифа, продления, отключения */}
                                        <button className="btn btn-info btn-sm m-1"
                                                data-toggle="modal"
                                                data-target="#modal-default">
                                            <i className="fas fa-file-invoice m-1">
                                            </i>
                                            Поменять тариф
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
                <div className="modal fade" id="modal-default">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Поменять тариф для {hosting.orderHosting.url}</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {loadingChangeTarif ?
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden"></span>
                                        </div>
                                    </div>
                                    : ''}
                                {!loadingChangeTarif &&
                                    <div className="form-group">
                                        <label>Выберите новый тариф</label>
                                        <select defaultValue={changeTarif} className="form-control" name="status_id"
                                                onChange={e => setChangeTarif(Number(e.target.value))}
                                        >
                                            <option value="0">Выберите тариф</option>
                                            {hosting.orderHosting.tarifs.map((item, index) =>
                                                <option key={index} value={item.id}>{item.title}</option>
                                            )}
                                        </select>
                                    </div>
                                }

                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button" id="close-button" className="btn btn-default" data-dismiss="modal">Отмена</button>
                                <button type="button" className="btn btn-primary">
                                    {loadingChangeTarifButton ?
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
            </section>
        </>
    );
});

export default CustomerHostingShow;