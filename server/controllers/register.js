import User from '../models/user.js';
import bcrypt from 'bcryptjs';

 const  register = async (req, res)=>{
try {
    const {username, password}= req.body;
       
    const user = await User.findOne({username});
   
    if (user) {
        return res.status(409).json({message:'Username is already in use'});
    };

    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);
   
    const newUser = new User({
        username,
        password: hashedPass,
    })

    // const token = jwt.sign(
    //     {
    //         id: newUser._id,
    //     },
    //     process.env.JWT_SECRET,
    //     { expiresIn: '30d' },
    // )

    await newUser.save()

    res.status(201).json({"user":{
            "username": username,        
        }})
} catch (error) {
    console.log(error);
}
};
export default register;