import {useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {DASHBOARD_ROUTE, INDEX_CUSTOMER_DOMAIN_ROUTE, INDEX_CUSTOMER_SERVICES_ROUTE} from "../../../../utils/consts";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ContentHeader from "../../../../components/ContentHeader";
import {indexDomain, whoisDomain} from "../../../../http/domainAPI";
import {Context} from "../../../../index";
import DomainFormRu from "../../../../components/DomainFormRu";
import {observer} from "mobx-react-lite";

const CustomerDomainWhois = observer(() => {
    const navigate = useNavigate();
    const {domain} = useContext(Context);
    const [domains,setDomains] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [url, setUrl] = useState('');
    const [ns1, setNs1] = useState('');
    const [ns2, setNs2] = useState('');
    const [ns3, setNs3] = useState('');
    const [ns4, setNs4] = useState('');
    const [zone, setZone] = useState({});
    const [error, setError] = useState([]);
    const [showNS, setShowNS] = useState(false);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_CUSTOMER_DOMAIN_ROUTE, name: "Домены" },
        { name: "Заказ домена" },
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
/*
    useEffect(()=>{
        //
    }, [domain.domainForm]);
*/
    useEffect(()=>{
        domain.setDomainForm({...domain.domainForm, 'error': error});
    }, [error]);

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

    const validateRu = () => {
        let err = {};
        let formIsValid = true;
        if(domain.domainForm.familiaRu === "" || domain.domainForm.familiaRu === !/^[А-Я][а-я]*/) {
            err['familiaRu'] = 'Необходимо заполнить поле фамилия';
            formIsValid = false;
        }
        if(domain.domainForm.nameRu === "" || domain.domainForm.nameRu === !/^[А-Я][а-я]*/) {
            err['nameRu'] = 'Необходимо заполнить поле имя';
            formIsValid = false;
        }
        if(domain.domainForm.otchestvoRu === "" || domain.domainForm.otchestvoRu === !/^[А-Я][а-я]*/) {
            err['otchestvoRu'] = 'Необходимо заполнить поле отчество';
            formIsValid = false;
        }
        if(domain.domainForm.familiaEn === "" || domain.domainForm.familiaEn === !/^[A-Z][a-z]*/) {
            err['familiaEn'] = 'Необходимо заполнить поле фамилия латиницей';
            formIsValid = false;
        }
        if(domain.domainForm.nameEn === "" || domain.domainForm.nameEn === !/^[A-Z][a-z]*/) {
            err['nameEn'] = 'Необходимо заполнить поле имя латиницей';
            formIsValid = false;
        }
        if(domain.domainForm.otchestvoEn === "" || domain.domainForm.otchestvoEn === !/^[A-Z][a-z]*/) {
            err['otchestvoEn'] = 'Необходимо заполнить поле отчество латиницей';
            formIsValid = false;
        }
        if(domain.domainForm.email === "" || domain.domainForm.email === !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) {
            err['email'] = 'Необходимо заполнить поле электронная почта';
            formIsValid = false;
        }
        if(domain.domainForm.phone === "" || domain.domainForm.phone === !/\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}/) {
            err['phone'] = 'Необходимо заполнить поле номер телефона';
            formIsValid = false;
        }
        if(domain.domainForm.numPassport === "" || domain.domainForm.numPassport === !/\d{4}\s\d{6}/) {
            err['numPassport'] = 'Необходимо заполнить поле номер паспорта';
            formIsValid = false;
        }
        if(domain.domainForm.orgPassport === "" || domain.domainForm.orgPassport === !/^[а-яА-Яa-zA-Z0-9\s?!,.'Ёё]+$/) {
            err['orgPassport'] = 'Необходимо заполнить поле организация, выдавшая паспорт';
            formIsValid = false;
        }
        if(domain.domainForm.datePassport === "" || domain.domainForm.datePassport === !/\d{4}-\d{2}-\d{2}/) {
            err['datePassport'] = 'Необходимо заполнить поле дата выдачи паспорта';
            formIsValid = false;
        }
        if(domain.domainForm.dateBirthday === "" || domain.domainForm.dateBirthday === !/\d{4}-\d{2}-\d{2}/) {
            err['dateBirthday'] = 'Необходимо заполнить поле дата рождения';
            formIsValid = false;
        }
        if(domain.domainForm.codePassport === "" || domain.domainForm.codePassport === !/\d{3}-\d{3}/) {
            err['codePassport'] = 'Необходимо заполнить поле код подразделения';
            formIsValid = false;
        }
        if(domain.domainForm.addressCountry === "" || domain.domainForm.addressCountry === !/^[а-яА-Я0-9\s?!,.'Ёё]+$/) {
            err['addressCountry'] = 'Необходимо заполнить поле страна регистрации';
            formIsValid = false;
        }
        if(domain.domainForm.addressObl === "" || domain.domainForm.addressObl === !/^[а-яА-Я0-9\s?!,.'Ёё]+$/) {
            err['addressObl'] = 'Необходимо заполнить поле регион регистрации';
            formIsValid = false;
        }
        if(domain.domainForm.addressInd === "" || domain.domainForm.addressInd === !/^[а-яА-Я0-9\s?!,.'Ёё]+$/) {
            err['addressInd'] = 'Необходимо заполнить поле индекс регистрации';
            formIsValid = false;
        }
        if(domain.domainForm.addressCity === "" || domain.domainForm.addressCity === !/^[а-яА-Я0-9\s?!,.'Ёё]+$/) {
            err['addressCity'] = 'Необходимо заполнить поле город регистрации';
            formIsValid = false;
        }
        if(domain.domainForm.addressStr === "" || domain.domainForm.addressStr === !/^[а-яА-Я0-9\s?!,.'Ёё]+$/) {
            err['addressStr'] = 'Необходимо заполнить поле адрес регистрации';
            formIsValid = false;
        }

        setError(err);
        if(formIsValid) sendForm();

    };

    const sendForm = () => {
        setShowNS(true);
        console.log(domain.domainForm);
    }

    const domainReg = async () => {
        try{

        }
        catch (e){
            console.log(e.response);
        }
    }

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Заказ домена"/>
            <section className="content">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Проверка домена</h3>
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

                            {status === "Доступен" ?
                                <p>
                                    Стоимость регистрации домена на 1 год: {domains.filter(item => item.id === zone)[0].price}р., продления {domains.filter(item => item.id === zone)[0].price_extension}р.
                                </p>
                            :
                                <label>Проверьте доступность домена перед заказом.</label>
                            }
                        </div>
                    :
                        <div className="d-flex justify-content-center m-5">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden"></span>
                            </div>
                        </div>
                    }
                </div>

                {status === "Доступен" && !showNS ?
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
                    showNS
                    ?
                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title">Укажите NS для домена
                                    - {url + '.' + domains.filter(item => item.id === zone)[0].title ?? 'ru'}</h3>
                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse"
                                            title="Collapse">
                                        <i className="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <p>Укажите как минимум 1 NS для домена, либо не указывайте, в этом случае домен будет привязан на NS steplog.ru и вы сможете указать свои позднее.</p>
                                <div className="form-group">
                                    <input type="text" name="ns1" value={ns1}
                                           onChange={e => setNs1(e.target.value)}
                                           placeholder="ns1.steplog.ru"
                                           className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="ns2" value={ns2}
                                           onChange={e => setNs2(e.target.value)}
                                           placeholder="ns2.steplog.ru"
                                           className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="ns3" value={ns3}
                                           onChange={e => setNs3(e.target.value)}
                                           className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="ns4" value={ns4}
                                           onChange={e => setNs4(e.target.value)}
                                           className="form-control"/>
                                </div>
                            </div>
                        </div>
                        :
                    ''
                }
                <div className="row pb-3">
                    <div className="col-12">
                        {status === "Доступен"
                            ?
                            <Button onClick={() => {
                                setStatus('');
                            }} className="btn btn-secondary "
                                    variant="primary">
                                Отмена
                            </Button>
                            :
                            <Button onClick={() => {
                                navigate(DASHBOARD_ROUTE + '/' + INDEX_CUSTOMER_DOMAIN_ROUTE);
                            }} className="btn btn-secondary "
                                    variant="primary">
                                Назад
                            </Button>
                        }
                        <Button
                            onClick={status === "Доступен" && !showNS ? validateRu : showNS ? domainReg : click}
                            className="btn btn-primary float-right"
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
                            {status === "Доступен" && !showNS
                                ?
                                'Продолжить'
                                :
                                showNS
                                ?
                                    'Оплатить'
                                    :
                                'Проверить'
                            }
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
});

export default CustomerDomainWhois;