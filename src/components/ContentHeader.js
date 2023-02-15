import React from "react";
import {Link} from "react-router-dom";
import {Breadcrumb} from "react-bootstrap";

const ContentHeader = ({hrefs, name}) => {

    return (
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">{name}</h1>
                    </div>
                    <div className="col-sm-6">
                        <Breadcrumb className="float-sm-right mt-1">
                            {hrefs.map((item, i) =>
                                !item.href ? (
                                    <Breadcrumb.Item key={i} active>{item.name}</Breadcrumb.Item>
                                ) : (
                                    <Breadcrumb.Item key={i} linkProps={{ to: item.href }} linkAs={Link}>
                                        {item.name}
                                    </Breadcrumb.Item>
                                )
                            )}
                        </Breadcrumb>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContentHeader;