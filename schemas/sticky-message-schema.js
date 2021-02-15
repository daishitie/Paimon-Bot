const mongoose = require('mongoose')

const requiredString = {
    type: String,
    required: true
}

const stickyMessageSchema = mongoose.Schema({
    _id: requiredString,
    isEnable: {
        type: Boolean,
        required: true
    },
    maxCount: {
        type: Number,
        required: true
    },
    channelId: requiredString,
    text: requiredString
})

module.exports = mongoose.model(`sticky-messages`, stickyMessageSchema)