import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

import { checkIsAuth, registerUser } from "../redux/features/auth/authSlice";


 
export const RegisterPage = ()=>{
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const { status } = useSelector(state=> state.auth)
    const dispatch = useDispatch();

    const navigate =useNavigate();
    let isAuth = useSelector(checkIsAuth);

    useEffect(()=>{
        if(status){
            toast(status);
        };
        if (isAuth) {
            navigate('/');
        }
    }, [status, navigate, isAuth]);

    const handleSubmit = () => {
        try {
            dispatch(registerUser({username, password}));
            setUsername ('');
            setPassword ('');
            
        } catch (error) {
            console.log(error);
        }
    }

    return <form onSubmit={(event)=>event.preventDefault()} className="w-1/4 h-60 mx-auto mt-40">
    <h1 className="text-lg text-white text-center">Registration</h1>
    <label className="text-xs text-gray-400">
        Username:
        <input 
        type="text"
        value = {username}
        onChange={(event)=>setUsername(event.target.value)}
        placeholder="Enter your name"
        className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"/>
    </label>
    <label className="text-xs text-gray-400">
        Password:
        <input 
        type="password"
        value = {password}
        onChange={(event)=>setPassword(event.target.value)}
        placeholder="Password"
        className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"/>
    </label>
    <div className="flex gap-8 justify-center mt-4">
        <button type="submit" onClick={handleSubmit} className="flex justify-center items-center bg-gray-500 text-xs text-white rounded-sm py-2 px-4">
            Register
        </button>
        <Link to={'/login'} className="flex justify-center items-center text-xs text-white">Registered?</Link>
    </div>
    </form>
}