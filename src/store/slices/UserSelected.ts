import { createSlice } from "@reduxjs/toolkit";

interface UserInterface {
    displayName?: string,
    photoURL?: string,
    uid?: string
}

const initialState: UserInterface = {};

export const UserSelected = createSlice({
    name: 'UserSelected',
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload 
        }
    }
})

export default UserSelected.reducer;
export const {setUser} = UserSelected.actions;