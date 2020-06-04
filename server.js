const express = require('express')
const app = express()
require("dotenv/config")
<<<<<<< HEAD
const multer = require("multer")
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const bcrypt = require("bcryptjs")
const validateLoginForm = require("./validators").validateLoginForm
const validateRegisterForm = require("./validators").validateRegisterForm
const SALT_FACTOR = 10
let dbo = undefined
=======
>>>>>>> transferred refactoring from deploy dir
const stripe = require("stripe")(process.env.STRIPE_SECRET)
const sharp = require("sharp")
const fs = require('fs')
const userRouter = require("./routers/user")
const eventRouter = require("./routers/event")
const cors = require("cors")

let orderNum = ""
let total = ""
/*=============
 Middleware 
 ==============*/

app.use(express.json())
<<<<<<< HEAD
app.use("/", express.static("uploads"))

app.use("/", express.static("build"))




MongoClient.connect(
    process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(client => {
    dbo = client.db("Comedy-hub")
    console.log("\nConnected to Mongo DB!\n")
}).catch(err => console.log(err))



=======
app.use(userRouter)
app.use(eventRouter)
app.use("/", express.static("uploads"))
app.use("/", express.static("build"))
app.use(cors())
>>>>>>> transferred refactoring from deploy dir

/*===============
 Helper functions 
 ================*/
// const deleteEmptySeating = async (startDate, req, res) => {
//     await dbo.collection("seating").findOneAndDelete({
//         "startDate": startDate,
//         "venue": {
//             $eq: {}
//         }
//     }, (err, result) => {
//         if (err) {
//             console.log(err)
//         }
//     })
// }







// const venueSeatingInit = venue => {
//     switch (venue) {
//         case "LE_FOU_FOU":
//             return seatsPerVenue.LE_FOU_FOU
//         case "JOKES_BLAGUES":
//             return seatsPerVenue.JOKES_BLAGUES
//         case "RIRE_NOW":
//             return seatsPerVenue.RIRE_NOW
//         default:
//             return 0
//     }
// }


// const deleteImg = result => {
//     process.chdir("./uploads")

//     fs.unlink(result.value.image, err => {
//         if (err) {
//             console.log("deleteImg:", err)
//         }
//     })
// }




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

