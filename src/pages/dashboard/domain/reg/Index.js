import {
    CREATE_DOMAIN_REG_ROUTE,
    DASHBOARD_ROUTE, SHOW_DOMAIN_REG_ROUTE, SHOW_DOMAIN_ROUTE,
    UPDATE_DOMAIN_REG_ROUTE
} from "../../../../utils/consts";
import ContentHeader from "../../../../components/ContentHeader";
import React, {useContext, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Table from "react-bootstrap/Table";
import {Context} from "../../../../index";
import {deleteDomainReg, indexDomainReg} from "../../../../http/domainAPI";

const DomainRegIndex = observer(() => {
    const navigate = useNavigate();
    const {domain} = useContext(Context);
    const [domainRegs,setDomainRegs] = useState([]);
    const [deleteRegId,setDeleteRegId] = useState(null);
    const [loading,setLoading] = useState(true);

    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Список регистраторов" },
    ];

    useEffect(()=>{
        setLoading(true);
        indexDomainReg().then(data => {
            domain.setDomainReg(data.domainRegs);
            setDomainRegs(data.domainRegs);
        }).finally(()=>{
            setLoading(false);
        })
            .catch(err => console.log(err));
    },[]);

    useEffect(() => {
        //loading
    },[domainRegs, deleteRegId]);

    const click = async () => {
        try {
            setLoading(true);
            document.getElementById('close-button').click();
            let data;
            data = await deleteDomainReg(deleteRegId);
            if(data.success) {
                setDeleteRegId(null);
                indexDomainReg().then(data => {
                    domain.setDomainReg(data.domainRegs);
                    setDomainRegs(data.domainRegs);
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
            <ContentHeader hrefs={hrefs} name="Список регистраторов"/>
            <div className="content">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + CREATE_DOMAIN_REG_ROUTE);}} className="btn btn-primary"
                                variant="primary">
                            Добавить регистратора
                        </Button>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Список регистраторов</h3>
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
                                <th width={'20%'}>Регистратор</th>
                                <th width={'20%'}>Адрес сайта</th>
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
                            {domainRegs && domainRegs.map(domainReg => (
                                <tr key={domainReg.id}>
                                    <td className="align-middle">{domainReg.id}</td>
                                    <td className="align-middle">{domainReg.title}</td>
                                    <td className="align-middle">{domainReg.url}</td>
                                    <td className="project-actions text-right">
                                        <Button className="btn btn-primary btn-sm m-1"
                                                onClick={() => {navigate(DASHBOARD_ROUTE + '/' + SHOW_DOMAIN_REG_ROUTE + '/' + domainReg.id);}}
                                        >
                                            <i className="fas fa-folder m-1">
                                            </i>
                                            детали
                                        </Button>
                                        <Button className="btn btn-info btn-sm m-1"
                                                onClick={() => {navigate(DASHBOARD_ROUTE + '/' + UPDATE_DOMAIN_REG_ROUTE + '/' + domainReg.id);}}
                                        >
                                            <i className="fas fa-pencil-alt m-1">
                                            </i>
                                            ред.
                                        </Button>
                                        <button type="button"
                                                onClick={() => {setDeleteRegId(domainReg.id);}}
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
                            <h4 className="modal-title">Удаление регистратора</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Вы действительно хотите удалить регистратора <b>{deleteRegId && domainRegs.filter(domain => domain.id === deleteRegId).map(item => item.title)}</b>?</p>
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
});

export default DomainRegIndex;