import {useCallback, useEffect, useState} from "react";
import DashHeader from "./DashHeader";
import DashSidebar from "./DashSidebar";
import {Outlet} from "react-router-dom";
import DashFooter from "./DashFooter";

const Dashboard = () => {

    const [isAppLoaded, setIsAppLoaded] = useState(false);

    useEffect(() => {

        const timeout = setTimeout(() => {
            setIsAppLoaded(true);
        }, 500);

        return () => {
            // clears timeout before running the new effect
            clearTimeout(timeout);
        };

    }, [])


    const getAppTemplate = useCallback(() => {
        if (!isAppLoaded) {
            return (
                <div className="preloader flex-column justify-content-center align-items-center">
                    <img className="animation__shake" src="/img/logo.png" alt="AdminLTELogo" />
                </div>
            );
        }
        return (
            <>
                <DashHeader/>
                <DashSidebar/>
                <div className="content-wrapper">
                    <Outlet/>
                </div>
                <DashFooter/>
            </>
        );
    }, [isAppLoaded]);

    return <div className="wrapper">{getAppTemplate()}</div>;
}

export default Dashboard;