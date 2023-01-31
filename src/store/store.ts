import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./slices/events";

export const store = configureStore({
    reducer: {
        event: eventsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch