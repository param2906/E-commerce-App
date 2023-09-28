const express = require("express")
const errorMidddleware = require('./middleware/error')
const app = express();
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
app.use(cors({
    origin:"http://localhost:3000"
}))
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

const product = require('./routes/productRoute')
const order = require('./routes/orderRoute')

const user = require('./routes/userRoute')

app.use("/api/v1",user)
app.use("/api/v1",product)
app.use("/api/v1",order)
app.use(errorMidddleware)

module.exports = app
