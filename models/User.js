const mongoose = require("mongoose")
const Schema = mongoose.Schema


const UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },

    hostId: {
        type: String
    },
    events: {
        type: String
    },
})

module.exports = mongoose.model("User", UserSchema)