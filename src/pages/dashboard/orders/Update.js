import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {DASHBOARD_ROUTE, SHOW_ORDERS_ROUTE} from "../../../utils/consts";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ContentHeader from "../../../components/ContentHeader";
import {editOrderService, updateOrderService} from "../../../http/serviceAPI";
import {Context} from "../../../index";

const OrdersUpdate = () => {
    const navigate = useNavigate();
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [access, setAccess] = useState('');
    const {id} = useParams();
    const [loadingData, setLoadingData] = useState(true);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + SHOW_ORDERS_ROUTE + '/' + id, name: "Детали заказа" },
        { name: "Редактирование заказа" },
    ];


    useEffect(()=>{
        void edit();
        if(user.user.user.role!== 'admin') {
            navigate(DASHBOARD_ROUTE);
        }
    },[]);

    const edit = async () => {
        let data;
        data = await editOrderService(id);
        setUrl(data.order_service.url);
        setDescription(data.order_service.description);
        setPrice(data.order_service.price);
        setAccess(data.order_service.access);

        setLoadingData(false);
    };


    const click = async () => {
        try {
            setLoading(true);
            let data;
            data = await updateOrderService(id, url, description, access, price);
            if(data.success) navigate(DASHBOARD_ROUTE + '/' + SHOW_ORDERS_ROUTE + '/' + id);
        } catch (e) {
            console.log(e);
        }

    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Редактирование заказа"/>
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
                                <label htmlFor="inputUrl">Адрес сайта</label>
                                <input type="text" id="inputUrl" name="url" value={url}
                                       onChange={e => setUrl(e.target.value)}
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
                            <div className="form-group">
                                <label htmlFor="inputAccess">Данные для доступа</label>
                                <textarea id="inputAccess" name="access"
                                          onChange={e => setAccess(e.target.value)}
                                          value={access}
                                          className="form-control" rows="4">{access}</textarea>
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
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + SHOW_ORDERS_ROUTE + '/' + id);}} className="btn btn-secondary "
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

export default OrdersUpdate;