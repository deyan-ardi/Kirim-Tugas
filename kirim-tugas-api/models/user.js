const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    }

}, {
    collection: "user"
})

module.exports = mongoose.model("user", userSchema);