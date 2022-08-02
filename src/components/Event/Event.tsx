import React, {useEffect, useState} from 'react';
import EventCalendar, {EventType} from "./Calendar";
import {Button, Modal, Row} from "antd";
import EventForm from "./EventForm";
import {StateType, useAppDispatch} from "../redux/redux-store";
import {createEvents, fetchGuests, getEvents} from "../redux/event-slice";
import {useSelector} from "react-redux";

const Event:React.FC = () => {
    const [visible,  setVisible] = useState(false)
    const dispatch = useAppDispatch()
    const {guests, events} = useSelector((state:StateType) => state.eventSlice)
    const {username} = useSelector((state:StateType) => state.authSlice)


    useEffect(() => {
        dispatch(fetchGuests())
        dispatch(getEvents(username as string))
    },[])

    const addNewEvent = (event: EventType) => {
        setVisible(false);
        dispatch(createEvents(event))
    }

    return (
        <div>
            <EventCalendar events={events}/>
            <Row justify={'center'}>
                <Button
                    onClick={() => setVisible(true)}
                >Добавить событие </Button>
            </Row>
            <Modal
                title={'Добавить событие'}
                visible={visible}
                footer={null}
                onCancel={() => setVisible(false)}
            >
                <EventForm
                    guests={guests}
                    submit={addNewEvent}
                />
            </Modal>
        </div>
    );
};

export default Event;