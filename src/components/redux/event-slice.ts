import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EventType} from "../Event/Calendar";
import {userType} from "./auth-slice";
import axios from "axios";

export const fetchGuests = createAsyncThunk('eventSlice/fetchGuests' , async () => {
    const {data} = await axios.get('./users.json')
    return data
})

export const createEvents = createAsyncThunk('eventSlice/createEvents', async (event: EventType) => {
    const events = localStorage.getItem("events") || '[]'
    const json = JSON.parse(events) as EventType[]
    json.push(event)
    return json
})

type getEventsType = {
    guestName: string,
    authorName: string
}

export const getEvents = createAsyncThunk('eventsSlice/getEvent', async (username: string) => {
    const events = localStorage.getItem("events") || '[]'
    const json = JSON.parse(events) as EventType[]

    return {json, username}
})

type stateType = {
    events: EventType[]
    guests: userType[]
}

const initialState: stateType = {
    events: [],
    guests: []
}

const eventSlice = createSlice({
    name: 'eventSlice',
    initialState: initialState,
    reducers: {
        setGuests(state, action: PayloadAction<userType[]>) {
            state.guests = action.payload
        },
        setEvents(state, action: PayloadAction<EventType[]>) {
            state.events = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchGuests.fulfilled, (state, action) => {
            state.guests = action.payload
        })
        builder.addCase(createEvents.fulfilled, (state, action) => {
            state.events = action.payload
            localStorage.setItem("events", JSON.stringify(action.payload) )
        })
        builder.addCase(getEvents.fulfilled, (state, action) => {
            const currentUserEvents = action.payload.json.filter(ev =>
                ev.author === action.payload.username)
            state.events = currentUserEvents
        })
    }
})

export default  eventSlice.reducer