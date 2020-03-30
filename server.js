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
const validateLoginForm = require("./validators").validateLoginForm
const validateRegisterForm = require("./validators").validateRegisterForm
const SALT_FACTOR = 10
let dbo = undefined
const stripe = require("stripe")(process.env.STRIPE_SECRET)
const uuid = require("uuid/v4")
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

const venueSeatingInit = venue => {
    switch (venue) {
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




const isOverlap = (start, end, result) => {
    const [h1, m1] = start.split(":")
    const [h2, m2] = end.split(":")
    const [eventSt1H, eventSt1M] = result.startTime.split(":")
    const [eventEnd1H, eventEnd1M] = result.endTime.split(":")
    const givenStart = new Date(0, 0, 0, h1, m1, 0)
    const givenEnd = new Date(0, 0, 0, h2, m2, 0)
    const eventStart = new Date(0, 0, 0, eventSt1H, eventSt1M, 0)
    const eventEnd = new Date(0, 0, 0, eventEnd1H, eventEnd1M, 0)
    if ((givenStart >= eventStart && givenEnd <= eventEnd) ||
        (givenStart < eventStart && givenEnd > eventEnd) ||
        (givenStart < eventStart &&
            (givenEnd > eventStart && givenEnd <= eventEnd)) ||
        (givenStart > eventStart && givenEnd > eventEnd)
    ) {
        return true
    } else {
        return false
    }
    // if ((givenStart >= eventStart && givenStart <= eventEnd) ||
    //     (givenStart < eventStart && givenEnd <= eventEnd) ||
    //     (givenEnd <= eventEnd && givenEnd > eventStart)
    // ) {
    //     return true
    // } else {
    //     return false
    // }
}


/* ==================
GET 
====================*/


app.get("/events", async (req, res) => {

    dbo.collection("events").find({}).toArray((err, evt) => {
        if (err) {
            console.log(err)
            return res.json({
                success: false
            })
        }
        return res.json(evt)
    })
})

app.get("/profile", async (req, res) => {

    dbo.collection("events").find({}).toArray((err, evt) => {
        if (err) {
            console.log(err)
            return res.json({
                success: false
            })
        }
        return res.json(evt)
    })
})


app.get("/confirmation", async (req, res) => {
    dbo.collection("purchases").find({}).toArray((err, evt) => {
        if (err) {
            console.log(err)
            return res.json({
                success: false
            })
        }
        return res.json(evt)
    })
})



app.get("/getSeatsAvail", async (req, res) => {
    dbo.collection("seating").find({}).toArray((err, evt) => {
        if (err) {
            console.log(err)
            return res.json({
                success: false
            })
        }
        return res.json(evt)
    })
})


/* =====================
POST 
========================*/


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
        itemsBought: itemsBought,
        dateAdded: new Date()
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
                return res.json({
                    success: false
                })
            }
        })
    return res.json({
        success: true
    })
})

app.post("/deleteSeating", upload.none(), async (req, res) => {

    const {
        startDate,
        venue
    } = JSON.parse(req.body.delSeating)
    console.log('startDate:', startDate)
    console.log('venue:', venue)

    await dbo.collection("seating")
        .updateOne({
            "startDate": startDate
        }, {
            $unset: {
                [`venue.${venue}`]: {
                    $type: "int"
                }
            }
        }, (err, result) => {
            if (err) {
                console.log(err)
                return res.json({
                    success: false
                })
            } else {
                return res.json({
                    success: true,
                    result: result
                })
            }
        })
})

app.post("/getVenueAvail", upload.none(), async (req, res) => {
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
            return res.status(200).json({
                success: true,
                result: result
            })
        } else {
            return res.status(400).json({
                success: false,
                msg: "Not found."
            })
        }
    })
})

app.post("/login", upload.none(), async (req, res) => {
    const givenPassword = req.body.password
    const givenUsername = req.body.username

    const errors = validateLoginForm(givenUsername, givenPassword)
    if (errors.length > 0) return res.json(errors)

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
            return res.json(
                [{
                    msg: "Invalid username or password."
                }]
            )
        }
        try {
            if (await bcrypt.compare(givenPassword, user.password)) {
                const hostId = user.hostId
                return res.json({
                    success: true,
                    hostId: hostId
                })
            } else {
                return res.json(
                    [{
                        msg: "Invalid username or password."
                    }]
                )
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

    const errors = validateRegisterForm(username, password, email, hostId)
    if (errors.length > 0) {
        return res.json(errors)
    }

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
            return res.json(
                [{
                    msg: "Username already exists."
                }]
            )
        } else {
            try {
                const hashedPassword = await bcrypt.hash(password, SALT_FACTOR)

                dbo.collection("user").insertOne({
                    username: username,
                    password: hashedPassword,
                    email: email,
                    hostId: hostId,
                    events: "",
                    dateAdded: new Date()
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
                "startDate": startDate
            }, {
                $set: {
                    [`venue.${venue}`]: venueSeatingInit(venue)
                }
            }, {
                upsert: true
            })
            return res.json({
                success: true
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success: false
            })
        }
    })
})

app.post("/slotsTaken", upload.single("image"), async (req, res) => {
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
    } = req.body

    await dbo.collection("events").findOne({
        "startDate": startDate,
        "venue": venue
    }, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                success: false
            })
        }
        if (result) {
            let overlaps = true
            overlaps = isOverlap(
                startTime,
                endTime,
                result)

            if (!overlaps) {
                dbo.collection("events").insertOne({
                    title: title,
                    startDate: startDate,
                    startTime: startTime,
                    endDate: endDate,
                    endTime: endTime,
                    venue: venue,
                    performer: performer,
                    image: !req.file ? "" : req.file.originalname,
                    price: price,
                    hostId: hostId,
                    allDay: "false",
                    dateAdded: new Date()
                })
                // return res.json({success: true})
            }
            // return res.json({
            //     ans: ans,
            //     success: true
            // })
        } else {
            dbo.collection("events").insertOne({
                title: title,
                startDate: startDate,
                startTime: startTime,
                endDate: endDate,
                endTime: endTime,
                venue: venue,
                performer: performer,
                image: !req.file ? "" : req.file.originalname,
                price: price,
                hostId: hostId,
                allDay: "false",
                dateAdded: new Date()
            })
        }
    })
})

app.post("/updateSeatsAvail", upload.none(), async (req, res) => {

    const parsedRequest = JSON.parse(req.body.seatsTaken)

    let errors = []
    await parsedRequest.forEach(e =>

        dbo.collection("seating").findOneAndUpdate({
                "startDate": e.startDate,
            }, {
                $inc: {
                    [`venue.${e.venue}`]: -e.qty,
                }
            },
            (err) => {
                if (err) {
                    errors.push(err)
                }
            }
        )
    )
    if (errors.length > 0) {
        return res.status(400).json({
            success: false
        })
    } else {
        return res.status(200).json({
            success: true
        })
    }
})



app.post("/updateEvent", upload.single("image"), async (req, res) => {
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

    await dbo.collection("events").updateOne({
            _id: ObjectID(id)
        }, {
            $set: {
                title: title,
                startDate: startDate,
                startTime: startTime,
                endDate: endDate,
                endTime: endTime,
                venue: venue,
                performer: performer,
                price: price,
                image: !req.file ? "" : req.file.originalname,
            }
        },
        (err) => {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    success: false
                })
            }
        }
    )
    return res.status(200).json({
        success: true
    })
})



/*========================
 Stripe 
 ==========================*/



app.post("/charge", async (req, res) => {

    let error
    let status

    try {
        const {
            total,
            token
        } = req.body

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const idempotency_key = uuid()
        const charge = await stripe.charge.create({
            amount: total * 100,
            customer: customer.id,
            currency: "cad",
            receipt_email: token.email,
            idempotency_key

        })
        console.log('charge:', charge)
    } catch (error) {
        console.error("Error", error)
    }


})















/*================
Port
===================*/

app.listen(port, () => {
    console.log("Server running on port:", port)
})