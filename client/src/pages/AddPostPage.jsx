import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../redux/features/post/postSlice";
import { useNavigate } from "react-router-dom";
 
export const AddPostPage = ()=>{
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = () => {
        try {
          const data = new FormData()  ;
          data.append('title', title);
          data.append('text', text);
          data.append('image', image);
          dispatch(createPost(data));
          navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    const formResetHandler = () => {
        setText('');
        setTitle('');
    };

    return <form className="w-1/3 mx-auto py-10" onSubmit={(event)=>event.preventDefault()}>
        <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center
        border-2 border-dotted cursor-pointer">Add image:
        <input type="file" onChange={(event)=>setImage(event.target.files[0])} className="hidden"/>
        </label>
        <div className="flex object-cover py-2">
          {image &&  <img src={URL.createObjectURL(image)} alt="someImage" />}  
        </div>
        <label className="text-xs text-white opacity-70">Posts header:
        <input type="text" value={title} onChange={(event)=>setTitle(event.target.value)} placeholder="Posts header"  className="mt-1 text-black w-full rounded-lg
        bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"/>
        </label>
        <label className="text-xs text-white opacity-70">Text:
        <textarea value={text} onChange={(event)=>setText(event.target.value)} placeholder="Post"  className="mt-1 text-black w-full rounded-lg
        bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700"/>
        </label>
        <div className="flex gap-8 items-center justify-center mt-4">
            <button onClick={submitHandler} className="flex items-center text-white justify-center text-xs bg-gray-600 rounded-sm py-2 px-4">Add post</button>
            <button onClick={formResetHandler} className="flex items-center text-white justify-center text-xs bg-red-500 rounded-sm py-2 px-4">Cancel</button>
        </div>
        </form>
};