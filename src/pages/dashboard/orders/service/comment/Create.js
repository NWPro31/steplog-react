import {useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import {DASHBOARD_ROUTE, INDEX_SERVICES_ROUTE, SHOW_ORDERS_ROUTE} from "../../../../../utils/consts";
import {createCommentOrderService} from "../../../../../http/serviceAPI";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ContentHeader from "../../../../../components/ContentHeader";

const CommentOrderServicesCreate = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + SHOW_ORDERS_ROUTE + '/' + id, name: "Детали заказа" },
        { name: "Добавить комментарий" },
    ];

    const click = async () => {
        try {
            setLoading(true);
            let data;
            data = await createCommentOrderService(id, comment);
            if(data.success) navigate(DASHBOARD_ROUTE + '/' + SHOW_ORDERS_ROUTE + '/' + id);
        } catch (e) {
            alert(e.response.data.message);
        }

    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Добавить комментарий"/>
            <section className="content">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Детали заказа</h3>

                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="inputComment">Комментарий</label>
                            <textarea id="inputComment" name="comment"
                                      onChange={e => setComment(e.target.value)}
                                      value={comment}
                                      className="form-control" rows="4">{comment}</textarea>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + SHOW_ORDERS_ROUTE + '/' + id);}} className="btn btn-secondary "
                                variant="primary">
                            Отменить
                        </Button>
                        <Button onClick={click} className="btn btn-primary float-right"
                                variant="primary">
                            {loading ?
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                :
                                ''
                            }
                            Отправить
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CommentOrderServicesCreate;