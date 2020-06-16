const express = require('express')
const app = express()
require("dotenv/config")
const userRouter = require("./routers/user")
const eventRouter = require("./routers/event")
const purchaseRouter = require("./routers/purchase")
const cors = require("cors")

/*=============
 Middleware 
 ==============*/


app.use(userRouter)
app.use(eventRouter)
app.use(purchaseRouter)
app.use(express.json())
app.use("/", express.static("uploads"))
app.use("/", express.static("build"))
app.use(cors())



const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Comedy-hub"
}


const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, options);
const db = mongoose.connection
db.on("error", err => console.error(err))
db.once("open", () => {
    console.log("\nMongoose connected to DB!\n")
})


/*================
Port
===================*/


const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log("\nServer running on port:", port)
})

