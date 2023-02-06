import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from "react-router-dom";
import {DOMAINS_ROUTE, HOME_ROUTE, SITES_ROUTE} from "../utils/consts";

const HomeHeader = () => {
    const navigate = useNavigate();
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
                        <NavDropdown title="Авторизация" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Вход</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Регистрация
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default HomeHeader;