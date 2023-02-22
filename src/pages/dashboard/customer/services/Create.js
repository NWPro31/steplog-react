import {useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {DASHBOARD_ROUTE, INDEX_CUSTOMER_SERVICES_ROUTE} from "../../../../utils/consts";
import {createService, indexService} from "../../../../http/serviceAPI";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ContentHeader from "../../../../components/ContentHeader";
import {Context} from "../../../../index";

const CustomerServicesCreate = () => {
    const navigate = useNavigate();
    const {service} = useContext(Context);
    const [services,setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [priceMin, setPriceMin] = useState(0);
    const [durationWork, setDurationWork] = useState('');
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_CUSTOMER_SERVICES_ROUTE, name: "Список услуг" },
        { name: "Заказ обслуживания сайта" },
    ];

    useEffect(()=>{
        setLoading(true);
        indexService().then(data => {
            service.setService(data.services);
            setServices(data.services);
        }).finally(()=>{
            setLoading(false);
        })
            .catch(err => console.log(err));
    },[]);

    useEffect(() => {
        //loading
    },[services]);

    const click = async () => {
        try {
            setLoading(true);
            let data;
            data = await createService(title, description, price, priceMin, durationWork);
            if(data.success) navigate(DASHBOARD_ROUTE + '/' + INDEX_CUSTOMER_SERVICES_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }

    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Заказ обслуживания сайта"/>
            <section className="content">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Оформление заказа</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="inputTitle">Адрес вашего сайта</label>
                            <input type="text" id="inputTitle" name="title" value={title}
                                   onChange={e => setTitle(e.target.value)}
                                   className="form-control"/>
                        </div>
                        <label>Выберите услугу</label>
                        {loading ?
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden"></span>
                                        </div>
                                    </div>
                            : ''}

                        {services && services.map(service => (
                        <div key={service.id} className="callout callout-info" role="button">
                            <h5>{service.title}</h5>
                            <p>{service.description.split("\n").map((item, i) => <p key={i}>{item}</p>)}</p>
                            <p>Продолжительность: {service.duration_work}</p>
                            <p>Стоимость: <span className="font-weight-bold">{service.price_min}р.</span></p>
                        </div>
                        ))}

                        <div className="form-group">
                            <label htmlFor="inputDescription">Пожелания</label>
                            <textarea id="inputDescription" name="description"
                                      onChange={e => setDescription(e.target.value)}
                                      value={description}
                                      className="form-control" rows="4">{description}</textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputDescription2">Данные для доступа к сайту / серверу</label>
                            <textarea id="inputDescription2" name="description"
                                      onChange={e => setDescription(e.target.value)}
                                      value={description}
                                      className="form-control" rows="4">{description}</textarea>
                        </div>
                        <label>Стоимость выполнения заказа зависит от объема и сложности работ, она будет известна после обработки заказа.</label>
                    </div>
                </div>
                <div className="row pb-3">
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

export default CustomerServicesCreate;