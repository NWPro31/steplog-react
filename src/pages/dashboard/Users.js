import Table from 'react-bootstrap/Table';
import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {usersList} from "../../http/userAPI";
import {DASHBOARD_ROUTE} from "../../utils/consts";
import ContentHeader from "../../components/ContentHeader";

const Users = observer(() => {
    const {user} = useContext(Context);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Клиенты" },
    ];

    useEffect(() => {
        //fetchType().then(data => product.setTypes(data));
        setLoading(true);
        usersList().then(data => {
            user.setUsers(data.users);
            setUsers(data.users);
        })
            .finally(()=>{
                setLoading(false);
        })
            .catch(err => console.log(err));
    },[]);

    useEffect(() => {
        //loading
    },[users]);



    return (
        <>
            <ContentHeader hrefs={hrefs} name="Клиенты"/>
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
                            {loading ?
                                <tr>
                                    <td colSpan={4}>
                                        <div className="d-flex justify-content-center">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden"></span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                : ''}
                            {users && users.map(user => (
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