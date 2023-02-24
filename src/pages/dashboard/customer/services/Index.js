import ContentHeader from "../../../../components/ContentHeader";
import React, {useContext, useEffect, useState} from "react";
import {
    CREATE_CUSTOMER_SERVICES_ROUTE,
    DASHBOARD_ROUTE
} from "../../../../utils/consts";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {Context} from "../../../../index";
import {indexOrderService} from "../../../../http/serviceAPI";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import 'moment/locale/ru';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'


const CustomerServicesIndex = () => {
    const navigate = useNavigate();
    const {service} = useContext(Context);
    const [orderServices,setOrderServices] = useState([]);
    const [loading,setLoading] = useState(true);

    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Обслуживание сайта" },
    ];

    useEffect(()=>{
        setLoading(true);
        indexOrderService().then(data => {
            service.setOrderService(data.order_services);
            setOrderServices(data.order_services);
        }).finally(()=>{
            setLoading(false);
        }).catch(err => console.log(err));

    },[]);

    useEffect(() => {
        //loading
    },[orderServices]);


    return (
        <>
            <ContentHeader hrefs={hrefs} name="Обслуживание сайта"/>
            <div className="content">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + CREATE_CUSTOMER_SERVICES_ROUTE);}} className="btn btn-primary"
                                variant="primary">
                            Заказать обслуживание сайта
                        </Button>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Список ваших заказов</h3>
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
                            {orderServices && orderServices.map(service => (
                                <tr key={service.id}>
                                    <td className="align-middle">{service.id}</td>
                                    <td className="align-middle">{service.service.title}</td>
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
                                        data-tooltip-content={service.status.title + " " + moment(service.status.created_at).locale('ru').fromNow()}
                                    >{service.status.title}</td>
                                    <td className="project-actions text-right">
                                        <Button className="btn btn-primary btn-sm m-1"
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
            </div>
            <ReactTooltip anchorSelect=".tooltip_el" />
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Ответы на вопросы</h3>
                    </div>
                    <div className="card-body">
                        <div id="accordion">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title w-100">
                                        <a className="d-block w-100" data-toggle="collapse" href="#collapseOne">
                                            Процесс заказа
                                        </a>
                                    </h4>
                                </div>
                                <div id="collapseOne" className="collapse show" data-parent="#accordion">
                                    <div className="card-body">
                                        <p>
                                            Нажмите на кнопку <b>Заказать обслуживание сайта</b>,
                                            укажите адрес сайта, выберите требуемую услугу из списка.
                                            При необходимости заполните пожелания и укажите данные для
                                            доступа к сайту.
                                        </p>
                                        <p>
                                            Спустя некоторое время мы обработаем Ваш заказ, в графе стоимость
                                            отобразится цена выполнения заказа.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h4 className="card-title w-100">
                                        <a className="d-block w-100" data-toggle="collapse" href="#collapseTwo">
                                            Оплата заказа
                                        </a>
                                    </h4>
                                </div>
                                <div id="collapseTwo" className="collapse show" data-parent="#accordion">
                                    <div className="card-body">
                                        <p>
                                            Оплата заказа производится после согласования выполнения работ.
                                        </p>
                                        <p>
                                            В некоторых случаях может потребоваться частичная или полная предоплата.
                                        </p>
                                        <p>
                                            В зависимости от сложности заказа, стоимость может меняться.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerServicesIndex;