import React, {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "..";
import {login, registration} from "../http/userAPI";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {HOME_ROUTE, REGISTER_ROUTE} from "../utils/consts";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Register = observer(() => {

    const {user} = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isRegister = location.pathname === REGISTER_ROUTE;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    const click = async () => {
        try {
            let data;
            if (isRegister) {
                data = await registration(name, email, password, password_confirmation);
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
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="email" placeholder="Enter name" value={name}
                                      onChange={e => setName(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

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

                    <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                        <Form.Label>Password Confirm</Form.Label>
                        <Form.Control type="password" placeholder="Password Confirm" value={password_confirmation}
                                      onChange={e => setPasswordConfirmation(e.target.value)}/>
                    </Form.Group>

                    <Button onClick={click} variant="primary">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );

});

export default Register;