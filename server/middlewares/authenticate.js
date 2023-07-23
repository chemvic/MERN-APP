import jwt from 'jsonwebtoken';
import User from '../models/user.js';
const {SECRET_KEY} = process.env;


const authenticate = async (req, res, next)=>{
    const token = (req.headers.authoization || '').replace(/Bearer\s?/,'');

// можно и  так 
//    const {authorization =""} =req.headers;
// const [bearer, token] = authorization.split(" ");

if (token) {
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if(!user|| !user.token || user.token !== token){
            return res.status(401).json({message:"Not authorized"}); 
        }
        req.user= user;
        next();
    } catch (error) {
        return res.status(401).json({message:"Not authorized"});
    }
   
}
 else {
           return res.status(401).json({message:"Not authorized"});
    };
};
export default authenticate;