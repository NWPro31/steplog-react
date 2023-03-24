import ContentHeader from "../../../../components/ContentHeader";
import React, {useContext, useEffect, useState} from "react";
import {
    DASHBOARD_ROUTE, INDEX_CUSTOMER_HOSTING_ROUTE
} from "../../../../utils/consts";
import {useNavigate} from "react-router-dom";
import 'moment/locale/ru';
import 'react-tooltip/dist/react-tooltip.css';
import Spinner from "react-bootstrap/Spinner";
import './Index.css';
import {updateCustomerProfile, updatePasswordProfile} from "../../../../http/userAPI";
import {Context} from "../../../../index";
import InputMask from "react-input-mask";
import Toastr from "toastr/toastr";
import "toastr/toastr.scss";
import {createInvoice} from "../../../../http/invoiceAPI";


const CustomerProfileIndex = () => {
    const navigate = useNavigate();
    const {user} = useContext(Context);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [passwordOld, setPasswordOld] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(500);
    const [loadingCustomer, setLoadingCustomer] = useState(false);
    const [loadingBalance, setLoadingBalance] = useState(false);
    const [loadingPasswordChange, setLoadingPasswordChange] = useState(false);

    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Профиль" },
    ];

    useEffect(()=>{
        setName(user.user.user.name);
        setEmail(user.user.user.email);
        setPhone(user.user.user.phone);
    },[]);

    const customer = async () => {
        try {
            setLoadingCustomer(true);
            let data;
            data = await updateCustomerProfile(name, email, phone ?? null);
            user.setUser(data);
            setLoadingCustomer(false);
            toastrDefaultSuccess('Данные успешно обновлены!', 'success');
        } catch (e) {
            setLoadingCustomer(false);
            toastrDefaultSuccess('Ошибка при обновлении данных!', 'error');
            //console.log(e.response.data.message);
        }
    }

    const changePassword = async () => {
        try {
            setLoadingPasswordChange(true);
            let data;
            data = await updatePasswordProfile(passwordOld, password, passwordConfirm);
            toastrDefaultSuccess('Пароль успешно обновлен!', 'success');
            setLoadingPasswordChange(false);
        }catch (e)
        {
            setLoadingPasswordChange(false);
            e.response.data.message === 'Check your old password.' ? toastrDefaultSuccess('Старый пароль введен неверно!', 'error') : toastrDefaultSuccess('Ошибка при обновлении пароля', 'error');
            //console.log(e.response.data.message);
        }
    }

    const creditBalance = async () => {
        try
        {
            if(balance >= 500)
            {
                setLoadingBalance(true);
                let data;
                data = await createInvoice('Пополнение баланса ' + user.user.user.email, balance);
                toastrDefaultSuccess('Платеж успешно создан!', 'success');
                setLoadingBalance(false);
            }else
            {
                console.error("insufficient amount");
                toastrDefaultSuccess('Ошибка при создании платежа, сумма пополнения не может быть меньше 500 рублей!', 'error');
            }
        }catch (e) {
            setLoadingBalance(false);
            toastrDefaultSuccess('Ошибка при создании платежа!', 'error');
        }
    }

    const toastrDefaultSuccess = (msg, type) => {
        type === 'success' ? Toastr.success(msg) : Toastr.error(msg);
    }


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
                                <a className="nav-link active" id="custom-content-below-customer-tab" data-toggle="pill"
                                   href="#custom-content-below-customer" role="tab"
                                   aria-controls="custom-content-below-customer" aria-selected="true">Личные настройки</a>
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
                        <div className="tab-content mt-3" id="custom-content-below-tabContent">
                            <div className="tab-pane show active" id="custom-content-below-customer" role="tabpanel"
                                 aria-labelledby="custom-content-below-customer-tab">
                                <div className="form-group">
                                    <label htmlFor="inputName">Как к вам обращаться?</label>
                                    <input type="text" id="inputName" name="name" value={name ?? ''}
                                           onChange={e => setName(e.target.value)}
                                           className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPhone">Контактный телефон</label>
                                    <InputMask mask="+7 (999) 999-99-99" value={phone ?? ''}
                                               onChange={e => {setPhone(e.target.value)}}>
                                        {() => <input type="text" id="inputPhone" name="phone"
                                                      placeholder="+7 (123) 123-45-67"
                                                      className="form-control"/>
                                        }

                                    </InputMask>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputEmail">Адрес электронной почты</label>
                                    <input type="text" id="inputEmail" name="email" value={email ?? ''}
                                           onChange={e => setEmail(e.target.value)}
                                           className="form-control"/>
                                </div>
                                <button
                                    onClick={customer}
                                    className="btn btn-primary float-right">
                                    {loadingCustomer ?
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
                            <div className="tab-pane mt-3" id="custom-content-below-profile" role="tabpanel"
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
                                    onClick={changePassword}
                                    className="btn btn-primary float-right">
                                    {loadingPasswordChange ?
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
                            <div className="tab-pane mt-3" id="custom-content-below-messages" role="tabpanel"
                                 aria-labelledby="custom-content-below-messages-tab">
                                <div className="form-group">
                                    <label htmlFor="inputBalance">Сумма пополнения баланса</label>
                                    <input type="number" id="inputBalance" name="balance" value={balance ?? 0}
                                           onChange={e => setBalance(Number(e.target.value))}
                                           className="form-control"/>
                                </div>
                                <button
                                    onClick={creditBalance}
                                    className="btn btn-primary float-right">
                                    {loadingBalance ?
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
                                    Создать платеж
                                </button>
                            </div>
                            <div className="tab-pane mt-3" id="custom-content-below-settings" role="tabpanel"
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