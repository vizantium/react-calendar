import React from 'react';
import {Layout, Menu} from "antd";
import {useNavigate} from "react-router-dom";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAppDispatch} from "../redux/redux-store";
import {logOut} from "../redux/auth-slice";

const {Header} = Layout;


const Navbar: React.FC = () => {
    const navigate = useNavigate()
    const {isAuth, username} = useTypedSelector(state => state.authSlice)
    const dispatch = useAppDispatch()

    return (
        <Layout>
            <Header  className="header">
                {isAuth ?
                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        <Menu.Item
                            onClick={() => dispatch(logOut())}
                            key={1}
                        >
                            {isAuth === true ? username + ',' : ''} Выйти
                        </Menu.Item>
                    </Menu>
                    :
                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        <Menu.Item
                            onClick={()=>navigate('login')}
                            key={1}
                        >
                            Логин
                        </Menu.Item>
                    </Menu>

                }
            </Header>
        </Layout>
    );
};

export default Navbar;