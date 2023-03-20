import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {
    CREATE_HOSTING_ROUTE, CREATE_TICKETS_ROUTE,
    DASHBOARD_ROUTE, SELECT_INVOICES_ROUTE, SHOW_ORDERS_ROUTE, UPDATE_HOSTING_ROUTE, UPDATE_INVOICES_ROUTE
} from "../../../utils/consts";
import ContentHeader from "../../../components/ContentHeader";
import {useNavigate} from "react-router-dom";
import {indexInvoice} from "../../../http/invoiceAPI";
import {indexTicket} from "../../../http/ticketAPI";


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