import { createSlice } from "@reduxjs/toolkit";

interface RoomInterface {
    roomId?: string,
}

const initialState: RoomInterface = {};

export const RoomId = createSlice({
    name: 'roomId',
    initialState,
    reducers: {
        setRoomId(state, action){
            return action.payload
        }
    }
})

export default RoomId.reducer;
export const { setRoomId } = RoomId.actions;