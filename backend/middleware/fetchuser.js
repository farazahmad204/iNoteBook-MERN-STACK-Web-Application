const jwt = require("jsonwebtoken");
const JWT_SECERT_KEY = "This is seceret key$SECERET";


const fetchuser=(req,res,next)=>{

// get user from the JWT token and add id to req object

    const token=req.header('auth-token');

    if(!token)
    {
        res.status(401).send({error:"Please enter a valid auth token!"});
    }

    try{
        
        const data= jwt.verify(token,JWT_SECERT_KEY);
        req.user=data.user;
        next();

    }
    catch(error)
    {
        res.status(401).send({error:"Please enter a valid auth token!"});
    }
   


}

module.exports= fetchuser;