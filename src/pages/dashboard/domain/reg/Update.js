import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {DASHBOARD_ROUTE, INDEX_DOMAIN_REG_ROUTE} from "../../../../utils/consts";
import {editDomainReg, updateDomainReg} from "../../../../http/domainAPI";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ContentHeader from "../../../../components/ContentHeader";

const DomainRegUpdate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const {id} = useParams();
    const [loadingData, setLoadingData] = useState(true);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_DOMAIN_REG_ROUTE, name: "Список регистраторов" },
        { name: "Редактирование регистратора" },
    ];


    useEffect(()=>{
        void edit();
    },[]);

    const edit = async () => {
        let data;
        data = await editDomainReg(id);
        setTitle(data.domainReg.title);
        setUrl(data.domainReg.url);
        setLoadingData(false);
    };


    const click = async () => {
        try {
            setLoading(true);
            let data;
            data = await updateDomainReg(title, url, id);
            if(data.success) navigate(DASHBOARD_ROUTE + '/' + INDEX_DOMAIN_REG_ROUTE);
        } catch (e) {
            alert(e.response.message);
        }

    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Редактирование регистратора"/>
            <section className="content">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Характеристики</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    {!loadingData ?
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="inputTitle">Наименование регистратора</label>
                                <input type="text" id="inputTitle" name="title" value={title}
                                       onChange={e => setTitle(e.target.value)}
                                       className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputUrl">Адрес сайта</label>
                                <input type="text" id="inputUrl" name="url" value={url}
                                       onChange={e => setUrl(e.target.value)}
                                       className="form-control"/>
                            </div>
                        </div>
                        :
                        <div className="d-flex justify-content-center m-5">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden"></span>
                            </div>
                        </div>
                    }
                </div>
                <div className="row">
                    <div className="col-12">
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + INDEX_DOMAIN_REG_ROUTE);}} className="btn btn-secondary "
                                variant="primary">
                            Отменить
                        </Button>
                        <Button onClick={click} className="btn btn-primary float-right"
                                variant="primary">
                            {loading ?
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                :
                                ''
                            }
                            Обновить
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DomainRegUpdate;