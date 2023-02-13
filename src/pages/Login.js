import React, {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "..";
import {login} from "../http/userAPI";
import {useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, HOME_ROUTE} from "../utils/consts";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';


const Login = observer(() => {

    const {user} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            setLoading(true);
            let data;
            if (isLogin) {
                data = await login(email, password);
            }
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
                        <p className="login-box-msg">Авторизуйтесь для работы с сайтом</p>

                        <Form>
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

                            <div className="row">
                                <div className="col-8">

                                </div>
                                <div className="col-4">
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
                                        Войти
                                    </Button>
                                </div>
                            </div>

                            <p className="mb-1">
                                <a href="forgot-password.html" className="text-decoration-none">Я забыл свой пароль</a>
                            </p>
                            <p className="mb-0">
                                <a href="register.html" className="text-decoration-none">Зарегистрировать новый аккаунт</a>
                            </p>

                        </Form>

                    </div>
                </div>
            </div>
        </div>

    );

});

export default Login;