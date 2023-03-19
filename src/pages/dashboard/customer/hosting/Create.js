import {useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {DASHBOARD_ROUTE, INDEX_CUSTOMER_HOSTING_ROUTE} from "../../../../utils/consts";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ContentHeader from "../../../../components/ContentHeader";
import {Context} from "../../../../index";
import {createOrderHosting, indexHosting} from "../../../../http/hostingAPI";

const CustomerHostingCreate = () => {
    const navigate = useNavigate();
    const {hosting} = useContext(Context);
    const [hostings, setHostings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [password, setPassword] = useState('');
    const [work, setWork] = useState(0);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_CUSTOMER_HOSTING_ROUTE, name: "Хостинг" },
        { name: "Заказать хостинг" },
    ];

    useEffect(()=>{
        setLoading(true);
        indexHosting().then(data => {
            hosting.setHosting(data.hostings);
            setHostings(data.hostings);
        }).finally(()=>{
            setLoading(false);
        })
            .catch(err => console.log(err));
    },[]);

    useEffect(() => {
        //loading
    },[hostings]);

    const click = async () => {
        try {
            setLoading(true);
            let data;
            data = await createOrderHosting(name, url, work);
            console.log(data);
            if(data.success) navigate(DASHBOARD_ROUTE + '/' + INDEX_CUSTOMER_HOSTING_ROUTE);
        } catch (e) {
            console.log(e.response.data.message);
        }

    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Заказать хостинг"/>
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
                            <label htmlFor="inputName">Имя аккаунта (может совпадать с адресом сайта)</label>
                            <input type="text" id="inputName" name="name" value={name} autoComplete="off"
                                   onChange={e => setName(e.target.value)}
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputUrl">Адрес сайта</label>
                            <input type="text" id="inputUrl" name="url" value={url} autoComplete="off"
                                   onChange={e => setUrl(e.target.value)}
                                   className="form-control"/>
                        </div>
                        <label>Выберите тариф</label>
                        {loading ?
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden"></span>
                                        </div>
                                    </div>
                            : ''}

                        {hostings && hostings.map(hosting => (
                        <div key={hosting.id}
                             onClick={() => {setWork(hosting.id);}}
                             className={`callout ${hosting.id === work ? 'callout-success' : 'callout-info bg-light'}`}
                             role="button">
                            <h5>{hosting.title}</h5>
                            <div>{hosting.description.split("\n").map((item, i) => <p key={i}>{item}</p>)}</div>
                            <p>Стоимость: <span className="font-weight-bold">{hosting.price} рублей в месяц</span></p>
                        </div>
                        ))}
                        <div className="form-group">
                            <label htmlFor="inputPassword">Желаемый пароль для входа в панель управления</label>
                            <input type="password" id="inputPassword" name="password" value={password} autoComplete="new-password"
                                   onChange={e => setPassword(e.target.value)}
                                   className="form-control"/>
                        </div>
                        <label>Данные с информацией от аккаунта, будут отправлены на ваш email после оплаты и активации.</label>
                    </div>
                </div>
                <div className="row pb-3">
                    <div className="col-12">
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + INDEX_CUSTOMER_HOSTING_ROUTE);}} className="btn btn-secondary "
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
                            Заказать и оплатить
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CustomerHostingCreate;