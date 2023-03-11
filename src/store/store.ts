import { configureStore } from "@reduxjs/toolkit";
import UserSelected from "./slices/UserSelected";

export const store = configureStore({
    reducer: {
        UserSelected: UserSelected
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;