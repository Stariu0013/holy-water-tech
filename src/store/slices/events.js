import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events: [],
    selectedEvent: null,
};

export const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        pushEvents: (state, action) => {
            state.events = [...state.events, action.payload];
        },
        updateEvent: (state, action) => {
            state.events = state.events.map(event => event.id === action.payload.id ? action.payload : event);
            state.selectedEvent = null;
        },
        removeEvent: (state, action) => {
            state.events = state.events.filter(event => event.id !== action.payload.id);
            state.selectedEvent = null;
        },
        setSelectedEvent: (state, action) => {
            state.selectedEvent = action.payload;
        },
        getEventsFromLocalStorage: (state, action) => {
            const savedEvents = localStorage.getItem("savedEvents");

            state.events = savedEvents ? JSON.parse(savedEvents) : [];
        },
    },
});

export const {
    pushEvents,
    updateEvent,
    removeEvent,
    setSelectedEvent,
    getEventsFromLocalStorage,
} = eventsSlice.actions;

export default eventsSlice.reducer;
