const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")

const userSchema =  mongoose.Schema({
    name:{
        type:String,
        required:[true,"required name"],
        maxLength:[30,"name should less than 30"], 
        minlength:[4,"name should be more than 4"]
    },
    email:{
        type:String,
        require:[true,"required email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]

    },
    password:{
        type:String,
        required:[true,"enter your password"],
        minlength:[8,"password should be greater than 8"],
        select:false,

    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    role:{
        type: String,
        default: "user"
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.getJWTToken = function() {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

userSchema.methods.comparePassword =async function(enterPassowrd){
    return await bcrypt.compare(enterPassowrd,this.password)
}

module.exports = mongoose.model("User",userSchema)