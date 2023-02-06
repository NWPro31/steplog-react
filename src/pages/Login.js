import React, {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "..";
import {login} from "../http/userAPI";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, HOME_ROUTE} from "../utils/consts";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = observer(() => {

    const {user} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            }

            user.setUser(user);
            user.setIsAuth(true);
            navigate(HOME_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }

    };

    return (
        <div className="login">
            <div className="login__container">
                <h1>Login</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email}
                                      onChange={e => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password}
                                      onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Button onClick={click} variant="primary">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );

});

export default Login;