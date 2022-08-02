import React, {ChangeEvent, useState} from 'react';
import {Button, Form, Input} from "antd";
import {StateType, useAppDispatch} from "../redux/redux-store";
import {getUsers} from "../redux/auth-slice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const LoginForm:React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {isLoading, error, isAuth} = useSelector((state: StateType) => state.authSlice)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')



    const submit = () => {
        dispatch(getUsers({
            username: username,
            password: password
        }))
    }

    return (
            <Form
                onFinish={submit}
            >
                {error && <Form.Item style={{color: 'red'}}>
                    {error}
                </Form.Item>}
                <Form.Item
                    label="Имя пользователя"
                    name="username"
                    rules={[{ required: true, message: 'Введите имя пользователя' }]}
                >
                    <Input value={username} onChange={e => setUsername(e.target.value)}/>
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль' }]}
                >
                    <Input type={'password'} value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
    );
};

export default LoginForm;