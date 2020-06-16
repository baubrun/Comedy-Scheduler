const express = require("express")
const Purchases = require("../models/Purchase")
const router = express.Router()
const multer = require("multer")
const upload = multer()
const stripe = require("stripe")(process.env.STRIPE_SECRET)
let orderNum = ""
let total = ""
let herokuPrefix =  "https://comedy-hub-bb.herokuapp.com/"



router.post(herokuPrefix +"/checkout", upload.none(), async (req, res) => {
    const {amount, itemsBought, order } = req.body

    try {
        const purchase = Purchases({
            amount: amount,
            itemsBought: itemsBought,
            order: order
        })
    
        await purchase.save()
    
        return res.json({
            success: true
        })
    
    } catch (error) {
        return res.json({
            success: false
        })
    }
})


router.post(herokuPrefix +"/charge", upload.none(), async (req,res) => {
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


router.get(herokuPrefix +"/orderNum", (req, res) => {
    return res.json({
        success: true,
        order: orderNum,
        amount: total
    })

})



module.exports = router