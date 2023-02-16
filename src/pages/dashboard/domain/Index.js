import {
    CREATE_DOMAIN_ROUTE,
    DASHBOARD_ROUTE,
    SHOW_HOSTING_ROUTE,
    UPDATE_HOSTING_ROUTE
} from "../../../utils/consts";
import ContentHeader from "../../../components/ContentHeader";
import React, {useContext, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import Table from "react-bootstrap/Table";
import {Context} from "../../../index";
import {indexDomain} from "../../../http/domainAPI";
import {observer} from "mobx-react-lite";

const DomainIndex = observer(() => {
    const navigate = useNavigate();
    const {domain} = useContext(Context);
    const [domains,setDomains] = useState([]);
    const [loading,setLoading] = useState(true);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Список тарифов" },
    ];

    useEffect(()=>{
        setLoading(true);
        indexDomain().then(data => {
            domain.setDomain(data.domains);
            setDomains(data.domains);
        }).finally(()=>{
            setLoading(false);
        })
            .catch(err => console.log(err));
    },[]);

    useEffect(() => {
        //loading
    },[domains]);

    return (
        <>
            <ContentHeader hrefs={hrefs} name="Список тарифов"/>
            <div className="content">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + CREATE_DOMAIN_ROUTE);}} className="btn btn-primary"
                                variant="primary">
                            Создать новый тариф
                        </Button>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Список тарифов</h3>
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
                                <th width={'20%'}>Название</th>
                                <th width={'10%'}>Стоимость</th>
                                <th width={'10%'}>Продление</th>
                                <th width={'10%'}>Период</th>
                                <th width={'10%'}>Доступность</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {loading ?
                                <tr>
                                    <td colSpan={7}>
                                        <div className="d-flex justify-content-center">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden"></span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                : ''}
                            {domains && domains.map(domain => (
                                <tr key={domain.id}>
                                    <td className="align-middle">{domain.id}</td>
                                    <td className="align-middle">{domain.title}</td>
                                    <td className="align-middle">{domain.price}р.</td>
                                    <td className="align-middle">{domain.price_extension}р.</td>
                                    <td className="align-middle">{domain.period}</td>
                                    <td className="align-middle text-center"><input type="checkbox" checked={domain.is_stored} disabled/></td>
                                    <td className="project-actions text-right">
                                        <Button className="btn btn-primary btn-sm m-1"
                                                >
                                            <i className="fas fa-folder m-1">
                                            </i>
                                            детали
                                        </Button>
                                        <Button className="btn btn-info btn-sm m-1"
                                                >
                                            <i className="fas fa-pencil-alt m-1">
                                            </i>
                                            ред.
                                        </Button>
                                        <button type="button"
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
        </>
    );
});

export default DomainIndex;