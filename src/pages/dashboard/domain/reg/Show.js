import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../../index";
import ContentHeader from "../../../../components/ContentHeader";
import {DASHBOARD_ROUTE, INDEX_DOMAIN_REG_ROUTE} from "../../../../utils/consts";
import {indexDomain} from "../../../../http/domainAPI";


const DomainRegShow = observer(() => {
    const {id} = useParams();
    const {domain} = useContext(Context);
    const [title, setTitle] = useState('');
    const [url,setUrl] = useState('');
    const [loadingData, setLoadingData] = useState(false);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_DOMAIN_REG_ROUTE, name: "Список регистраторов" },
        { name: "Детали регистратора" },
    ];
    const show = async () => {
        indexDomain().then(data => {
            domain.setDomainReg(data.domainRegs);
        }).finally(()=>{
            setLoadingData(false);
        }).catch(err => console.log(err));
    };
    useEffect(()=>{
        if(typeof domain.domainReg === 'object' && !Array.isArray(domain.domainReg)){
            setLoadingData(true);
            void show();
        }
    },[id]);

    useEffect(()=>{
        if(domain.domainReg.length > 0) {
            let dom = domain.domainReg.filter(dom => dom.id === Number(id)).map(item => item)[0];
            setTitle(dom.title);
            setUrl(dom.url);
        }
    },[domain.domainReg]);

    return (
        <>
            <ContentHeader hrefs={hrefs} name="Детали регистратора"/>
            <section className="content">
                {!loadingData ?
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Детали регистратора - {title}</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse"
                                        title="Collapse">
                                    <i className="fas fa-minus"></i>
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="post">
                                                <p>
                                                    Наименование регистратора
                                                </p>
                                                <p>
                                                    {title}
                                                </p>
                                            </div>
                                            <div className="post">
                                                <p>
                                                    Адрес сайта регистратора
                                                </p>
                                                <p>
                                                    {url}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                                    <h3 className="text-primary"><i className="fas fa-paint-brush"></i> {title}</h3>
                                    <div className="text-muted">
                                        <p className="text-sm">Клиентов у регистратора
                                            <b className="d-block">25</b>
                                        </p>
                                    </div>
                                    <div className="text-center mt-5 mb-3">
                                        <a href="#" className="btn btn-sm btn-primary">Редактировать регистратора</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="d-flex justify-content-center m-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    </div>
                }
            </section>
        </>
    );
});

export default DomainRegShow;