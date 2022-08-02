import React from 'react';
import {Calendar} from "antd";
import {Moment} from "moment";
import {formatDate} from "../utils/date";

export type EventType = {
    author: string,
    guest: string,
    date: string,
    description: string
}

type EventTypeCalendar = {
    events: EventType[]
}

const EventCalendar: React.FC<EventTypeCalendar> = (props) => {

    const dateCellRender = (value: Moment) => {
        const formatedDate = formatDate(value.toDate())
        const currentDayEvents = props.events.filter(ev => ev.date === formatedDate)
        console.log(value, formatedDate, currentDayEvents)
        return (
            <div>
                {currentDayEvents.map((ev, index) => <div key={index}>{ev.description}</div>)}
            </div>
        );
    };

    return (
            <Calendar
                dateCellRender={dateCellRender}
            />
    );
};

export default EventCalendar;