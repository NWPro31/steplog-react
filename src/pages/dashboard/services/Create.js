import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {DASHBOARD_ROUTE, INDEX_SERVICES_ROUTE} from "../../../utils/consts";
import {createService} from "../../../http/serviceAPI";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ContentHeader from "../../../components/ContentHeader";

const ServicesCreate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [priceMin, setPriceMin] = useState(0);
    const [durationWork, setDurationWork] = useState('');
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_SERVICES_ROUTE, name: "Список услуг" },
        { name: "Создание новой услуги" },
    ];

    const click = async () => {
        try {
            setLoading(true);
            let data;
            data = await createService(title, description, price, priceMin, durationWork);
            if(data.success) navigate(DASHBOARD_ROUTE + '/' + INDEX_SERVICES_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }

    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Создание новой услуги"/>
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
                            <label htmlFor="inputDescription">Описание</label>
                            <textarea id="inputDescription" name="description"
                                      onChange={e => setDescription(e.target.value)}
                                      value={description}
                                      className="form-control" rows="4">{description}</textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPrice">Стоимость</label>
                            <input type="number" id="inputPrice" name="price" value={price}
                                   onChange={e => setPrice(Number(e.target.value))}
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPriceMin">Минимальная стоимость</label>
                            <input type="number" id="inputPriceMin" name="price_min" value={priceMin}
                                   onChange={e => setPriceMin(Number(e.target.value))}
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputDurationWork">Продолжительность работы</label>
                            <input type="text" id="inputDurationWork" name="duration_work" value={durationWork}
                                   onChange={e => setDurationWork(e.target.value)}
                                   className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + INDEX_SERVICES_ROUTE);}} className="btn btn-secondary "
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

export default ServicesCreate;