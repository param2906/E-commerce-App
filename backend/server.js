const app = require("./app");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary")
const dotenv = require("dotenv")

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`)
    console.log(`shutting down the server due to uncaughtException`)

    process.exit(1)
})

dotenv.config({path:"backend/config/config.env"});

connectDatabase();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})

process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`)
    console.log(`shutting down the server due to unhandle Rejection`)
    server.close(()=>{
        process.exit(1)
    })
})

