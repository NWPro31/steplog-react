import ContentHeader from "../../../components/ContentHeader";
import React from "react";
import {DASHBOARD_ROUTE} from "../../../utils/consts";

const ServicesIndex = () => {

    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Список услуг" },
    ];
    return (
        <>
            <ContentHeader hrefs={hrefs} name="Список услуг"/>
        </>
    );
}

export default ServicesIndex;