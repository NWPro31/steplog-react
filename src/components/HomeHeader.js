import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from "react-router-dom";
import {DOMAINS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, SITES_ROUTE} from "../utils/consts";
import {useContext} from "react";
import {Context} from "..";
import {observer} from "mobx-react-lite";

const HomeHeader = observer(() => {
    const navigate = useNavigate();
    const {user} = useContext(Context);


    return(
        <Navbar collapseOnSelect expand="lg" bg="light">
            <Container>
                <Navbar.Brand
                    style={{cursor: 'pointer'}}
                    onClick={() => {navigate(HOME_ROUTE);}}>
                    <img
                        src="/img/logo.png"
                        width="150"
                        height="50"
                        className="d-inline-block align-top"
                        alt="StepLog"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link eventKey="1" onClick={() => {navigate(HOME_ROUTE);}}>Главная</Nav.Link>
                        <Nav.Link eventKey="1" onClick={() => {navigate(SITES_ROUTE);}}>Сайты</Nav.Link>
                        <Nav.Link eventKey="2" onClick={() => {navigate(DOMAINS_ROUTE);}}>Домены</Nav.Link>
                        <Nav.Link eventKey="3" href="#pricing">Хостинг</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link eventKey="4" href="#deets">Контакты</Nav.Link>
                        {!user.isAuth ?
                        <NavDropdown title="Авторизация" id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={() => {navigate(LOGIN_ROUTE);}}>Вход</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {navigate(REGISTER_ROUTE);}}>
                                Регистрация
                            </NavDropdown.Item>
                        </NavDropdown>
                        :
                            <NavDropdown title="Логин" id="collasible-nav-dropdown">
                                <NavDropdown.Item>Панель управления</NavDropdown.Item>
                                <NavDropdown.Item>
                                    Выход
                                </NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default HomeHeader;