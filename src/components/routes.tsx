import React from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {useTypedSelector} from "./hooks/useTypedSelector";
import Login from "./Login/Login";
import Event from "./Event/Event"

function AppRoutes() {
    const {isAuth} = useTypedSelector(state => state.authSlice)

    return (
        isAuth ?
            <Routes>
                <Route path={'login'} element={<Login/>}/>
                <Route path={''} element={<Event/>}/>
            </Routes>
            :

            <Routes>
                <Route path={'login'} element={<Login/>}/>
                <Route path="" element={<Navigate to="login"/>}/>
            </Routes>
    );
};

export default AppRoutes;