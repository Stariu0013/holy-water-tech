import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "./slices/events";

export const store = configureStore({
    reducer: {
        event: eventsSlice,
    }
});
