const Product = require("../models/productsModel")
const ErrorHandle = require("../utils/errorhandle")
const catchAsyncError = require("../middleware/catchAsyncError")
const ApiFeature = require("../utils/apiFeature")


exports.createProduct =catchAsyncError(async (req,res,next)=>{

    req.body.user = req.user.id
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})

exports.getAllProduct = catchAsyncError(async (req,res) =>{

    const resultPerPage = 5;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeature(Product.find(), req.query)
      .search()
      .filter()
    const pro = await apiFeature.query
    const filteredProductsCount = pro.length
    const apiFeatures = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
  
    const products = await apiFeatures.query;
  
    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
      });
})

exports.updateProduct = catchAsyncError(async (req,res,next)=>{
    let product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandle("Product not found",404));
    }

    product  = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(201).json({
        success:true,
        product
    })
})

exports.deleteProdcut = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandle("Product not found",404));
    }
    await product.deleteOne()
    res.status(200).json({
        success:true,
        message:"product is delete"
    })
})

exports.getProductDetails = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandle("Product not found",404));
    }
    res.status(201).json({
        success:true,
        product
    })
    
})

exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });

exports.createProductReview = catchAsyncError(async(req,res,next)=>{

    const {rating,comment,productId} = req.body

    const review = {
        user:req.user.id,
        name:req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(rev=>rev.user.toString()===req.user._id.toString())

    if(isReviewed){
        product.reviews.forEach(rev=>{
            if(rev.user.toString() === rev.user._id.toString()){
                rev.rating = rating,
                rev.comment = comment
            }
        })

    }
    else{
        product.reviews.push(review)
        product.numOfReview = product.reviews.length

    }
    let avg=0;
    product.reviews.forEach(rev=>{
        avg +=rev.rating   
    })
    product.ratings = avg /product.reviews.length

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true
    })


})

exports.getProductReview = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.id)
    console.log(req.query.id)
    if(!product){
        return next(new ErrorHandle(`Product not found`,404))
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})

exports.deleteProdcutreview = catchAsyncError(async(req,res,next)=>{ 
    const product = await Product.findById(req.query.productId)
    if(!product){
        return next(new ErrorHandle("Product not found",404));
    }
    const reviews = product.reviews.filter((rev)=>rev._id.toString()!==req.query.id.toString())
    let avg=0;
    reviews.forEach((rev)=>{
        avg +=rev.rating   
    })
    let ratings = 0;
    
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }

    const numOfReview = reviews.length
    await Product.findByIdAndUpdate(
    req.query.productId,
    {
        reviews,
        ratings,
        numOfReview,
    },
    {
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,   
    })
})