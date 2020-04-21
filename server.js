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
const sharp = require("sharp")
const fs = require('fs')
let orderNum = ""
let total = ""
/*=============
 Middleware 
 ==============*/

app.use(express.json())
app.use(cookieParser())
app.use("/", express.static("uploads"))


MongoClient.connect(
    process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(client => {
    dbo = client.db("Comedy-hub")
    console.log("\nConnected to Mongo DB!\n")
}).catch(err => console.log(err))





/*===============
 Helper functions 
 ================*/
const deleteEmptySeating = async (startDate, req, res) => {
    await dbo.collection("seating").findOneAndDelete({
        "startDate": startDate,
        "venue": {
            $eq: {}
        }
    }, (err, result) => {
        if (err) {
            console.log(err)
        }
    })
}



const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}


const renameImg = file => {
    const sp = file.split(".")
    return sp.join("-chUpload-" + Date.now() + ".")
}
const seatsPerVenue = {}
seatsPerVenue.LE_FOU_FOU = 100
seatsPerVenue.JOKES_BLAGUES = 90
seatsPerVenue.RIRE_NOW = 80

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/uploads/")
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


const deleteImg = result => {
    process.chdir("./uploads")

    fs.unlink(result.value.image, err => {
        if (err) {
            console.log("deleteImg:", err)
        }
    })
}




/* ==================
GET 
====================*/



app.get("/events", async (req, res) => {

    await dbo.collection("events").find({}).toArray((err, evt) => {
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

    await dbo.collection("events").find({}).toArray((err, evt) => {
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
    await dbo.collection("purchases").find({}).toArray((err, evt) => {
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
    await dbo.collection("seating").find({}).toArray((err, evt) => {
        if (err) {
            console.log(err)
            return res.json({
                success: false
            })
        }
        return res.json(evt)
    })
})


app.get("/orderNum", (req, res) => {
    return res.json({
        success: true,
        order: orderNum,
        amount: total
    })
})

/* =====================
POST 
========================*/

app.post("/addEvent", upload.single("image"), async (req, res) => {
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
        facebook,
        instagram,
        twitter,
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
            return res.json({
                success: false,
                msg: "Time slot unavailable."
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
                image: !req.file ? "" : req.file.originalname,
                price: price,
                hostId: hostId,
                allDay: "false",
                facebook: facebook,
                instagram: instagram,
                twitter: twitter,
                dateAdded: new Date()
            })
        }
    })
})



app.post("/checkout", upload.none(), async (req, res) => {
    const {
        amount,
        itemsBought,
        order
    } = req.body
    await dbo.collection("purchases").insertOne({
        amount: amount,
        itemsBought: JSON.parse(itemsBought),
        order: order,
        dateAdded: new Date()

    }, err => {
        if (err) {
            return res.json({
                success: false,
                msg: err
            })
        }
    })
    return res.json({
        success: true
    })
})

app.post("/deleteEvents", upload.none(), async (req, res) => {
    await dbo.collection("events")
        .findOneAndDelete({
            _id: ObjectID(req.body.id)
        }, (err, result) => {
            if (err) {
                console.log("/deleteEvents:", err)
                return res.json({
                    success: false
                })
            }
            deleteImg(result)
        })
    return res.json({
        success: true
    })
})

app.post("/deleteSeating", upload.none(), async (req, res) => {

    const {
        startDate,
        venue
    } = req.body

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
                console.log("/deleteSeating:", err)
                return res.json({
                    success: false
                })
            } else {
                deleteEmptySeating(startDate, req, res)
                return res.json({
                    success: true,
                    result: result
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
            console.log("/user db:", err)
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
            console.log("/login:", err)
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
            console.log("user /register:", err)
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
            return res.json({
                success: false
            })
        }
        if (result) {
            return res.json({
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
    let img;
    const {
        title,
        startDate,
        startTime,
        endDate,
        endTime,
        venue,
        performer,
        price,
        id,
        facebook,
        instagram,
        twitter,
    } = req.body

    if (req.file) {
        img = renameImg(req.file.originalname)

        sharp(req.file.path)
            .resize(450, 450)
            .toFile(`./uploads/${img}`, (err) => {
                if (err) {
                    console.log("sharp:", err)
                }
            })
    }

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
                image: !req.file ? "" : img,
                facebook: facebook,
                instagram: instagram,
                twitter: twitter,
            }
        },
        (err) => {
            if (err) {
                console.log("events db /updateEvent:", err)
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


app.post("/charge", upload.none(), async (req, res) => {
    console.log("/charge")
    const {
        id,
        amount,
        order,

    } = req.body

    orderNum = order
    total = amount
    try {
        await stripe.paymentIntents.create({
            amount: amount,
            currency: "cad",
            confirm: true,
            description: "ticket",
            payment_method: id,
            metadata: {
                order: order
            }
        })
        return res.json({
            success: true
        })
    } catch (error) {
        console.log("stripe error:", error.raw.message)
        return res.json({
            success: false,
            msg: error.raw.message
        })
    }

})




/*================
Port
===================*/

app.listen(port, () => {
    console.log("Server running on port:", port)
})