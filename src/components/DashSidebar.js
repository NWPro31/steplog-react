import React, {useContext, useEffect, useState} from "react";
import Nav from 'react-bootstrap/Nav';
import {useNavigate, useLocation} from "react-router-dom";
import $ from 'jquery';
import {Context} from "../index";
import {HOME_ROUTE} from "../utils/consts";
import {menuItems} from "../menuItems";
import {check} from "../http/userAPI";
import "./DashSidebar.css";
import {observer} from "mobx-react-lite";

const DashSidebar = observer(()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const {user} = useContext(Context);
    const [userEmail, setUserEmail] = useState('');
    const [select, setSelect] = useState(0);
    const [parent, setParent] = useState(0);

    const dir = () => menuItems.map(menuItem =>
        {
            let child;
            child = menuItem.path === location.pathname ? menuItem.id : 0;
            if(child > 0){
                setSelect(child);
                return child;
            }
            child = menuItem.children && menuItem.children.filter(child => child.path === location.pathname).map(data => data.id);
            if(child > 0) {
                setParent(menuItem.id);
                setSelect(child[0]);
                return child[0];
            }
            return 0;

        }
    );

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

        dir();
        console.log(user.user.user.role);
        //setSelect(num);
        setUserEmail(user.user.user.email);
    },[]);

    useEffect(() => {
        dir();
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
                    <div className="pad-img img-circle elevation-2 mt-1 ml-3">
                        <img src={user.user.user.image_url ? `http://localhost:8000/thumbnail/${user.user.user.image_url}` : `/img/user2-160x160.jpg`} className="circle-img" alt="User Image"/>
                    </div>
                    <div className="info" style={{paddingLeft: '5px'}}>
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
                            menuItems.filter(itemsPerm => itemsPerm.perm.match(user.user.user.role)).map(menuItem => (
                                <li key={menuItem.id} className={`nav-item ${menuItem.id === parent ? ' menu-open' : ''}`}>
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
});

export default DashSidebar;