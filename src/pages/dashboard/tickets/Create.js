import {useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {DASHBOARD_ROUTE, INDEX_CUSTOMER_SERVICES_ROUTE, INDEX_TICKETS_ROUTE} from "../../../utils/consts";
import {createOrderService, createService, indexService} from "../../../http/serviceAPI";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ContentHeader from "../../../components/ContentHeader";
import {Context} from "../../../index";
import {createTicket, indexTicket} from "../../../http/ticketAPI";

const TicketCreate = () => {
    const navigate = useNavigate();
    const {ticket} = useContext(Context);
    const [tickets,setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const order = ['hosting_order_id', 1];
    const hrefs = [
        { href: DASHBOARD_ROUTE, name: "Главная" },
        { href: DASHBOARD_ROUTE + '/' + INDEX_TICKETS_ROUTE, name: "Поддержка" },
        { name: "Написать в поддержку" },
    ];

    useEffect(()=>{
        setLoading(true);
        indexTicket().then(data => {
            ticket.setTicket(data.tickets);
            setTickets(data.tickets);
        }).finally(()=>{
            setLoading(false);
        })
            .catch(err => console.log(err));
    },[]);

    useEffect(() => {
        //loading
    },[tickets]);

    const click = async () => {
        try {
            setLoading(true);
            let data;
            data = await createTicket(title, message, order);
            console.log(data);
            //if(data.success) navigate(DASHBOARD_ROUTE + '/' + INDEX_CUSTOMER_SERVICES_ROUTE);
        } catch (e) {
            console.log(e.response.data.message);
        }

    };

    return(
        <>
            <ContentHeader hrefs={hrefs} name="Написать в поддержку"/>
            <section className="content">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Ваше обращение</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="inputTitle">Заголовок (тема)</label>
                            <input type="text" id="inputTitle" name="title" value={title}
                                   onChange={e => setTitle(e.target.value)}
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputMessage">Текст сообщения</label>
                            <textarea id="inputMessage" name="message"
                                      onChange={e => setMessage(e.target.value)}
                                      value={message}
                                      className="form-control" rows="4">{message}</textarea>
                        </div>
                    </div>
                </div>
                <div className="row pb-3">
                    <div className="col-12">
                        <Button onClick={() => {navigate(DASHBOARD_ROUTE + '/' + INDEX_TICKETS_ROUTE);}} className="btn btn-secondary "
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
                            Создать заказ
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TicketCreate;