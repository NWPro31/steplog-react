import {DASHBOARD_ROUTE} from "../../../../utils/consts";
import ContentHeader from "../../../../components/ContentHeader";
import React from "react";

const DomainZoneIndex = () => {
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Список доменных зон" },
    ];
    return (
        <>
            <ContentHeader hrefs={hrefs} name="Список доменных зон"/>
        </>
    );
}

export default DomainZoneIndex;