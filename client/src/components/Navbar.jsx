import React from "react";
import { Link, NavLink } from "react-router-dom";
 
export const Navbar = ()=>{
    let isAuth = false;
    const activeStyles={
        color: 'white',

    }
    return <div className="flex py-4 justify-between items-center">
        <span className="flex justify-center items-center w-6 h-6 bg-gray 600 text-xs text-white rounded-sm">E</span>
        {isAuth && (<ul className="flex gap-8">
            <li>
                <NavLink to={'/'} href="/" className="text-xs text-gray-400 hover:text-white" style={({isActive})=>isActive?activeStyles:undefined}>Main</NavLink>
            </li>
            <li>
                 <NavLink to={'/posts'} href="/posts" className="text-xs text-gray-400 hover:text-white" style={({isActive})=>isActive?activeStyles:undefined}>My posts</NavLink>
            </li>  
            <li>
                 <NavLink to={'/new'} href="/new" className="text-xs text-gray-400 hover:text-white" style={({isActive})=>isActive?activeStyles:undefined}>Add new post</NavLink>
            </li>            
        </ul>)}

        {isAuth ? <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
            <button>Logout</button>
        </div> : <Link to={'/login'} className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">Login</Link>}
        </div>
}