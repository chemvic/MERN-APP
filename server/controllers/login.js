import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const login = async (req, res)=>{
try {
    const {username, password} = req.body;
    const {SECRET_KEY}=process.env;
   
    const user = await User.findOne({username});
    if (!user) {
        return res.status(401).json({message:"Email is Not authorized"});
    };
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({message:"Password is wrong"})
    };
    const payload ={
        id:user._id,
    }
    const token =jwt.sign(payload, SECRET_KEY, {expiresIn:'23h'});

    await User.findByIdAndUpdate(user._id, {token});

    res.status(200).json({"token": token,
    "user":{
        "username": username
    }});
    
} catch (error) {
    console.log(error);
}
};
export default login;