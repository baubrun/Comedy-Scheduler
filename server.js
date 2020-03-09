const express = require('express')
const app = express()
const port = 4000
require("dotenv/config")
const multer = require("multer")
const cookieParser = require("cookie-parser")
const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const bcrypt = require("bcryptjs")
const validator = require("./validators")
const SALT_FACTOR = 10
let dbo = undefined
let sessions = {}



/*=============
 Middleware 
 ==============*/

app.use(express.json())
app.use(cookieParser())
app.use("/", express.static("uploads"))


MongoClient.connect(
    process.env.DB_URI,
    // "mongodb://localhost:27017/Comedy-hub", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(client => {
    dbo = client.db("Comedy-hub")
    console.log("\nConnected to Mongo DB!\n")
}).catch(err => console.log(err))







/*===============
 Helper functions 
 ================*/

const fileFilter = (req, file, cb) => {
    if (file !== undefined) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
    fileFilter: fileFilter
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: (1024 ** 2) * 5
    }
})

const seatsPerVenue = {}
seatsPerVenue.LE_FOU_FOU = 100
seatsPerVenue.JOKES_BLAGUES = 90
seatsPerVenue.RIRE_NOW = 80

const venueSeating = reqBody => {
    switch (reqBody) {
        case "LE_FOU_FOU":
            return seatsPerVenue.LE_FOU_FOU
        case "JOKES_BLAGUES":
            return seatsPerVenue.JOKES_BLAGUES  
        case "RIRE_NOW":
            return seatsPerVenue.RIRE_NOW 
        default:
            return 0
    }
}

const generateId = () => {
    return "" + Math.floor(Math.random() * 1000000)
}
const generateSeats = () => {
    return "" + Math.floor(Math.random() * 50)
}

const generateTicketPrices = () => {
    return "" + Math.floor(Math.random() * (20 - 15) + 15)
}


/* ==================
GET 
====================*/


app.get(["/events", "/profile"], async (req, res) => {
    dbo.collection("events").find({}).toArray((err, evt) => {
        if (err) {
            console.log(err)
            return res.send("fail")
        }
        return res.json(evt)
    })
})


app.get("/confirmation", async (req, res) => {
    dbo.collection("purchases").find({}).toArray((err, evt) => {
        if (err) {
            console.log(err)
            return res.send("fail")
        }
        return res.json(evt)
    })
})



/* =====================
POST 
========================*/
app.post("/profile", upload.single("image"), async (req, res) => {
    const {
        title,
        startDate,
        startTime,
        endDate,
        endTime,
        venue,
        performer,
        price,
        hostId,
        // seatsAvail

    } = req.body
    // const image = req.file.originalname ? req.file.originalname : ""
    //works for finding slots taken
    await dbo.collection("events").findOne({
        "startDate": startDate,
        "venue": venue,
        "startTime": "21:00"

    }, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                success: false
            })
        }
        if (result) {
            return res.status(400).json({
                success: false,
                msg: "Time slot taken",

            })
        } else {
                dbo.collection("events").insertOne({
                    title: title,
                    startDate: startDate,
                    startTime: startTime,
                    endDate: endDate,
                    endTime: endTime,
                    venue: venue,
                    performer: performer,
                    image: req.file.originalname,
                    price: price,
                    hostId: hostId,
                    seatsAvail: venueSeating(venue),
                    allDay: "false",
                    dateAdded: new Date()
                })
                return res.json({
                    success: true
                })
        }
    })

})



app.post("/checkout", upload.none(), (req, res) => {
    const {
        firstName,
        lastName,
        address,
        email,
        city,
        total,
        cardName,
        cardNumber,
        exp,
        cvv,
        itemsBought
    } = req.body

    dbo.collection("purchases").insertOne({
        firstName: firstName,
        lastName: lastName,
        address: address,
        email: email,
        city: city,
        total: total,
        cardName: cardName,
        cardNumber: cardNumber,
        exp: exp,
        cvv: cvv,
        itemsBought: itemsBought
    })
    return res.status(200).json({
        success: true
    })
})

app.post("/deleteEvents", upload.single("image"), async (req, res) => {

    const id = req.body.id

    await dbo.collection("events")
        .findOneAndDelete({
            _id: ObjectID(id)
        }, (err, r) => {
            if (err) {
                console.log(err)
            }
        })
    return res.json({
        success: true
    })
})




/* use to render image of venue avail for hosting and events page */
app.post("/getSeatsAvail", upload.none(), async (req, res) => {
    const {
        startDate,
        venue
    } = req.body

    await dbo.collection("seating").findOne({
        "startDate": startDate,
        [`venue.${venue}`]: {
            $exists: 1
        }

    }, (err, result) => {
        // }).toArray((err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                success: false
            })
        }
        // if (!result) {
        //     return res.status(400).json({
        //         success: false,
        //         msg: "Not found."
        //     })
        if (result) {
            return res.status(200).json({
                success: true,
                result: result
            })
        } else {
            return res.status(400).json({
                success: false,
                msg: "Not found."
            })
            // return res.status(200).json({
            //     success: true,
            //     result: result
            //     // ans: ans
            // })
        }
    })

})

app.post("/login", upload.none(), async (req, res) => {
    const givenPassword = req.body.password
    const givenUsername = req.body.username

    await dbo.collection("user").findOne({
        username: givenUsername
    }, async (err, user) => {
        if (err) {
            console.log(err)
            return res.json({
                success: false
            })
        }
        if (!user) {
            return res.json({
                success: false
            })
        }

        try {
            if (await bcrypt.compare(givenPassword, user.password)) {
                const sessionId = generateId()
                sessions[sessionId] = givenUsername
                res.cookie("sid", sessionId)

                const hostId = user.hostId

                return res.json({
                    success: true,
                    hostId: hostId
                })

            } else {
                return res.json({
                    success: false,
                    msg: "Invalid username or password."
                })
            }
        } catch (err) {
            console.log(err)
            return res.json({
                success: false
            })
        }
    })
})


app.post("/register", upload.none(), async (req, res) => {
    const {
        username,
        password,
        email,
        hostId
    } = req.body

    await dbo.collection("user").findOne({
        username: username
    }, async (err, user) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                success: false
            })
        }
        if (user) {
            return res.status(404).json({
                success: false,
                msg: "Username already exists."
            })
        } else {
            try {
                const hashedPassword = await bcrypt.hash(password, SALT_FACTOR)

                dbo.collection("user").insertOne({
                    username: username,
                    password: hashedPassword,
                    email: email,
                    hostId: hostId,
                    events: ""
                })
                return res.status(200).json({
                    success: true,
                    hostId: hostId
                })

            } catch (error) {
                console.log(error)
                return res.status(400).json({
                    success: false
                })
            }
        }
    })
})


app.post("/setVenueSeating", upload.single("image"), async (req, res) => {
    const {
        startDate,
        venue
    } = req.body

    await dbo.collection("seating").findOne({
        "startDate": startDate,
        [`venue.${venue}`]: {
            $exists: 1
        }

    }, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                success: false
            })
        }
        if (result) {
            return res.status(400).json({
                success: false,
                msg: "Venue seating established.",

            })
        } 
        try {
            dbo.collection("seating").updateOne({
                "startDate": startDate},
                {$set: {[`venue.${venue}`]: venueSeating(venue)}},
                {upsert: true}
            )
            return res.json({
                success: true
            })
        } catch (error) {
            console.log(err)
            return res.json({
                success: false
            })   
        }
    })
})



app.post("/updateSeatsAvail", upload.none(), async (req, res) => {
    const {
        venue,
        seatsAvail,
        startDate,

    } = req.body

    await dbo.collection("seating").findOneAndUpdate({
            "startDate": startDate,
        }, {
            $inc: {
                [venue]: -seatsAvail,
            }
        },
        (err) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    success: false
                })
            }
            return res.status(200).json({
                success: true
            })
        }
    )
})



app.post("/updateevent", upload.single("image"), async (req, res) => {
    const {
        title,
        startDate,
        startTime,
        endDate,
        endTime,
        venue,
        performer,
        price,
        id
    } = req.body
    
    await dbo.collection("events").updateOne(
        {_id : ObjectID(id)},
        {$set: {title: title}},
        {$set: {startDate: startDate}},
        {$set: {startTime: startTime}},
        {$set: {endDate: endDate}},
        {$set: {endTime: endTime}},
        {$set: {venue: venue}},
        {$set: {performer: performer}},
        {$set: {price: price}}, 
        (err) => {
            if (err) {
                console.log(err)
                return res.status(400).json({success: false})
            }
        }
    )
    return res.status(200).json({success: true})
})

















/*================
Port
===================*/

app.listen(port, () => {
    console.log("Server running on port:", port)
})




