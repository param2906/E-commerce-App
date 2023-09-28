const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter Product descriotion"]
    },
    price:{
        type:Number,
        required:[true,"Please enter Product descriotion"],
        maxLength:[8,"price can not exceed 8 character"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }

    ],
    category:{
        type:String,
        required:[true,"Please enter Product Category"]
    },
    stock:{
        type:String,
        required:[true,"Please enter Stock"],
        maxLength:[4,"stock can not exceed 8 character"]
    },
    numOfReview:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                require:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})

module.exports = mongoose.model("Product",productSchema)