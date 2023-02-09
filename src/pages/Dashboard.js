import {useCallback, useEffect, useState} from "react";
import DashHeader from "../components/DashHeader";
import DashSidebar from "../components/DashSidebar";
import DashContent from "../components/DashContent";

const Dashboard = () => {

    const [isAppLoaded, setIsAppLoaded] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsAppLoaded(true);
        }, 1000);

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
                <DashContent/>
            </>
        );
    }, [isAppLoaded]);

    return <div className="wrapper">{getAppTemplate()}</div>;
}

export default Dashboard;