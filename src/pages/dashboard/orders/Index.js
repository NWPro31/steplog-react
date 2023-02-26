import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {
    DASHBOARD_ROUTE, SHOW_ORDERS_ROUTE
} from "../../../utils/consts";
import ContentHeader from "../../../components/ContentHeader";
import {indexOrderService} from "../../../http/serviceAPI";
import moment from "moment";
import 'moment/locale/ru';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import {useNavigate} from "react-router-dom";


const OrdersIndex = observer(() => {
    const navigate = useNavigate();
    const {service} = useContext(Context);
    const [orderServices,setOrderServices] = useState([]);
    const [loading,setLoading] = useState(true);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Список заказов" },
    ];

    useEffect(()=>{
        setLoading(true);
        indexOrderService().then(data => {
            service.setOrderService(data.order_services);
            setOrderServices(data.order_services);
        }).finally(()=>{
            setLoading(false);
        })
            .catch(err => console.log(err));
    },[]);

    useEffect(() => {
        //loading
    },[orderServices]);

    const timeRule = (time) => {
        return moment(time).locale('ru').fromNow()
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
                            <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                <i className="fas fa-times"></i>
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
                            {loading ?
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
                            {orderServices.length ===0 && !loading && (
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
                            {orderServices && orderServices.map(service => (
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
                    <ReactTooltip anchorSelect=".tooltip_el" />
                </div>
            </div>

        </>
    );
});

export default OrdersIndex;