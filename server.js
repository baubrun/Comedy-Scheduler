const express = require('express')
const app = express()
require("dotenv/config")
const userRouter = require("./routers/user")
const eventRouter = require("./routers/event")
const cors = require("cors")

let orderNum = ""
let total = ""
/*=============
 Middleware 
 ==============*/


app.use(userRouter)
app.use(eventRouter)
app.use(express.json())
app.use("/", express.static("uploads"))
app.use("/", express.static("build"))
app.use(cors())

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

