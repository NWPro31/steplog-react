import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {
    DASHBOARD_ROUTE, SHOW_ORDER_DOMAIN_ROUTE, SHOW_ORDERS_ROUTE
} from "../../../utils/consts";
import ContentHeader from "../../../components/ContentHeader";
import {indexOrderService} from "../../../http/serviceAPI";
import moment from "moment";
import 'moment/locale/ru';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import {useNavigate} from "react-router-dom";
import {
    indexChangeNsDomain,
    indexChangeNsStatus,
    indexOrderDomain,
    updateChangeNsStatus
} from "../../../http/domainAPI";
import Spinner from "react-bootstrap/Spinner";


const OrdersIndex = observer(() => {
    const navigate = useNavigate();
    const {service} = useContext(Context);
    const {domain} = useContext(Context);
    const [orderServices,setOrderServices] = useState([]);
    const [orderDomains,setOrderDomains] = useState([]);
    const [changeNs, setChangeNs] = useState([]);
    const [changeNsModal, setChangeNsModal] = useState({});
    const [loadingServices,setLoadingServices] = useState(true);
    const [loadingDomains,setLoadingDomains] = useState(true);
    const [loadingChangeNs, setLoadingChangeNs] = useState(true);
    const [loadingStatusNs, setLoadingStatusNs] = useState(true);
    const [loadingStatusNsButton, setLoadingStatusNsButton] = useState(false);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Список заказов" },
    ];

    useEffect(()=>{
        setLoadingServices(true);
        setLoadingDomains(true);
        setLoadingChangeNs(true);
        indexOrderService().then(data => {
            service.setOrderService(data.order_services);
            setOrderServices(data.order_services);
        }).finally(()=>{
            setLoadingServices(false);
        }).catch(err => console.log(err));
        indexOrderDomain().then(data => {
            domain.setOrderDomain(data.order_domains);
            setOrderDomains(data.order_domains);
        }).finally(()=>{
            setLoadingDomains(false);
        }).catch(err => console.log(err));
        indexChangeNsDomain().then(data => {
            setChangeNs(data.change_domain_ns);
        }).finally(()=>{
            setLoadingChangeNs(false);
        }).catch(err => console.log(err));
    },[]);

    useEffect(() => {
        //loading
        console.log(changeNsModal);
    },[orderServices, orderDomains, changeNs, changeNsModal]);

    const timeRule = (time) => {
        return moment(time).locale('ru').fromNow()
    }

    const updateChangeNsModal = (id) => {
        let url = changeNs.filter(items => items.id === id).map(ns => ns.order_domain.url)[0];
        let statusId = changeNs.filter(items => items.id === id).map(ns => ns.status_id)[0];
        setChangeNsModal(changeNsModal => ({...changeNsModal, 'url': url, 'statusId': statusId, 'change_domain_ns': id}));
        setLoadingStatusNs(true);
        indexChangeNsStatus().then(data => {
            setChangeNsModal(changeNsModal => ({...changeNsModal, 'status': data.change_ns_status}));
        }).finally(()=>{
            setLoadingStatusNs(false);
        }).catch(err => console.log(err));

    }

    const sendNewStatus = async () => {
        try {
            setLoadingStatusNsButton(true);
            let data;
            data = await updateChangeNsStatus(changeNsModal.statusId, changeNsModal.change_domain_ns);
            setLoadingStatusNsButton(false);
            if(data.success) {
                setLoadingChangeNs(true);
                indexChangeNsDomain().then(data => {
                    setChangeNs(data.change_domain_ns);
                }).finally(()=>{
                    setLoadingChangeNs(false);
                }).catch(err => console.log(err));
                document.getElementById('close-button').click();
            }
        } catch (e) {
            console.log(e);
        }
    }

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Список заказов"/>
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Заказы услуг</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body table-responsive p-0">
                        <Table striped>
                            <thead>
                            <tr>
                                <th width={'8%'}>#</th>
                                <th width={'25%'}>Услуга</th>
                                <th width={'10%'} className="text-center">Сайт</th>
                                <th width={'10%'} className="text-center">Стоимость</th>
                                <th width={'20%'}>Продолжительность работ</th>
                                <th width={'12%'} className="text-center">Состояние</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {loadingServices ?
                                <tr>
                                    <td colSpan={8}>
                                        <div className="d-flex justify-content-center">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden"></span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                : ''}
                            {orderServices.length ===0 && !loadingServices && (
                                <tr>
                                    <td colSpan={8}>
                                        <div className="d-flex justify-content-center">
                                            <div>
                                                <h3>У Вас пока нет заказов</h3>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {orderServices && orderServices.slice(0).reverse().map(service => (
                                <tr key={service.id}>
                                    <td className="align-middle">{service.id}</td>
                                    <td className="align-middle">{service.service.title}<br/>
                                    <span className="text-info">{service.user.email}</span></td>
                                    <td className="align-middle text-center">{service.url}</td>
                                    <td className="align-middle text-center tooltip_el"
                                        style={{cursor:'help'}}
                                        data-tooltip-float="true"
                                        data-tooltip-content={service.price === 0 ? 'Стоимость работ станет известна после обработки заказа' : 'Стоимость работ ' + service.price + 'р.'}
                                    >{service.price > 0 ? service.price + 'р.' : '?'}</td>
                                    <td className="align-middle">{service.service.duration_work}</td>
                                    <td className="align-middle text-center tooltip_el"
                                        style={{cursor:'help'}}
                                        data-tooltip-float="true"
                                        data-tooltip-content={service.status ? service.status.title + " " + timeRule(service.status.created_at) : 'Нет данных' + " " + timeRule(Date.now())}
                                    >{service.status ? service.status.title : 'нет данных'}</td>
                                    <td className="project-actions text-right">
                                        <Button className="btn btn-primary btn-sm m-1"
                                                onClick={() => {navigate(DASHBOARD_ROUTE + '/' + SHOW_ORDERS_ROUTE + '/' + service.id);}}
                                        >
                                            <i className="fas fa-folder m-1">
                                            </i>
                                            детали
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Заказы доменов</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body table-responsive p-0">
                        <Table striped>
                            <thead>
                            <tr>
                                <th width={'8%'}>#</th>
                                <th width={'20%'}>Домен</th>
                                <th width={'15%'} className="text-center">НС</th>
                                <th width={'15%'} className="text-center">Действует до</th>
                                <th width={'15%'} className="text-center">Состояние</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {loadingDomains ?
                                <tr>
                                    <td colSpan={8}>
                                        <div className="d-flex justify-content-center">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden"></span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                : ''}
                            {orderDomains.length ===0 && !loadingDomains && (
                                <tr>
                                    <td colSpan={8}>
                                        <div className="d-flex justify-content-center">
                                            <div>
                                                <h3>У Вас пока нет доменов</h3>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {orderDomains && orderDomains.slice(0).reverse().map(domain => (
                                <tr key={domain.id}>
                                    <td className="align-middle">{domain.id}</td>
                                    <td className="align-middle">{domain.url}</td>
                                    <td className="align-middle text-center">
                                        {domain.ns && domain.ns.map(item => (
                                            <div key={item.number}>
                                                {item.ns}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="align-middle tooltip_el text-center"
                                        style={{cursor:'help'}}
                                        data-tooltip-float="true"
                                        data-tooltip-content={`Срок действия ${domain.reg_before ? 'до ' + domain.reg_before.replace(/\s.*/, '').trim() : 'отобразится после активации домена'}`}>
                                        {domain.reg_before ? domain.reg_before.replace(/\s.*/, '').trim() : '?'}
                                    </td>
                                    <td className="align-middle text-center">{domain.status && domain.status.title}</td>
                                    <td className="project-actions text-right">
                                        <Button className="btn btn-primary btn-sm m-1"
                                                onClick={() => {
                                                    navigate(DASHBOARD_ROUTE + '/' + SHOW_ORDER_DOMAIN_ROUTE + '/' + domain.id);
                                                }}
                                        >
                                            <i className="fas fa-folder m-1">
                                            </i>
                                            детали
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Смена НС</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body table-responsive p-0">
                        <Table striped>
                            <thead>
                            <tr>
                                <th width={'8%'}>#</th>
                                <th width={'25%'} className="text-center">Домен</th>
                                <th width={'25%'} className="text-center">НС</th>
                                <th width={'15%'} className="text-center">Статус</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {loadingChangeNs ?
                                <tr>
                                    <td colSpan={8}>
                                        <div className="d-flex justify-content-center">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden"></span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                : ''}
                            {changeNs.length ===0 && !loadingChangeNs && (
                                <tr>
                                    <td colSpan={8}>
                                        <div className="d-flex justify-content-center">
                                            <div>
                                                <h3>У Вас пока нет заказов на смену НС</h3>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {changeNs && changeNs.slice(0).reverse().map(change => (
                                <tr key={change.id}>
                                    <td className="align-middle">{change.id}</td>
                                    <td className="align-middle text-center">{change.order_domain.url}</td>
                                    <td className="align-middle text-center">{change.ns && change.ns.map(item => (
                                        <div key={item.number}>
                                            {item.ns}
                                        </div>
                                    ))}</td>
                                    <td className="align-middle text-center">{change.status.title}</td>
                                    <td className="project-actions text-right">
                                        <Button className="btn btn-primary btn-sm m-1"
                                                data-toggle="modal"
                                                data-target="#modal-default"
                                                onClick={() => {
                                                    updateChangeNsModal(change.id);
                                                }}
                                        >
                                            <i className="fas fa-folder m-1">
                                            </i>
                                            поменять статус
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="modal fade" id="modal-default">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Поменять статус для {changeNsModal.url}</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {loadingStatusNs ?
                                            <div className="d-flex justify-content-center">
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden"></span>
                                                </div>
                                            </div>
                                    : ''}
                                {!loadingStatusNs &&
                                        <div className="form-group">
                                            <label>Выберите текущий статус</label>
                                            <select defaultValue={changeNsModal.statusId} className="form-control" name="status_id"
                                                    onChange={e => setChangeNsModal(changeNsModal =>  ({...changeNsModal, 'statusId': Number(e.target.value)}))}
                                            >
                                                <option value="0">Выберите статус</option>
                                                {changeNsModal.status.map((item, index) =>
                                                    <option key={index} value={item.id}>{item.title}</option>
                                                )}
                                            </select>
                                        </div>
                                }

                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button" id="close-button" className="btn btn-default" data-dismiss="modal">Отмена</button>
                                <button type="button" className="btn btn-primary" onClick={sendNewStatus}>
                                    {loadingStatusNsButton ?
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
                <ReactTooltip anchorSelect=".tooltip_el" />
            </div>

        </>
    );
});

export default OrdersIndex;