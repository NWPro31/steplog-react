import {DASHBOARD_ROUTE, INDEX_DOMAIN_ROUTE, INDEX_HOSTING_ROUTE} from "../../../utils/consts";
import ContentHeader from "../../../components/ContentHeader";
import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import {useNavigate} from "react-router-dom";
import {createDomain} from "../../../http/domainAPI";

const DomainCreate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [priceExtension, setPriceExtension] = useState(0);
    const [period, setPeriod] = useState(0);

    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_DOMAIN_ROUTE, name: "Список тарифов" },
        { name: "Создать тариф" },
    ];

    const click = async () => {
        try {
            setLoading(true);
            let data;
            data = await createDomain(title, price, priceExtension, period);
            if(data.success) navigate(DASHBOARD_ROUTE + '/' + INDEX_DOMAIN_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }

    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Создать тариф"/>
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
                            <label htmlFor="inputTitle">Название</label>
                            <input type="text" id="inputTitle" name="title" value={title}
                                   onChange={e => setTitle(e.target.value)}
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPrice">Стоимость в год</label>
                            <input type="number" id="inputPrice" name="price_" value={price}
                                   onChange={e => setPrice(Number(e.target.value))}
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPriceExtension">Стоимость продления в год</label>
                            <input type="number" id="inputPriceExtension" name="price_extension" value={priceExtension}
                                   onChange={e => setPriceExtension(Number(e.target.value))}
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPeriod">Макимальный период оплаты</label>
                            <input type="number" id="inputPeriod" name="period" value={period}
                                   onChange={e => setPeriod(Number(e.target.value))}
                                   className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + INDEX_DOMAIN_ROUTE);}} className="btn btn-secondary "
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
                            Создать
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DomainCreate;