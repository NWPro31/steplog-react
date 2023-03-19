import ContentHeader from "../../../../components/ContentHeader";
import React, {useContext, useEffect, useState} from "react";
import {
    CREATE_CUSTOMER_HOSTING_ROUTE,
    DASHBOARD_ROUTE, SHOW_CUSTOMER_SERVICES_ROUTE, WHOIS_CUSTOMER_DOMAIN_ROUTE
} from "../../../../utils/consts";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {Context} from "../../../../index";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import 'moment/locale/ru';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import {indexOrderHosting} from "../../../../http/hostingAPI";


const CustomerHostingIndex = () => {
    const navigate = useNavigate();
    const {domain} = useContext(Context);
    const {hosting} = useContext(Context);
    const [orderDomains,setOrderDomains] = useState([]);
    const [orderHostings,setOrderHostings] = useState([]);
    const [loading,setLoading] = useState(true);

    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Хостинг" },
    ];

    useEffect(()=>{
        setLoading(true);
        indexOrderHosting().then(data => {
            hosting.setOrderHosting(data.order_hostings);
            setOrderHostings(data.order_hostings);
        }).finally(()=>{
            setLoading(false);
        }).catch(err => console.log(err));
    },[]);

    useEffect(() => {
        //loading
    },[orderHostings]);

    const timeRule = (time) => {
        return moment(time).locale('ru').fromNow()
    }

    return (
        <>
            <ContentHeader hrefs={hrefs} name="Хостинг"/>
            <div className="content">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + CREATE_CUSTOMER_HOSTING_ROUTE);}} className="btn btn-primary"
                                variant="primary">
                            Заказать хостинг
                        </Button>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Список ваших хостинг аккаунтов</h3>
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
                                <th width={'15%'}>Имя</th>
                                <th width={'20%'} className="text-center">Тариф</th>
                                <th width={'15%'} className="text-center">Состояние</th>
                                <th width={'10%'} className="text-center">Стоимость в месяц</th>
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
                            {orderHostings.length ===0 && !loading && (
                                <tr>
                                    <td colSpan={8}>
                                        <div className="d-flex justify-content-center">
                                            <div>
                                                <h3>У Вас пока нет хостинг аккаунтов</h3>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {orderHostings && orderHostings.map(hosting => (
                                <tr key={hosting.id}>
                                    <td className="align-middle">{hosting.id}</td>
                                    <td className="align-middle">{hosting.name}</td>
                                    <td className="align-middle text-center">
                                        {hosting.hosting.title}
                                    </td>
                                    <td className="align-middle text-center">{hosting.status.title}</td>
                                    <td className="align-middle text-center">{hosting.price}р.</td>
                                    <td className="project-actions text-right">
                                        <Button className="btn btn-primary btn-sm m-1"
                                                onClick={() => {
                                                    navigate(DASHBOARD_ROUTE + '/' + SHOW_CUSTOMER_SERVICES_ROUTE + '/' + service.id);
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
            </div>
            <ReactTooltip anchorSelect=".tooltip_el" />
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Ответы на вопросы</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div id="accordion">
                            <div className="card card-info">
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
                            <div className="card card-info">
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

export default CustomerHostingIndex;