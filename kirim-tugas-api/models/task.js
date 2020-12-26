const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    matkul: {
        type: String,
        required: true
    },
    dec: {
        type: String,
        required: true
    },
    req: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    user: [{
        _id: {
            type: String
        },
        uploaded: {
            type: Date
        }
    }]
}, {
    collection: "tasks"
})

module.exports = mongoose.model("task", taskSchema);