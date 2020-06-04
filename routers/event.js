const express = require('express')
const Events = require("../models/Events")
const router = express.Router()
const multer = require("multer")
const upload = multer()
/*===========================
UPLOADS
=============================*/

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith("image")) {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "/uploads/")
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     },
//     fileFilter: fileFilter
// })

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: (1024 ** 2) * 5
//     }
// })



/*==========================
GET
===========================*/



router.get("/events", async (req, res) => {
    try {
        const events = await Events.find({});
        return res.json(events)

    } catch (error) {
        return res.json({
            success: false
        })
    }
})






/*==========================
POST
===========================*/



router.post("/deleteEvents", upload.none(), async (req, res) => {
    const {_id} = req.body
    console.log("in /deleteEvents",  req.body._id)
    // res.json(req.body)
    // await Events.deleteOne(
    //     {_id}, (err, evt) => {
    //         if (err) {
    //             return res.json({
    //                 success: false,
    //                 err: err
    //             })
    //         } else {
    //             return res.json({
    //                 success: true,
    //                 dc: evt.deletedCount,
    //                 id: _id
    //             })
    //         }
    //     })
})




module.exports = router