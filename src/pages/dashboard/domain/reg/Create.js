import {
    DASHBOARD_ROUTE,
    INDEX_DOMAIN_REG_ROUTE,
    INDEX_DOMAIN_ROUTE
} from "../../../../utils/consts";
import ContentHeader from "../../../../components/ContentHeader";
import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import {useNavigate} from "react-router-dom";
import {createDomainReg} from "../../../../http/domainAPI";

const DomainRegCreate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_DOMAIN_REG_ROUTE, name: "Список регистраторов" },
        { name: "Добавить регистратора" },
    ];

    const click = async () => {
        try {
            setLoading(true);
            let data;
            data = await createDomainReg(title, url);
            if(data.success) navigate(DASHBOARD_ROUTE + '/' + INDEX_DOMAIN_REG_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }

    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Добавить регистратора"/>
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
                            Добавить
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DomainRegCreate;