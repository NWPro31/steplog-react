import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {
    DASHBOARD_ROUTE, INDEX_TICKETS_ROUTE
} from "../../../utils/consts";
import ContentHeader from "../../../components/ContentHeader";
import moment from "moment";
import 'moment/locale/ru';
import {useNavigate, useParams} from "react-router-dom";
import {createTicketMessages, showTicketMessages} from "../../../http/ticketAPI";
import Spinner from "react-bootstrap/Spinner";


const TicketsShow = observer(() => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {ticket} = useContext(Context);
    const [ticketInfo, setTicketInfo] = useState([]);
    const [comment, setComment] = useState('');
    const [loading,setLoading] = useState(true);
    const [loadingButton,setLoadingButton] = useState(false);
    const [error, setError] = useState(null);
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_TICKETS_ROUTE, name: "Поддержка" },
        { name: "Сообщения" }
    ];

    useEffect(()=>{
        showTicketMessages(id).then(data => {
            ticket.setTicketMessages(data.ticket_messages);
            setTicketInfo(data.ticket);
        }).finally(()=>{
            setLoading(false);
        })
            .catch(err => {
                setError(err.response.status === 403 ? 'Доступ запрещен' : null);
                console.log(err)
                ticket.setTicketMessages([]);
            });
    },[]);

    useEffect(() => {
        window.scrollBy(0,document.getElementById('comments-div').scrollHeight - 300);
        console.log(document.getElementById('comments-div').scrollHeight + 100);
    },[ticket.ticketMessages, error]);

    const timeRule = (time) => {
        return moment(time).locale('ru').fromNow()
    }

    const click = async () => {
        if(comment==="") return;
        try {
            setLoadingButton(true);
            let data;
            data = await createTicketMessages(id, comment);
            ticket.setTicketMessages([...ticket.ticketMessages, data.messageTicket]);
            setComment('');
            setLoadingButton(false);
        } catch (e) {
            setLoadingButton(false);
            console.log(e.response.data.message);
        }

    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Сообщения"/>
            <div className="content pb-3" id="comments-div">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Сообщения</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div>
                            {loading && (
                                <div className="d-flex justify-content-center m-5">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden"></span>
                                    </div>
                                </div>
                            )}
                            {error && (
                                <div className="d-flex justify-content-center">
                                    <div>
                                        <h3>Ошибка: {error}</h3>
                                    </div>
                                </div>
                            )}
                            {!loading &&
                                <div className="callout callout-info bg-light">
                                    <h5>{ticketInfo.title}</h5>
                                    <div>{ticketInfo.service_order_id !== null ? 'Обслуживание сайта' : ticketInfo.domain_order_id !== null ? 'Домены' : ticketInfo.hosting_order_id !== null ? 'Хостинг' : 'Общие вопросы'}</div>
                                    <div>{ticketInfo.order.url}</div>
                                </div>
                            }
                            {!loading && ticket.ticketMessages.length > 0  && ticket.ticketMessages.map(message => (
                                <div key={message.id} className={`direct-chat-msg ${message.user_role !== "admin" ? 'right' : ''}`}>
                                    <div className="direct-chat-infos clearfix">
                                        <span className={`direct-chat-name ${message.user_role !== "admin" ? 'float-right' : 'float-left'}`}>{message.user_name}</span>
                                        <span className={`direct-chat-timestamp ${message.user_role !== "admin" ? 'float-left' : 'float-right'}`}>{timeRule(message.updated_at)}</span>
                                    </div>
                                    <img className="direct-chat-img" src="/img/user1-128x128.jpg"
                                         alt="message user image"/>

                                    <div className="direct-chat-text bg-light" style={{whiteSpace:'pre-wrap'}}>
                                        {message.message}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed-bottom" style={{bottom: '3.5rem', zIndex: 100, height: '5.5rem'}}>
                <div className="content-wrapper bg-light p-2" style={{borderTop: '1px solid #dee2e6'}}>
                    <div className="container-fluid">
                        <form action="#" method="post">
                            <div className="input-group">
                                <textarea name="message"
                                          onChange={e => setComment(e.target.value)}
                                          value={comment}
                                          placeholder="Ваше сообщение ..."
                                          className="form-control"
                                          style={{resize: 'none'}}>
                                    {comment}
                                </textarea>
                                <span className="input-group-append">
                                  <button onClick={click} type="button" className="btn btn-primary">
                                      {loadingButton ?
                                          <Spinner
                                              className="mr-1"
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
                                  </button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
});

export default TicketsShow;