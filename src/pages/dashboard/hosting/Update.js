import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {DASHBOARD_ROUTE, INDEX_HOSTING_ROUTE} from "../../../utils/consts";
import {editHosting, updateHosting} from "../../../http/hostingAPI";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ContentHeader from "../../../components/ContentHeader";

const Update = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stored, setStored] = useState(false);
    const {id} = useParams();
    const [loadingData, setLoadingData] = useState(true);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_HOSTING_ROUTE, name: "Список тарифов" },
        { name: "Редактирование хостинг тарифа" },
    ];


    useEffect(()=>{
        void edit();
    },[]);

    const edit = async () => {
        let data;
        data = await editHosting(id);
        setTitle(data.hostings.title);
        setDescription(data.hostings.description);
        setPrice(data.hostings.price);
        setStored(data.hostings.is_stored);
        setLoadingData(false);
    };


    const click = async () => {
        try {
            setLoading(true);
            let data;
            data = await updateHosting(title, description, price, stored, id);
            if(data.success) navigate(DASHBOARD_ROUTE + '/' + INDEX_HOSTING_ROUTE);
        } catch (e) {
            alert(e.response.message);
        }

    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Редактирование хостинг тарифа"/>
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
                                <label htmlFor="inputPrice">Стоимость в месяц</label>
                                <input type="number" id="inputPrice" name="price" value={price}
                                       onChange={e => setPrice(Number(e.target.value))}
                                       className="form-control"/>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" name="is_stored" checked={stored}
                                       onChange={() => setStored(!stored)}
                                       className="form-check-input" id="isStored"/>
                                    <label className="form-check-label" htmlFor="isStored">активный тариф</label>
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
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + INDEX_HOSTING_ROUTE);}} className="btn btn-secondary "
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

export default Update;