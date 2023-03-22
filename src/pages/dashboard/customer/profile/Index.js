import ContentHeader from "../../../../components/ContentHeader";
import React, {useEffect} from "react";
import {
    DASHBOARD_ROUTE
} from "../../../../utils/consts";
import {useNavigate} from "react-router-dom";
import 'moment/locale/ru';
import 'react-tooltip/dist/react-tooltip.css';


const CustomerProfileIndex = () => {
    const navigate = useNavigate();

    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { name: "Профиль" },
    ];

    useEffect(()=>{

    },[]);


    return (
        <>
            <ContentHeader hrefs={hrefs} name="Профиль"/>
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Профиль, настройки</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <ul className="nav nav-tabs" id="custom-content-below-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="custom-content-below-home-tab" data-toggle="pill"
                                   href="#custom-content-below-home" role="tab"
                                   aria-controls="custom-content-below-home" aria-selected="true">Личные настройки</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="custom-content-below-profile-tab" data-toggle="pill"
                                   href="#custom-content-below-profile" role="tab"
                                   aria-controls="custom-content-below-profile" aria-selected="false">Безопасность</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="custom-content-below-messages-tab" data-toggle="pill"
                                   href="#custom-content-below-messages" role="tab"
                                   aria-controls="custom-content-below-messages" aria-selected="false">Финансы</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="custom-content-below-settings-tab" data-toggle="pill"
                                   href="#custom-content-below-settings" role="tab"
                                   aria-controls="custom-content-below-settings" aria-selected="false">Партнерская программа</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="custom-content-below-tabContent">
                            <div className="tab-pane fade show active" id="custom-content-below-home" role="tabpanel"
                                 aria-labelledby="custom-content-below-home-tab">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin malesuada lacus
                                ullamcorper dui molestie, sit amet congue quam finibus. Etiam ultricies nunc non magna
                                feugiat commodo. Etiam odio magna, mollis auctor felis vitae, ullamcorper ornare ligula.
                                Proin pellentesque tincidunt nisi, vitae ullamcorper felis aliquam id. Pellentesque
                                habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin
                                id orci eu lectus blandit suscipit. Phasellus porta, ante et varius ornare, sem enim
                                sollicitudin eros, at commodo leo est vitae lacus. Etiam ut porta sem. Proin porttitor
                                porta nisl, id tempor risus rhoncus quis. In in quam a nibh cursus pulvinar non
                                consequat neque. Mauris lacus elit, condimentum ac condimentum at, semper vitae lectus.
                                Cras lacinia erat eget sapien porta consectetur.
                            </div>
                            <div className="tab-pane fade" id="custom-content-below-profile" role="tabpanel"
                                 aria-labelledby="custom-content-below-profile-tab">
                                Mauris tincidunt mi at erat gravida, eget tristique urna bibendum. Mauris pharetra purus
                                ut ligula tempor, et vulputate metus facilisis. Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                                posuere cubilia Curae; Maecenas sollicitudin, nisi a luctus interdum, nisl ligula
                                placerat mi, quis posuere purus ligula eu lectus. Donec nunc tellus, elementum sit amet
                                ultricies at, posuere nec nunc. Nunc euismod pellentesque diam.
                            </div>
                            <div className="tab-pane fade" id="custom-content-below-messages" role="tabpanel"
                                 aria-labelledby="custom-content-below-messages-tab">
                                Morbi turpis dolor, vulputate vitae felis non, tincidunt congue mauris. Phasellus
                                volutpat augue id mi placerat mollis. Vivamus faucibus eu massa eget condimentum. Fusce
                                nec hendrerit sem, ac tristique nulla. Integer vestibulum orci odio. Cras nec augue
                                ipsum. Suspendisse ut velit condimentum, mattis urna a, malesuada nunc. Curabitur
                                eleifend facilisis velit finibus tristique. Nam vulputate, eros non luctus efficitur,
                                ipsum odio volutpat massa, sit amet sollicitudin est libero sed ipsum. Nulla lacinia, ex
                                vitae gravida fermentum, lectus ipsum gravida arcu, id fermentum metus arcu vel metus.
                                Curabitur eget sem eu risus tincidunt eleifend ac ornare magna.
                            </div>
                            <div className="tab-pane fade" id="custom-content-below-settings" role="tabpanel"
                                 aria-labelledby="custom-content-below-settings-tab">
                                Pellentesque vestibulum commodo nibh nec blandit. Maecenas neque magna, iaculis tempus
                                turpis ac, ornare sodales tellus. Mauris eget blandit dolor. Quisque tincidunt venenatis
                                vulputate. Morbi euismod molestie tristique. Vestibulum consectetur dolor a vestibulum
                                pharetra. Donec interdum placerat urna nec pharetra. Etiam eget dapibus orci, eget
                                aliquet urna. Nunc at consequat diam. Nunc et felis ut nisl commodo dignissim. In hac
                                habitasse platea dictumst. Praesent imperdiet accumsan ex sit amet facilisis.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerProfileIndex;