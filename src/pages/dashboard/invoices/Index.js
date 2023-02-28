import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {
    DASHBOARD_ROUTE, SHOW_ORDERS_ROUTE, UPDATE_HOSTING_ROUTE, UPDATE_INVOICES_ROUTE
} from "../../../utils/consts";
import ContentHeader from "../../../components/ContentHeader";
import {useNavigate} from "react-router-dom";
import {indexInvoice} from "../../../http/invoiceAPI";


const InvoicesIndex = observer(() => {
    const navigate = useNavigate();
    const {invoice} = useContext(Context);
    const [loading,setLoading] = useState(true);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Платежи" },
    ];

    useEffect(()=>{
        setLoading(true);
        indexInvoice().then(data => {
            invoice.setInvoice(data.invoices);
        }).finally(()=>{
            setLoading(false);
        })
            .catch(err => console.log(err));
    },[]);

    useEffect(() => {
        //loading
    },[invoice.invoice]);

    const formatDate = (date) => {
        return new Date(date).toLocaleString('ru', {
            day:   '2-digit',
            month: '2-digit',
            year:  'numeric'
        });
    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Платежи"/>
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Платежи</h3>
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
                                <th width={'25%'}>Назначение</th>
                                <th width={'10%'} className="text-center">Дата</th>
                                <th width={'10%'} className="text-center">Сумма</th>
                                <th width={'10%'} className="text-center">Категория</th>
                                <th width={'12%'} className="text-center">Статус</th>
                                <th width={'12%'} className="text-center">Метод оплаты</th>
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
                            {invoice.invoice.length ===0 && !loading && (
                                <tr>
                                    <td colSpan={8}>
                                        <div className="d-flex justify-content-center">
                                            <div>
                                                <h3>У Вас пока нет платежей</h3>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {invoice.invoice.length > 0 && invoice.invoice.map(item => (
                                <tr key={item.id}>
                                    <td className="align-middle">{item.id}</td>
                                    <td className="align-middle">{item.title}</td>
                                    <td className="align-middle text-center tooltip_el">{formatDate(item.created_at)}</td>
                                    <td className="align-middle text-center">{item.amount}р.</td>
                                    <td className="align-middle text-center tooltip_el">
                                        {item.service_order_id ? 'Обслуживаение сайта' : ''}
                                        {item.domain_order_id ? 'Домен' : ''}
                                        {item.hosting_order_id ? 'Хостинг' : ''}
                                    </td>
                                    <td className={`align-middle text-center 
                                    ${item.status && item.status.id === 1 ? 'text-warning' : ''}
                                    ${item.status && item.status.id === 3 ? 'text-success' : ''}
                                    ${item.status && item.status.id === 2 ? 'text-info' : ''}
                                    ${item.status && item.status.id === 4 ? 'text-danger' : ''}`}>{item.status && item.status.title ? item.status.title : 'не известен'}</td>
                                    <td className="align-middle text-center project-actions">
                                        {item.status && item.status.id === 1 ?
                                            <Button className="btn btn-primary btn-sm m-1"
                                                    onClick={() => {
                                                        navigate(DASHBOARD_ROUTE + '/' + SHOW_ORDERS_ROUTE + '/' + service.id);
                                                    }}
                                            >
                                                <i className="fas fa-folder m-1">
                                                </i>
                                                выбрать
                                            </Button>
                                            :
                                            ''
                                        }
                                        {item.status && item.status.id === 3 ? 'Банковский перевод' : ''}
                                    </td>
                                    <td className="align-middle project-actions text-right">
                                        <Button className="btn btn-info btn-sm m-1"
                                                onClick={() => {navigate(DASHBOARD_ROUTE + '/' + UPDATE_INVOICES_ROUTE + '/' + item.id);}}>
                                            <i className="fas fa-pencil-alt m-1">
                                            </i>
                                            ред.
                                        </Button>
                                    </td>
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

export default InvoicesIndex;