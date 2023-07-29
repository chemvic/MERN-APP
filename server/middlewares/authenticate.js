import jwt from 'jsonwebtoken';



const authenticate = async (req, res, next)=>{
    const {SECRET_KEY} = process.env;
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'');

// можно и  так 
//    const {authorization =""} =req.headers;
// const [bearer, token] = authorization.split(" ");

if (token) {
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
      
        req.userId = id;
        next();
    } catch (error) {
        return res.json({message:"Not authorized"});
    }
   
}
 else {
           return res.json({message:"Not authorized"});
    };
};
export default authenticate;
