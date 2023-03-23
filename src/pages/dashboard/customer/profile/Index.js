import ContentHeader from "../../../../components/ContentHeader";
import React, {useEffect, useState} from "react";
import {
    DASHBOARD_ROUTE
} from "../../../../utils/consts";
import {useNavigate} from "react-router-dom";
import 'moment/locale/ru';
import 'react-tooltip/dist/react-tooltip.css';
import Spinner from "react-bootstrap/Spinner";
import './Index.css';


const CustomerProfileIndex = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [passwordOld, setPasswordOld] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);

const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Профиль" },
    ];

    useEffect(()=>{

    },[]);


    return (
        <>
            <ContentHeader hrefs={hrefs} name="Профиль"/>
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Профиль, настройки</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <ul className="nav nav-tabs" id="custom-content-below-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="custom-content-below-home-tab" data-toggle="pill"
                                   href="#custom-content-below-home" role="tab"
                                   aria-controls="custom-content-below-home" aria-selected="true">Личные настройки</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="custom-content-below-profile-tab" data-toggle="pill"
                                   href="#custom-content-below-profile" role="tab"
                                   aria-controls="custom-content-below-profile" aria-selected="false">Безопасность</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="custom-content-below-messages-tab" data-toggle="pill"
                                   href="#custom-content-below-messages" role="tab"
                                   aria-controls="custom-content-below-messages" aria-selected="false">Финансы</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="custom-content-below-settings-tab" data-toggle="pill"
                                   href="#custom-content-below-settings" role="tab"
                                   aria-controls="custom-content-below-settings" aria-selected="false">Партнерская программа</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="custom-content-below-tabContent">
                            <div className="tab-pane show active" id="custom-content-below-home" role="tabpanel"
                                 aria-labelledby="custom-content-below-home-tab">
                                <div className="form-group">
                                    <label htmlFor="inputName">Как к вам обращаться?</label>
                                    <input type="text" id="inputName" name="name" value={name}
                                           onChange={e => setName(e.target.value)}
                                           className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPhone">Контактный телефон</label>
                                    <input type="text" id="inputPhone" name="phone" value={phone}
                                           onChange={e => setPhone(e.target.value)}
                                           className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputEmail">Адрес электронной почты</label>
                                    <input type="text" id="inputEmail" name="email" value={email}
                                           onChange={e => setEmail(e.target.value)}
                                           className="form-control"/>
                                </div>
                                <button
                                    className="btn btn-primary float-right">
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
                                    Сохранить
                                </button>
                            </div>
                            <div className="tab-pane" id="custom-content-below-profile" role="tabpanel"
                                 aria-labelledby="custom-content-below-profile-tab">
                                <div className="form-group">
                                    <label htmlFor="inputPasswordOld">Текущий пароль</label>
                                    <input type="password"
                                           id="inputPasswordOld"
                                           autoComplete="new-password"
                                           name="password_old"
                                           value={passwordOld}
                                           onChange={e => setPasswordOld(e.target.value)}
                                           className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPassword">Новый пароль</label>
                                    <input type="password"
                                           id="inputPassword"
                                           autoComplete="new-password"
                                           name="password"
                                           value={password}
                                           onChange={e => setPassword(e.target.value)}
                                           className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPasswordConfirm">Повторите ввод нового пароля</label>
                                    <input type="password"
                                           id="inputPasswordConfirm"
                                           autoComplete="new-password"
                                           name="password_confirm"
                                           value={passwordConfirm}
                                           onChange={e => setPasswordConfirm(e.target.value)}
                                           className="form-control"/>
                                </div>
                                <button
                                    className="btn btn-primary float-right">
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
                                    Сохранить
                                </button>
                            </div>
                            <div className="tab-pane" id="custom-content-below-messages" role="tabpanel"
                                 aria-labelledby="custom-content-below-messages-tab">
                                Пополнение внутреннего баланса
                            </div>
                            <div className="tab-pane" id="custom-content-below-settings" role="tabpanel"
                                 aria-labelledby="custom-content-below-settings-tab">
                                Ссылка для привлечения партнеров
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerProfileIndex;