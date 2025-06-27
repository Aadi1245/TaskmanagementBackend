const asyncHandler= require("express-async-handler");
const jwt = require("jsonwebtoken");


const validatToken =asyncHandler(async (req,res,next)=>{
    let token;
    let authHeader= req.headers.authorization||req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token= authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized or token is expired!");
            }

            console.log("The decoded token is :", decoded);
            req.user=decoded.user;
            next();

        });
        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing!");
        }
    }
});

module.exports=validatToken;