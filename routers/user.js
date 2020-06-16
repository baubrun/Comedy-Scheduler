const express = require('express')
const User = require("../models/User")
const router = express.Router()

const bcrypt = require("bcryptjs")
const SALT_FACTOR = 10
const validateLoginForm = require("../validators").validateLoginForm
const validateRegisterForm = require("../validators").validateRegisterForm
const multer = require("multer")
const upload = multer()





/*==========================
POST
===========================*/

router.post("/login", upload.none(), async (req, res) => {
    const givenPassword = req.body.password
    const givenUsername = req.body.username

    const errors = validateLoginForm(givenUsername, givenPassword)
    if (errors.length > 0) return res.json({success: false, errors})

    await User.findOne({
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
                return res.json({
                    success: true,
                    hostId: user.hostId
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

router.post("/register", upload.none(), async (req, res) => {
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

    await User.findOne({
        username: username
    }, async (err, user) => {
        if (err) {
            return res.json({
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
            const hashedPassword = await bcrypt.hash(password, SALT_FACTOR)

            try {

               const newUser =  User({
                    username: username,
                    password: hashedPassword,
                    email: email,
                    hostId: hostId,
                    events: "",
                    dateAdded: new Date()
                })
                await newUser.save()

                return res.json({
                    success: true,
                    hostId: hostId
                })
            } catch (error) {
                console.log(error)
                return res.json({
                    success: false
                })
            }
        }
    })
})

module.exports = router