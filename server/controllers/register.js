import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


 const  register = async (req, res)=>{
    const {SECRET_KEY}=process.env;
try {
    const {username, password}= req.body;

    const user = await User.findOne({username});
  
    if (user) {
        return res.json({message:'Username is already in use'});
    //    status(409).
    };

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);
   
    const newUser = new User({
        username,
        password: hashedPass,
    })

    const payload ={
        id: newUser._id,
    }
    const token =jwt.sign(payload, SECRET_KEY, {expiresIn:'23h'});

    await newUser.save()
// status(201).
    res.json({"user":{
            "username": username,        
        }, "token": token, message:"Registration seccess"})
} catch (error) {
    console.log(error);
}
};
export default register;