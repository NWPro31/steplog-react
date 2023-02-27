import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../../../index";
import {
    DASHBOARD_ROUTE, SHOW_ORDERS_ROUTE
} from "../../../../../utils/consts";
import ContentHeader from "../../../../../components/ContentHeader";
import {createCommentOrderService, indexCommentOrderService} from "../../../../../http/serviceAPI";
import moment from "moment";
import 'moment/locale/ru';
import {useNavigate, useParams} from "react-router-dom";


const CommentOrderServicesShow = observer(() => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {service} = useContext(Context);
    const [comment, setComment] = useState('');
    const [loading,setLoading] = useState(true);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + SHOW_ORDERS_ROUTE + '/' + id, name: "Детали заказа" },
        { name: "Комментарии" },
    ];

    useEffect(()=>{
        indexCommentOrderService(id).then(data => {
            service.setCommentOrder(data.comment_order);
        }).finally(()=>{
            setLoading(false);
        })
            .catch(err => console.log(err));
    },[]);

    useEffect(() => {
        document.getElementById('comments-div').scrollTop = document.getElementById('comments-div').scrollHeight + 100;
        //loading
    },[service.commentOrder]);

    const timeRule = (time) => {
        return moment(time).locale('ru').fromNow()
    }

    const click = async () => {
        if(comment==="") return;
        try {
            //setLoading(true);
            let data;
            data = await createCommentOrderService(id, comment);
            service.setCommentOrder([...service.commentOrder,data.comment]);
            setComment('');
            //setLoading(false);
        } catch (e) {
            alert(e.response.data.message);
        }

    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Комментарии"/>
            <div className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Комментарии</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="direct-chat-messages" style={{height:"500px"}} id="comments-div">
                            {loading && (
                                <div className="d-flex justify-content-center m-5">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden"></span>
                                    </div>
                                </div>
                            )}
                            {!loading && service.commentOrder.length > 0  && service.commentOrder.map(comment => (
                                <div key={comment.id} className={`direct-chat-msg ${comment.user_role !== "admin" ? 'right' : ''}`}>
                                    <div className="direct-chat-infos clearfix">
                                        <span className={`direct-chat-name ${comment.user_role !== "admin" ? 'float-right' : 'float-left'}`}>{comment.user_name}</span>
                                        <span className={`direct-chat-timestamp ${comment.user_role !== "admin" ? 'float-left' : 'float-right'}`}>{timeRule(comment.created_at)}</span>
                                    </div>
                                    <img className="direct-chat-img" src="/img/user1-128x128.jpg"
                                         alt="message user image"/>

                                    <div className="direct-chat-text bg-light" style={{whiteSpace:'pre'}}>
                                        {comment.comment}
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card-footer">
                        <form action="#" method="post">
                            <div className="input-group">
                                <textarea name="message"
                                          onChange={e => setComment(e.target.value)}
                                          value={comment}
                                          placeholder="Ваше сообщение ..."
                                          className="form-control">{comment}</textarea>
                    <span className="input-group-append">
                      <button onClick={click} type="button" className="btn btn-primary">Отправить</button>
                    </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
});

export default CommentOrderServicesShow;