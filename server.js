const express = require('express')
const app = express()
const port = 4000
require("dotenv/config")
const multer = require("multer")
const upload = multer()
const cookieParser = require("cookie-parser")
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectID
const bcrypt = require("bcryptjs")
const validator = require("./validators")
const SALT_FACTOR = 10

let dbo = undefined
let sessions = {}


/* Middleware */
app.use(express.json())
app.use(cookieParser())
app.use("/", express.static("uploads"))


MongoClient.connect(
    process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(client => {
    dbo = client.db("Comedy-booker")
    console.log("\nConnected to Mongo DB!\n")
}).catch(err => console.log(err))







/* GET */


app.get("/test", (req, res)=>{
    res.json("hi from the server")
})



const generateId = () => {
    return "" + Math.floor(Math.random() * 1000000)
}



/* POST */















app.listen(port, ()=> {
    console.log("Server running on port:", port)
})

