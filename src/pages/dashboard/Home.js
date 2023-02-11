import {useNavigate} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 mt-1">Домашняя страница</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Nav.Link onClick={() => {navigate('/dashboard');}} className="nav-link">Главная</Nav.Link></li>
                                <li className="breadcrumb-item active nav-link">Домашняя страница</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;