import {DASHBOARD_ROUTE} from "../../utils/consts";
import ContentHeader from "../../components/ContentHeader";
import React from "react";

const Home = () => {
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Домашняя страница" },
    ];

    return (
        <>
            <ContentHeader hrefs={hrefs} name="Домашняя страница"/>
        </>
    );
}

export default Home;