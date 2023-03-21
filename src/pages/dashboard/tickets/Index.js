import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {
    CREATE_HOSTING_ROUTE,
    CREATE_TICKETS_ROUTE,
    DASHBOARD_ROUTE,
    SELECT_INVOICES_ROUTE,
    SHOW_ORDERS_ROUTE,
    SHOW_TICKETS_ROUTE,
    UPDATE_HOSTING_ROUTE,
    UPDATE_INVOICES_ROUTE
} from "../../../utils/consts";
import ContentHeader from "../../../components/ContentHeader";
import {useNavigate} from "react-router-dom";
import {indexTicket} from "../../../http/ticketAPI";
import moment from "moment";
import 'moment/locale/ru';


const TicketsIndex = observer(() => {
    const navigate = useNavigate();
    const {ticket} = useContext(Context);
    const {user} = useContext(Context);
    const [loading,setLoading] = useState(true);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Поддержка" },
    ];

    useEffect(()=>{
        setLoading(true);
        indexTicket().then(data => {
            ticket.setTicket(data.tickets);
        }).finally(()=>{
            setLoading(false);
        })
            .catch(err => console.log(err));
    },[]);

    useEffect(() => {
        //loading
    },[ticket.ticket]);

    const formatDate = (date) => {
        return new Date(date).toLocaleString('ru', {
            day:   '2-digit',
            month: '2-digit',
            year:  'numeric'
        });
    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Поддержка"/>
            <div className="content">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + CREATE_TICKETS_ROUTE);}} className="btn btn-primary"
                                variant="primary">
                            Написать в поддержку
                        </Button>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Обращения в поддержку</h3>
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
                                <th width={'25%'}>Тема</th>
                                <th width={'15%'} className="text-center">Категория</th>
                                <th width={'15%'} className="text-center">Заказ</th>
                                <th width={'15%'} className="text-center">Последнее сообщение</th>
                                <th></th>
                                {user.user.user.role === 'admin' ?
                                    <th></th>
                                    :
                                    ''
                                }
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
                            {ticket.ticket.length ===0 && !loading && (
                                <tr>
                                    <td colSpan={8}>
                                        <div className="d-flex justify-content-center">
                                            <div>
                                                <h3>У Вас пока нет обращений</h3>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {ticket.ticket.length > 0 && ticket.ticket.slice(0).reverse().map(item => (
                                <tr key={item.id}>
                                    <td className="align-middle">{item.id}</td>
                                    <td className="align-middle">{item.title}</td>
                                    <td className="align-middle text-center">
                                        {item.service_order_id !== null ? 'Обслуживание сайта' : item.domain_order_id !== null ? 'Домены' : item.hosting_order_id !== null ? 'Хостинг' : 'Общие вопросы'}
                                    </td>
                                    <td className="align-middle text-center">
                                        {item.order ? item.order.url : ''}
                                    </td>
                                    <td className="align-middle text-center">
                                        {item.last_message ? moment(item.last_message.updated_at).locale('ru').fromNow() : ''}
                                    </td>
                                    <td className="align-middle project-actions text-right">
                                        <Button className="btn btn-primary btn-sm m-1"
                                                onClick={() => {
                                                    navigate(DASHBOARD_ROUTE + '/' + SHOW_TICKETS_ROUTE + '/' + item.id);
                                                }}>
                                            <i className="fas fa-pencil-alt m-1">
                                            </i>
                                            открыть
                                        </Button>
                                    </td>
                                    {user.user.user.role === 'admin' ?
                                    <td className="align-middle project-actions text-right">
                                            <Button className="btn btn-info btn-sm m-1"
                                                    onClick={() => {
                                                        navigate(DASHBOARD_ROUTE + '/' + UPDATE_INVOICES_ROUTE + '/' + item.id);
                                                    }}>
                                                <i className="fas fa-pencil-alt m-1">
                                                </i>
                                                ред.
                                            </Button>
                                    </td>
                                    :
                                        ''
                                    }
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>

        </>
    );
});

export default TicketsIndex;