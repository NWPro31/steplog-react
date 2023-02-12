import {useNavigate} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {usersList} from "../../http/userAPI";

const Users = observer(() => {
    const navigate = useNavigate();
    const {user} = useContext(Context);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        //fetchType().then(data => product.setTypes(data));
        usersList().then(data => user.setUsers(data.users))
            .catch(err => console.log(err));
    },[]);

    useEffect(() => {
        setUsers(user.users);
    },[user.users]);

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 mt-1">Клиенты</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Nav.Link onClick={() => {navigate('/dashboard');}} className="nav-link">Главная</Nav.Link></li>
                                <li className="breadcrumb-item active nav-link">Клиенты</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Клиенты</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                            <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Имя</th>
                                <th>email</th>
                                <th>Роль</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
});

export default Users;