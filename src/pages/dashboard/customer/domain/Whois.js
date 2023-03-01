import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {DASHBOARD_ROUTE, INDEX_CUSTOMER_DOMAIN_ROUTE, INDEX_CUSTOMER_SERVICES_ROUTE} from "../../../../utils/consts";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ContentHeader from "../../../../components/ContentHeader";
import {whoisDomain} from "../../../../http/domainAPI";

const CustomerDomainWhois = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [url, setUrl] = useState('');
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_CUSTOMER_DOMAIN_ROUTE, name: "Домены" },
        { name: "Проверить адрес домена" },
    ];

    useEffect(()=>{

    },[]);


    const click = async () => {
        try {
            setLoading(true);
            let data;
            data = await whoisDomain(url);
            console.log(data);
            if(data) {
                setLoading(false);
                data.available === "yes" ? setStatus("Доступен") : setStatus("Не доступен");
            }
        } catch (e) {
            alert(e.response.data.message);
        }

    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Проверить адрес домена"/>
            <section className="content">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Информация о домене</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="inputUrl">Адрес домена</label>
                            <input type="text" id="inputUrl" name="url" value={url}
                                   onChange={e => {
                                       setUrl(e.target.value);
                                       setStatus('');
                                   }}
                                   className="form-control"/>
                        </div>
                        {status === "Доступен" ? <div className="alert alert-success">{url}: {status}</div> : null}
                        {status === "Не доступен" ? <div className="alert alert-danger">{url}: {status}</div> : null}
                        <label>Проверьте доступность домена перед заказом.</label>
                    </div>
                </div>
                <div className="row pb-3">
                    <div className="col-12">
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + INDEX_CUSTOMER_DOMAIN_ROUTE);}} className="btn btn-secondary "
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
                            Проверить
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CustomerDomainWhois;