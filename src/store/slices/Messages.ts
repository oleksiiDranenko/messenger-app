import { createSlice } from "@reduxjs/toolkit";

interface MessageInterface {
    roomId: string,
    userId: string,
    value: string,
    createdAt: string,
    id?: string,
    replyTo?: string,
    photoURL?: string
}

const initialState: MessageInterface[] = [];

export const Messages = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessagesArray(state, action){
            return action.payload
        }
    }
})

export default Messages.reducer;
export const { setMessagesArray } = Messages.actions;