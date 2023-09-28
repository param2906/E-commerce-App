const ErrorHandle = require('../utils/errorhandle')
const catchAsyncError = require('./catchAsyncError')
const jwt = require("jsonwebtoken")
const user = require("../models/userModels")

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    
    const  token =  req.header('Authorization')
    if(!token){
        return next(new ErrorHandle("Please login to access this resource",401))
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET)

    req.user  = await user.findById(decode.id)
    
    next()
})

exports.authorizeroles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandle(`Role ${req.user.role} is not allowed to access this resource`,401))
        }
        next()
    }
    
}