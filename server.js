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

const generateId = () => {
    return "" + Math.floor(Math.random() * 1000000)
}
const generateSeats = () => {
    return "" + Math.floor(Math.random() * 50)
}

const generateTicketPrices = () => {
    return "" + Math.floor(Math.random() * (20 - 15) + 15)
}

let dbo = undefined
let sessions = {}


/* Middleware */
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



/* ==================
GET 
====================*/


app.get("/events", async (req, res) => {
    dbo.collection("events").find({}).toArray((err, evt) => {
        if (err) {
            console.log(err)
            return res.send("fail")
        }
        return res.json(evt)
    })
})

app.get("/hostevents", (req, res) => {
    dbo.collection("events").find({
        host: req.host
    }).toArray((err, evt) => {
        if (err) {
            console.log(err)
        }
        return res.json({
            success: true,
            events: evt
        })

    })
})

app.get("/userevents", (req, res) => {
    dbo.collection("user").find({
        username: req.username
    }).toArray((err, evt) => {
        if (err) {
            console.log(err)
        }
        return res.json({
            success: true,
            events: evt
        })
    })
})




/* =====================
POST 
========================*/


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

                return res.json({
                    success: true
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

app.post("/host", upload.none(), (req, res) => {
    const {
        title,
        start,
        end,
        location,
        performer,
        hostId,
    } = req.body

    dbo.collection("events").insertOne({
        title: title,
        start: start,
        end: end,
        location: location,
        performer: performer,
        hostId: hostId,
        seatsAvail: generateSeats(),
        allDay: "false",
        dateAdded: new Date()
    })
    return res.json({
        success: true
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
                    success: true
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


// app.post('/update', upload.none(), (req, res) => { 
//     console.log("request to /update") 
//     let id = req.body.id.toString() 
//     let desc = req.body.description 
//     console.log("sent from client", desc, id) 
//     dbo.collection('posts').updateOne( 
//         { "_id": ObjectID(id) }, 
//         { $set: { description: desc } }) 
//     res.send("success") 
// }) 


app.post("/userevent", upload.none(), (req, res) => {
    const username = req.body.username.toString()
    const event = req.body.event
    dbo.collection("user").updateOne({
        "username": username
    }, {
        $set: {
            event: event
        }
    })
})














app.listen(port, () => {
    console.log("Server running on port:", port)
})