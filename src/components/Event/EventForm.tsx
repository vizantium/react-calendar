import React, {useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {userType} from "../redux/auth-slice";
import {EventType} from "./Calendar";
import {Moment} from "moment";
import {formatDate} from "../utils/date";
import {useSelector} from "react-redux";
import {StateType} from "../redux/redux-store";

type EventFormType = {
    guests: userType[],
    submit: (event: EventType) => void
}

const EventForm: React.FC<EventFormType> = (props) => {
    const [event, setEvent] = useState<EventType>({
        author: '',
        date: '',
        guest: '',
        description: ''
    } as EventType)
    const {username} = useSelector((state: StateType) => state.authSlice)
    const selectDate = (date: Moment | null ) => {
        if(date) {
            setEvent({...event, date:formatDate(date.toDate()) })
        }
    }

    const submitForm = () => {
        props.submit({...event, author: username as string})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Описание события"
                name="description"
                rules={[{required: true, message: 'Обязательное поле'}]}
            >
                <Input
                    onChange={e => setEvent({...event, description: e.target.value})}
                    value={event.description}
                />
            </Form.Item>
            <Form.Item
                label="Дата события"
                name="date"
                rules={[{required: true, message: 'Обязательное поле'}]}
            >
                <DatePicker
                    onChange = {(date) => selectDate(date)}
                />
            </Form.Item>
            <Form.Item
                label={'Выберите гостя'}
                name={'guest'}
                rules={[{required: true, message: 'Обязательное поле'}]}
            >
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                    {props.guests.map(guest =>
                        <Select.Option key={guest.username} value={guest.username}>
                            {guest.username}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Row justify={'end'}>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Создать
                    </Button>
                </Form.Item>
            </Row>

        </Form>
    );
};

export default EventForm;