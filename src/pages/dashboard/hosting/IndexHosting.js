import {observer} from "mobx-react-lite";
import Nav from "react-bootstrap/Nav";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {indexHosting} from "../../../http/hostingAPI";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {CREATE_HOSTING_ROUTE, DASHBOARD_ROUTE, UPDATE_HOSTING_ROUTE} from "../../../utils/consts";


const IndexHosting = observer(() => {
    const navigate = useNavigate();
    const {hosting} = useContext(Context);
    const [hostings,setHostings] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);
        indexHosting().then(data => {
            hosting.setHosting(data.hostings);
            setHostings(data.hostings);
        }).finally(()=>{
            setLoading(false);
        })
            .catch(err => console.log(err));
    },[]);

    useEffect(() => {
        //loading
    },[hostings]);

    return(
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 mt-1">Список хостинг тарифов</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Nav.Link onClick={() => {navigate('/dashboard');}} className="nav-link">Главная</Nav.Link></li>
                                <li className="breadcrumb-item active nav-link">Список хостинг тарифов</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <div className="row mb-2">
                <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + CREATE_HOSTING_ROUTE);}} className="btn btn-primary"
                        variant="primary">
                    Создать новый тариф
                </Button>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Список хостинг тарифов</h3>
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
                        <Table striped hover>
                            <thead>
                            <tr>
                                <th width={'10%'}>#</th>
                                <th width={'30%'}>Название</th>
                                <th width={'20%'}>Стоимость</th>
                                <th width={'10%'}>Доступность</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {loading ?
                                <tr>
                                    <td colSpan={4}>
                                        <div className="d-flex justify-content-center">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden"></span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                : ''}
                            {hostings && hostings.map(hosting => (
                                <tr key={hosting.id}>
                                    <td className="align-middle">{hosting.id}</td>
                                    <td className="align-middle">{hosting.title}</td>
                                    <td className="align-middle">{hosting.price}р.</td>
                                    <td className="align-middle text-center"><input type="checkbox" checked={hosting.is_stored} disabled/></td>
                                    <td className="project-actions text-right">
                                        <a className="btn btn-primary btn-sm m-1" href="#">
                                            <i className="fas fa-folder m-1">
                                            </i>
                                            смотр.
                                        </a>
                                        <Button className="btn btn-info btn-sm m-1"
                                                onClick={() => {navigate(DASHBOARD_ROUTE + '/' + UPDATE_HOSTING_ROUTE + '/' + hosting.id);}}>
                                            <i className="fas fa-pencil-alt m-1">
                                            </i>
                                            ред.
                                        </Button>
                                        <a className="btn btn-danger btn-sm m-1" href="#">
                                            <i className="fas fa-trash m-1">
                                            </i>
                                            Удалить
                                        </a>
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

export default IndexHosting;