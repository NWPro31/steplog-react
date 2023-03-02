import {useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {DASHBOARD_ROUTE, INDEX_CUSTOMER_DOMAIN_ROUTE, INDEX_CUSTOMER_SERVICES_ROUTE} from "../../../../utils/consts";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ContentHeader from "../../../../components/ContentHeader";
import {indexDomain, whoisDomain} from "../../../../http/domainAPI";
import {Context} from "../../../../index";
import DomainFormRu from "../../../../components/DomainFormRu";

const CustomerDomainWhois = () => {
    const navigate = useNavigate();
    const {domain} = useContext(Context);
    const [domains,setDomains] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [url, setUrl] = useState('');
    const [zone, setZone] = useState(0);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_CUSTOMER_DOMAIN_ROUTE, name: "Домены" },
        { name: "Проверить адрес домена" },
    ];

    useEffect(()=>{
        setLoading(true);
        indexDomain().then(data => {
            domain.setDomain(data.domains);
            setDomains(data.domains);
        }).finally(()=>{
            setZone(domain.domain.filter(item => item.is_stored)[0].id ?? 0);
            setLoading(false);
        })
            .catch(err => console.log(err));
    },[]);


    const click = async () => {
        try {
            setLoading(true);
            let site;
            site = url.match(/^./)  ? url.split('.')[0] : url;
            setUrl(site);
            let data;
            data = await whoisDomain(site + '.' + domain.domain.filter(item => item.id === zone)[0].title ?? 'ru');
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

                    {!loading ?
                        <div className="card-body">
                            <label htmlFor="inputUrl">Адрес домена</label>
                            <div className="input-group input-group-lg">
                                <input type="text" id="inputUrl" name="url" value={url}
                                       onChange={e => {
                                           setUrl(e.target.value);
                                           setStatus('');
                                       }}
                                       className="form-control"/>
                                <div className="input-group-append">
                                    <select className="input-group-text"
                                            onChange={e => {
                                                setZone(Number(e.target.value));
                                                setStatus('');
                                            }}
                                            name="zone"
                                    >
                                        {domains && domains.filter(item => item.is_stored).map(zones => (
                                            <option key={zones.id} value={zones.id}>.{zones.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {status === "Доступен" ? <div className="alert alert-success mt-3"><b>{url + '.' + domains.filter(item => item.id === zone)[0].title ?? 'ru'}</b>: {status}</div> : null}
                            {status === "Не доступен" ?
                                <div className="alert alert-danger mt-3"><b>{url + '.' + domains.filter(item => item.id === zone)[0].title ?? 'ru'}: {status}</b></div> : null}
                            <label>Проверьте доступность домена перед заказом.</label>
                        </div>
                    :
                        <div className="d-flex justify-content-center m-5">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden"></span>
                            </div>
                        </div>
                    }
                </div>
                <div className="row pb-3">
                    <div className="col-12">
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + INDEX_CUSTOMER_DOMAIN_ROUTE);}} className="btn btn-secondary "
                                variant="primary">
                            Назад
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
                {status === "Доступен" ?
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Зарегистрировать домен
                                - {url + '.' + domains.filter(item => item.id === zone)[0].title ?? 'ru'}</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse"
                                        title="Collapse">
                                    <i className="fas fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <p>Заполните все поля для регистрации.</p>
                            <DomainFormRu/>
                        </div>
                    </div>
                    :
                    ''
                }
            </section>
        </>
    );
};

export default CustomerDomainWhois;