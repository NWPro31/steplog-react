import ContentHeader from "../../../../components/ContentHeader";
import React, {useContext, useEffect, useState} from "react";
import {
    CREATE_CUSTOMER_SERVICES_ROUTE,
    CREATE_SERVICES_ROUTE,
    DASHBOARD_ROUTE,
    UPDATE_SERVICES_ROUTE
} from "../../../../utils/consts";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {Context} from "../../../../index";
import {deleteService, indexService} from "../../../../http/serviceAPI";
import {useNavigate} from "react-router-dom";

const CustomerServicesIndex = () => {
    const navigate = useNavigate();
    const {service} = useContext(Context);
    const [services,setServices] = useState([]);
    const [loading,setLoading] = useState(true);
    const [deleteId,setDeleteId] = useState(null);

    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Обслуживание сайта" },
    ];

    useEffect(()=>{
        setLoading(true);
        indexService().then(data => {
            service.setService(data.services);
            setServices(data.services);
        }).finally(()=>{
            setLoading(false);
        })
            .catch(err => console.log(err));
    },[]);

    useEffect(() => {
        //loading
    },[services]);

    const click = async () => {
        try {
            setLoading(true);
            document.getElementById('close-button').click();
            let data;
            data = await deleteService(deleteId);
            if(data.success) {
                setDeleteId(null);
                indexService().then(data => {
                    service.setService(data.services);
                    setServices(data.services);
                }).finally(()=>{
                    setLoading(false);
                })
                    .catch(err => console.log(err));
            }
        } catch (e) {
            alert(e);
        }

    };

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
                    <div className="card-body p-0">
                        <Table striped>
                            <thead>
                            <tr>
                                <th width={'10%'}>#</th>
                                <th width={'20%'}>Услуга</th>
                                <th width={'10%'}>Сайт</th>
                                <th width={'10%'}>Стоимость</th>
                                <th width={'20%'}>Продолжительность работ</th>
                                <th width={'10%'}>Состояние</th>
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
                            {services && services.map(service => (
                                <tr key={service.id}>
                                    <td className="align-middle">{service.id}</td>
                                    <td className="align-middle">{service.title}</td>
                                    <td className="align-middle">{service.price}р.</td>
                                    <td className="align-middle">{service.price_min}р.</td>
                                    <td className="align-middle">{service.duration_work}</td>
                                    <td className="align-middle text-center"><input type="checkbox" checked={service.is_stored} disabled/></td>
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
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Список доступных услуг</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                            <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <Table striped>
                            <thead>
                            <tr>
                                <th width={'10%'}>#</th>
                                <th width={'15%'}>Название</th>
                                <th width={'10%'}>Стоимость</th>
                                <th width={'10%'}>Минимальная стоимость</th>
                                <th width={'10%'}>Продолжительность работ</th>
                                <th width={'10%'}>Доступность</th>
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
                            {services && services.map(service => (
                                <tr key={service.id}>
                                    <td className="align-middle">{service.id}</td>
                                    <td className="align-middle">{service.title}</td>
                                    <td className="align-middle">{service.price}р.</td>
                                    <td className="align-middle">{service.price_min}р.</td>
                                    <td className="align-middle">{service.duration_work}</td>
                                    <td className="align-middle text-center"><input type="checkbox" checked={service.is_stored} disabled/></td>
                                    <td className="project-actions text-right">
                                        <Button className="btn btn-primary btn-sm m-1"
                                        >
                                            <i className="fas fa-folder m-1">
                                            </i>
                                            детали
                                        </Button>
                                        <Button className="btn btn-info btn-sm m-1"
                                                onClick={() => {navigate(DASHBOARD_ROUTE + '/' + UPDATE_SERVICES_ROUTE + '/' + service.id);}}>
                                            <i className="fas fa-pencil-alt m-1">
                                            </i>
                                            ред.
                                        </Button>
                                        <button type="button"
                                                onClick={() => {setDeleteId(service.id);}}
                                                className="btn btn-danger btn-sm m-1"
                                                data-toggle="modal"
                                                data-target="#modal-default">
                                            <i className="fas fa-trash m-1">
                                            </i>
                                            Удалить
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modal-default">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Удаление услуги</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Вы действительно хотите удалить услугу <b>{deleteId && services.filter(serv => serv.id === deleteId).map(item => item.title)}</b>?</p>
                        </div>
                        <div className="modal-footer justify-content-between">
                            <button type="button" id="close-button" className="btn btn-default" data-dismiss="modal">Отмена</button>
                            <button type="button" className="btn btn-danger" onClick={click}>Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerServicesIndex;