import React, {useContext, useEffect} from "react";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {Context} from "..";
import {authRoutes, publicRoutes} from "../routes";
import {observer} from "mobx-react-lite";
import Dashboard from "../components/Dashboard";
import Home from "../pages/dashboard/Home";

const AppRouter = () => {
    const {user} = useContext(Context);
    const location = useLocation();
    useEffect(()=>{
        //page update
    },[location.pathname]);

    return (
        <Routes>

            {user.isAuth ?
                <Route path="/dashboard" element={<Dashboard/>}>
                    <Route index element={<Home/>}/>)
                {user.isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>}/>
                )}
                </Route>
                : ''
            }
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;