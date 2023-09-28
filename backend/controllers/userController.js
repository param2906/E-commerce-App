const User = require("../models/userModels")
const ErrorHandle = require("../utils/errorhandle")
const catchAsyncError = require("../middleware/catchAsyncError")
const sendToken = require("../utils/jwtToken")
const sendEmail =require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary = require("cloudinary")

exports.registerUser = catchAsyncError(async(req,res,next)=>{
    
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale"
    })
    const {name,email,password} = req.body
    
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url 
        }
    });
    sendToken(user,201,res)
})

exports.loginuser = catchAsyncError(async(req,res,next)=>{
    const {email, password} = req.body

    if(!email || !password){
        return next(new ErrorHandle("please Enter Email & Password",400));
    }
    const user =await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandle("Email or password is wrong",400))
    }

    const isPasswordMatched =await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandle("Invalid email or passowrd ",401))
    }
    sendToken(user,200,res)
})


exports.logout = catchAsyncError(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success: true,
        message:"Logout"
    })
})


exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email})

    if(!user){
        return next(new ErrorHandle("User not found",401))
    }
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false})

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

    const message = `Your passowrd reset token is:- \n\n ${resetPasswordUrl} \n\n  If you have not requested this email, then please ignore it`

    try {
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Passowrd recovery`,
            message,
        })

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandle(error.message,500))
    }
})


exports.resetPassowrd = catchAsyncError(async(req,res,next)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if(!user){
        return next(new ErrorHandle("Reset Passowrd toke is invalid or been expired",400))
    }
    if(req.body.password!==req.body.confirmPassowrd){
        return next(new ErrorHandle("Both password must be same",400))
    }
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()

    sendToken(user,200,res);
})

exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success:true,
        user,
    })
})

exports.updatePassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
    if(!isPasswordMatched){
        return next(new ErrorHandle("Old Password is incorrect",400))
    }
    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandle("Both password is not match",400))
    }
    user.password = req.body.newPassword;
    await user.save()
    
    sendToken(user,200,res)
})


exports.updateProfile = catchAsyncError(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    })

    res.status(200).json({
        success:true
    })
})

exports.getAllUser = catchAsyncError(async(req,res,next)=>{

    const users = await User.find();
    res.status(200).json({
        success:true,
        users
    })
})

exports.getSingleUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandle("User does not exists"),400)
    }

    res.status(200).json({
        success:true,
        user
    })
})

exports.updateUserRole = catchAsyncError(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    })

    res.status(200).json({
        success:true,
        user
    })
})

exports.deleteUser = catchAsyncError(async(req,res,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandle(`user not exist with Id: ${req.params.id}`),400)
    }

    await user.deleteOne()

    res.status(200).json({
        success:true,
        message:`user deleted successfully`
    })
})