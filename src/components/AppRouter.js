import React, {useContext} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Context} from "..";
import {authRoutes, publicRoutes} from "../routes";
import {observer} from "mobx-react-lite";
import Dashboard from "../components/Dashboard";
import Home from "../pages/dashboard/Home";

const AppRouter = observer(() => {
    const {user} = useContext(Context);

    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard/>}>
                <Route index element={<Home/>}/>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            </Route>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
});

export default AppRouter;