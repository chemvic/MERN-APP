import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null
};

export const registerUser = createAsyncThunk('auth/registerUser', 
    async({username, password})=>{
    try {
        const {data} = await axios.post('/auth/register', {
            username,
            password
        });
        if (data.token) {
            window.localStorage.setItem('token', data.token);
        };
        return data;
    } 
    catch (error) {
        console.log(error);
    }
});
export const loginUser = createAsyncThunk('auth/loginUser', 
    async({username, password})=>{
    try {
        const {data} = await axios.post('/auth/login', {
            username,
            password
        });
        if (data.token) {
            window.localStorage.setItem('token', data.token);
        };
        return data;
    } 
    catch (error) {
        console.log(error);
    }
});

export const getMe = createAsyncThunk('auth/loginUser', 
    async()=>{
    try {
        const {data} = await axios.get('/auth/me');
        console.log("Это проверка даты: ",data);
        return data;
    } 
    catch (error) {
        console.log(error);
    }
});

 export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout: (state)=>{
             state.user= null;
             state.token= null;
             state.isLoading= false;
             state.message= null
        }
    },
    extraReducers:  {
        // Register user
        [registerUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [registerUser.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        // Login user
        [loginUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [loginUser.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
        // Проверка авторизации
        [getMe.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
        },
        [getMe.rejectWithValue]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
    },


        // (builder) =>{
        // builder
        // // registerUser
        // .addCase(registerUser.pending,(state, _)=>{
        //   state.isLoading=true;
        //   state.message=null;
        // } )
        // .addCase(registerUser.fulfilled, (state, action)=>{
        //   state.isLoading=false;
        //   state.user=action.payload.user;
        //   state.message=action.payload.message;
        //   state.token=action.payload.token;

        // })
        // .addCase(registerUser.rejected, (state, action)=>{
        //   state.isLoading=false;
        //   state.message=action.payload.message;
        // })
        // //loginUser
        //  .addCase(loginUser.pending,(state, _)=>{
        //   state.isLoading=true;
        //   state.message=null;
        // } )
        // .addCase(loginUser.fulfilled, (state, action)=>{
        //   state.isLoading=false;
        //   state.user=action.payload.user;
        //   state.message=action.payload.message;
        //   state.token=action.payload.token;

        // })
        // .addCase(loginUser.rejected, (state, action)=>{
        //   state.isLoading=false;
        //   state.message=action.payload.message;
        // })
        // //authorization check
        //  .addCase(getMe.pending,(state, _)=>{
        //   state.isLoading=true;
        //   state.message=null;
        // } )
        // .addCase(getMe.fulfilled, (state, action)=>{
        //   state.isLoading=false;
        //   state.user=action.payload?.user;
        //   state.message=null;
        //   state.token=action.payload?.token;

        // })
        // .addCase(getMe.rejected, (state, action)=>{
        //   state.isLoading=false;
        //   state.message=action.payload.message;
        // })
  

 });

 export const checkIsAuth = (state) => Boolean(state.auth.token);
 
 export default authSlice.reducer;