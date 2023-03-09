
import './datePicker.css';
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const oneDay = 60 * 60 * 24 * 1000;
const todayTimestamp = Date.now() - (Date.now() % oneDay) + (new Date().getTimezoneOffset() * 1000 * 60);


const DatePicker = observer(({onChange}) => {
    const {domain} = useContext(Context);
    const [show,setShow] = useState(false);
    const [node, setNode] = useState(null);
    const [selectedDay, setSelectedDay] = useState(todayTimestamp);
    const [monthDetails, setMonthDetails] = useState([]);
    const date = new Date();
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth());

    const daysMap = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    const monthMap = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];


    useEffect(()=>{
        setNode(document.querySelectorAll(".mdp-container"));
    },[show]);
    useEffect(()=>{
        window.addEventListener('click', addBackDrop);
    },[node]);

    useEffect(()=>{
        setMonthDetails(getMonthDetails(year, month));
    },[month, year]);

    const addBackDrop = e => {
        if(node) {
            if (node.length > 0) {
                for (let i = 0, element; element = node[i]; i++) {
                    if (show && !element.contains(e.target)) {
                        setShow(false);
                        setNode(null);
                        window.removeEventListener('click', addBackDrop);
                    }
                }

            }
        }
    }
    const getNumberOfDays =(year, month)=> {
        return 40 - new Date(year, month, 40).getDate();
    }

    const getDayDetails =args=> {
        let date = args.index - args.firstDay + 1;
        let day = args.index%7;
        let prevMonth = args.month-1;
        let prevYear = args.year;
        if(prevMonth < 0) {
            prevMonth = 11;
            prevYear--;
        }
        let prevMonthNumberOfDays = getNumberOfDays(prevYear, prevMonth);
        let _date = (date < 0 ? prevMonthNumberOfDays+date : date % args.numberOfDays) + 1;
        let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
        let timestamp = new Date(args.year, args.month, _date).getTime();
        return {
            date: _date,
            day,
            month,
            timestamp,
            dayString: daysMap[day]
        }
    }

    const getMonthDetails =(year, month)=> {
        let firstDay = (new Date(year, month)).getDay();
        firstDay = firstDay === 0 ? 7 : firstDay;
        let numberOfDays = getNumberOfDays(year, month);
        let monthArray = [];
        let rows = 6;
        let currentDay = null;
        let index = 0;
        let cols = 7;

        for(let row=0; row<rows; row++) {
            for(let col=0; col<cols; col++) {
                currentDay = getDayDetails({
                    index,
                    numberOfDays,
                    firstDay,
                    year,
                    month
                });
                monthArray.push(currentDay);
                index++;
            }
        }
        return monthArray;
    }

    const isCurrentDay =day=> {
        return day.timestamp === todayTimestamp;
    }

    const isSelectedDay =day=> {
        return day.timestamp === selectedDay;
    }

    const onDateClick =day=> {
        setShow(false);
        window.removeEventListener('click', addBackDrop);
        setSelectedDay(day.timestamp);
        onChange(day.timestamp);

    }
    const getMonthStr =month=> monthMap[Math.max(Math.min(11, month), 0)] || 'Month';
    const days = monthDetails.map((day, index)=> {
        return (
            <div className={'c-day-container ' + (day.month !== 0 ? ' disabled' : '') +
                (isCurrentDay(day) ? ' highlight' : '') + (isSelectedDay(day) ? ' highlight-green' : '')} key={index}>
                <div className='cdc-day'>
                        <span onClick={()=>{
                            onDateClick(day);
                            setShow(false);
                        }}>
                            {day.date}
                        </span>
                </div>
            </div>
        )
    })

    return(
        <>
        <div className="input-group-text" onClick={() => setShow(true)}>
            <i className="fa fa-calendar"></i>
        </div>
            {show ?
                <div className='mdp-container'>
                    <div className='mdpc-head'>
                        <div className='mdpch-button'>
                            <div className='mdpchb-inner' onClick={()=> setYear(year-1)}>
                                <span className='mdpchbi-left-arrows'></span>
                            </div>
                        </div>
                        <div className='mdpch-button'>
                            <div className='mdpchb-inner' onClick={()=> {
                                month === 0 ? setYear(year-1) : null;
                                setMonth(month === 0 ? 11 : month-1);

                            }}>
                                <span className='mdpchbi-left-arrow'></span>
                            </div>
                        </div>
                        <div className='mdpch-container'>
                            <div className='mdpchc-year'>{year}</div>
                            <div className='mdpchc-month'>{getMonthStr(month)}</div>
                        </div>
                        <div className='mdpch-button'>
                            <div className='mdpchb-inner' onClick={()=> {
                                month === 11 ? setYear(year+1) : null;
                                setMonth(month === 11 ? 0 : month+1);
                            }}>
                                <span className='mdpchbi-right-arrow'></span>
                            </div>
                        </div>
                        <div className='mdpch-button' onClick={()=> setYear(year+1)}>
                            <div className='mdpchb-inner'>
                                <span className='mdpchbi-right-arrows'></span>
                            </div>
                        </div>
                    </div>
                    <div className='mdpc-body'>
                        <div className='c-container'>
                            <div className='cc-head'>
                                {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map((d,i)=><div key={i} className='cch-name'>{d}</div>)}
                            </div>
                            <div className='cc-body'>
                                {days}
                            </div>
                        </div>
                    </div>
                </div>
                :
                ''
            }
        </>
    );
});

export default DatePicker;