import React, {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "..";
import {login, registration} from "../http/userAPI";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {HOME_ROUTE, REGISTER_ROUTE} from "../utils/consts";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from "react-bootstrap/Spinner";

const Register = observer(() => {

    const {user} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isRegister = location.pathname === REGISTER_ROUTE;
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    const click = async () => {
        try {
            setLoading(true);
            let data;
            if (isRegister) {
                data = await registration(name, email, password, password_confirmation);
            }
            data.user.role = 'user';
            user.setUser(data);
            user.setIsAuth(true);
            navigate(HOME_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }

    };

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="card card-outline card-orange">
                    <div className="card-header text-center">
                        <a style={{cursor: 'pointer'}}
                           onClick={() => {navigate(HOME_ROUTE);}}
                           className="h1">
                            <img
                                src="/img/logo.png"
                                width="150"
                                height="50"
                                className="d-inline-block align-top"
                                alt="StepLog"
                            />
                        </a>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Зарегистрируйтесь для работы с сайтом</p>

                        <Form>
                            <Form.Group className="input-group mb-3" controlId="formName">
                                <Form.Control className="form-control" type="name" placeholder="Введите имя" value={name}
                                              onChange={e => setName(e.target.value)} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </Form.Group>

                            <Form.Group className="input-group mb-3" controlId="formBasicEmail">
                                <Form.Control className="form-control" type="email" placeholder="Введите email" value={email}
                                              onChange={e => setEmail(e.target.value)} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </Form.Group>

                            <Form.Group className="input-group mb-3" controlId="formBasicPassword">
                                <Form.Control className="form-control" type="password" placeholder="Пароль" value={password}
                                              onChange={e => setPassword(e.target.value)}/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </Form.Group>

                            <Form.Group className="input-group mb-3" controlId="formBasicPasswordConfirm">
                                <Form.Control className="form-control" type="password" placeholder="Пароль" value={password_confirmation}
                                              onChange={e => setPasswordConfirmation(e.target.value)}/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </Form.Group>

                            <div className="row">
                                <div className="col-12">
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
                                        Регистрация
                                    </Button>
                                </div>
                            </div>
                            <p className="mb-1">
                                Регистрация на сайте подразумевает обязательное согласие с <a href="#" className="text-decoration-none">политикой конфиденциальности</a>.
                            </p>
                            <p className="mb-0">
                                <a href="forgot-password.html" className="text-decoration-none">Войти, если есть аккаунт</a>
                            </p>
                        </Form>

                    </div>
                </div>
            </div>
        </div>

    );

});

export default Register;