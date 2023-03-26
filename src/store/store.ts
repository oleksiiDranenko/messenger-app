import { configureStore } from "@reduxjs/toolkit";
import Messages from "./slices/Messages";
import RoomId from "./slices/RoomId";
import UserSelected from "./slices/UserSelected";

export const store = configureStore({
    reducer: {
        UserSelected: UserSelected,
        RoomId: RoomId,
        Messages: Messages
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;