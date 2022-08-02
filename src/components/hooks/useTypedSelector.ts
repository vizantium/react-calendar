import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "@reduxjs/toolkit/dist/query/core/apiState";
import {StateType} from "../redux/redux-store";


export const useTypedSelector: TypedUseSelectorHook<StateType> = useSelector