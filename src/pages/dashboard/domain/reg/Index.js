import {DASHBOARD_ROUTE} from "../../../../utils/consts";
import ContentHeader from "../../../../components/ContentHeader";
import React from "react";

const DomainRegIndex = () => {
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Список регистраторов" },
    ];
    return (
        <>
            <ContentHeader hrefs={hrefs} name="Список регистраторов"/>
        </>
    );
}

export default DomainRegIndex;