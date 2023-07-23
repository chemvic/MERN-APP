import User from '../models/user.js';

const getMe = async (req, res)=>{
try {
    const {username, token} =req.user;
//    const user =  await User.findById(req.user._id);

//    if(!user){
//     return res.status(401).json({message:"Not authorized"});
//    };
   res.json({"username":username,
"token": token})
    
} catch (error) {
     return res.status(401).json({message:"Not authorized"});
}
};
export default getMe;