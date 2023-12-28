const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const SECRET_KEY=process.env.SECRET_KEY 

const authLoggedIn = (req,res,next)=>{

    try{
        let token =req.headers.authorization;
        if(token){
            token =token.split(" ")[1];
            const decodeToken =jwt.verify(token,SECRET_KEY);
            //req.userId=user.id;//added userid to req for next()
            req.userId=decodeToken.id//added user in req to access for next() functions
            
        }
        else
        {
            return res.status(401).json({message:"Unauthorized:not loggedin or token"});
        }
        console.log("Successfull auth loggedin")
        next();

    }catch(error){
        console.log(error)
        return res.status(401).json({message:"Unauthorized:in Authlogin"});
    }

}


const authAdmin= async(req,res,next)=>{

    const currUser=await userModel.findById(req.userId) //await important
    if(currUser.role !== "admin")
    {
        return res.status(401).json({message:"Unauthorized"});
    }
    next();
}


module.exports={authLoggedIn,
    authAdmin};