import {useNavigate} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import React, {useState} from "react";
import {DASHBOARD_ROUTE, USERS_ROUTE} from "../../../utils/consts";
import {createHosting} from "../../../http/hostingAPI";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

const CreateHosting = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const click = async () => {
        try {
            setLoading(true);
            let data;
            data = await createHosting(title, description, price);
            if(data.success) navigate(DASHBOARD_ROUTE + '/' + USERS_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }

    };

    return(
        <>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 mt-1">Создание нового тарифа хостинга</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Nav.Link onClick={() => {navigate('/dashboard');}} className="nav-link">Главная</Nav.Link></li>
                                <li className="breadcrumb-item active nav-link">Создание нового тарифа хостинга</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
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
                            <label htmlFor="inputPrice">Стоимость в месяц</label>
                            <input type="number" id="inputPrice" name="price" value={price}
                                   onChange={e => setPrice(Number(e.target.value))}
                                   className="form-control"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <a href="#" className="btn btn-secondary">Отменить</a>

                        <Button onClick={click} className="btn btn-primary btn-block"
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

export default CreateHosting;