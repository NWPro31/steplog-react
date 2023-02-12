import React, {useContext, useEffect, useState} from "react";
import Nav from 'react-bootstrap/Nav';
import {useNavigate, useLocation} from "react-router-dom";
import $ from 'jquery';
import {Context} from "../index";
import {HOME_ROUTE} from "../utils/consts";
import {menuItems} from "../menuItems";

const DashSidebar = ()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useContext(Context);
    const [userEmail, setUserEmail] = useState('');
    const [select, setSelect] = useState(0);
    useEffect(() => {
        if (!user.treeview) {
            $('[data-widget="treeview"]').each(function () {
                adminlte.Treeview._jQueryInterface.call($(this), "init");
                user.setTreeview(true);
            });
        }
            $('[data-widget="sidebar-search"]').each(function () {
                adminlte.SidebarSearch._jQueryInterface.call($(this), "init");
            });
        const dir = () => menuItems.map(menuItem =>
            {
                let child;
                child = menuItem.path === location.pathname ? menuItem.id : 0;
                if(child > 0){
                    return child;
                }
                child = menuItem.children && menuItem.children.filter(child => child.path === location.pathname).map(data => data.id);
                if(child > 0) {
                    return child[0];
                }
                return 0;

            }
        );
        let row = dir();
        let num = row.map(child, i => {
            child.id;
        }) ?? 0;
        console.log(num);
        //setSelect(num);
        setUserEmail(user.user.user.email);
    },[]);

    useEffect(() => {
        console.log(location.pathname);
    }, [location]);
    return (
        <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Nav.Link onClick={() => {navigate(HOME_ROUTE);}} className="brand-link">
                <img src="/img/ico.png"
                     alt="StepLog Logo" className="brand-image"
                     style={{opacity: .9}}/>
                    <span className="brand-text font-weight-light">StepLog</span>
            </Nav.Link>


            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image"/>
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{userEmail}</a>
                    </div>
                </div>


                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search"
                               aria-label="Search"/>
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw"></i>
                                </button>
                            </div>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        {
                            menuItems.map(menuItem => (
                                <li key={menuItem.id} className="nav-item">
                                    <Nav.Link onClick={() => {{
                                        navigate(menuItem.path);
                                        setSelect(menuItem.id);
                                    }}}
                                              className={`nav-link ${menuItem.id === select && menuItem.path ? ' active' : ''}`}>
                                        <i className={`nav-icon ${menuItem.icon}`}></i>
                                        <p>
                                            {menuItem.name}
                                            {menuItem.children ? <i className="fas fa-angle-left right"></i> : ''}
                                        </p>
                                    </Nav.Link>
                                    {menuItem.children && (
                                        <ul className="nav nav-treeview">
                                            {menuItem.children.map(i => (
                                                <li key={i.id} className="nav-item">
                                                    <Nav.Link onClick={() => {{
                                                        navigate(i.path);
                                                        setSelect(i.id);
                                                    }}} className={`nav-link ${i.id === select ? ' active' : ''}`}>
                                                        <i className={i.icon}></i>
                                                        <p>{i.name}</p>
                                                    </Nav.Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}


                                </li>
                            ))
                        }

                    </ul>
                </nav>
            </div>
        </aside>
        </div>
    );
};

export default DashSidebar;