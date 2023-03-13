import ContentHeader from "../../../../components/ContentHeader";
import React, {useContext, useEffect, useState} from "react";
import {
    DASHBOARD_ROUTE, SHOW_CUSTOMER_SERVICES_ROUTE, WHOIS_CUSTOMER_DOMAIN_ROUTE
} from "../../../../utils/consts";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {Context} from "../../../../index";
import {indexOrderDomain} from "../../../../http/domainAPI";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import 'moment/locale/ru';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'


const CustomerDomainIndex = () => {
    const navigate = useNavigate();
    const {domain} = useContext(Context);
    const [orderDomains,setOrderDomains] = useState([]);
    const [loading,setLoading] = useState(true);

    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Домены" },
    ];

    useEffect(()=>{
        setLoading(true);
        indexOrderDomain().then(data => {
            domain.setOrderDomain(data.order_domains);
            setOrderDomains(data.order_domains);
        }).finally(()=>{
            setLoading(false);
        }).catch(err => console.log(err));
    },[]);

    useEffect(() => {
        //loading
    },[orderDomains]);

    const timeRule = (time) => {
        return moment(time).locale('ru').fromNow()
    }

    return (
        <>
            <ContentHeader hrefs={hrefs} name="Домены"/>
            <div className="content">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + WHOIS_CUSTOMER_DOMAIN_ROUTE);}} className="btn btn-primary"
                                variant="primary">
                            Заказать домен
                        </Button>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Список ваших доменов</h3>
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
                                <th width={'25%'}>Домен</th>
                                <th width={'10%'} className="text-center">НС</th>
                                <th width={'10%'} className="text-center">Регистрация до</th>
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
                            {orderDomains.length ===0 && !loading && (
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
                            {orderDomains && orderDomains.map(domain => (
                                <tr key={domain.id}>
                                    <td className="align-middle">{domain.id}</td>
                                    <td className="align-middle">{domain.url}</td>
                                    <td className="align-middle">
                                        {domain.ns && domain.ns.map(item => (
                                            <div key={item.id}>
                                                {item.ns}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="align-middle"></td>
                                    <td className="align-middle"></td>
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

export default CustomerDomainIndex;