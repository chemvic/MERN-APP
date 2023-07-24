import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../../utils/axios';


const initialState= {
    user: null,
    token: null,
    isLoading: false,
    status: null,
};
export const registerUser = createAsyncThunk('auth/registerUser', async (username, password)=>{
    try {
        const {data} =await axios.post('/auth/register', {username, password});
        if (data.token) {
            window.localStorage('token',data.token);
        };
        return data;
    } catch (error) {
        
    }
})

export const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [registerUser.pending]: (state)=>{
            state.isLoading = true;
            state.status = null;
        },
        [registerUser.fulfilled]: (state, action)=>{
            state.isLoading = false;
            state.status = action.payload.message;
            state.user = action.payload.user;
        },
        },
        [registerUser.rejected]: (state, action)=>{
            state.status = 
        },
    }
});

export const authReducer = authSlice.reducer;