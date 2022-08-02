import React, {useEffect} from 'react';
import {Card, Layout, Row} from "antd";
import LoginForm from "./LoginForm";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useNavigate} from "react-router-dom";

const Login:React.FC = () => {
    const {isAuth} = useTypedSelector(state => state.authSlice)
    const navigate = useNavigate()
    debugger;
    useEffect(() => {
        if(isAuth) {
            navigate('/')
        }
    },[isAuth])

    return (
        <Layout>
            <Row justify={"center"} align={"middle"} className={'h100'}>
                <Card><LoginForm/></Card>
            </Row>
        </Layout>
    );
};

export default Login;