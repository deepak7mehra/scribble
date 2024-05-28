import { createSlice, configureStore } from '@reduxjs/toolkit';


const socketSlice = createSlice({
    name : 'socket',
    initialState:{
        socket : null
    },
    reducers:{
        setSocket(state,action){
            state.socket = action.payload
        },

        removeSocket(state){
            state.socket = null;
        }
    }

})

export default socketSlice.reducer;
export const {setSocket,removeSocket} = socketSlice.actions;