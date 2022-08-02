import React from 'react';
import './App.css';
import AppRoutes from "./components/routes";
import Navbar from "./components/Navbar/Navbar";
import {Layout} from "antd";
import 'antd/dist/antd.css';

function App() {
    return (
        <Layout>
            <Navbar/>
            <Layout.Content>
                <AppRoutes/>
            </Layout.Content>
        </Layout>
    );
}

export default App;
