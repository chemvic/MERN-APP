import User from '../models/user.js';

const getMe = async (req, res)=>{
try {
   
   const user =  await User.findById(req.user._id);

   if(!user){
    return res.json({message:"Not authorized"});
   // .status(401)
   };
   const token = jwt.sign(
    {
        id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' },
)

res.json({
    user,
    token,
})
    
} catch (error) {
     return res.json({message:"Not authorized"});
     //.status(401)
}
};
export default getMe;