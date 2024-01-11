const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        require: true
    },
    rights: {
        type: String,
        default: "member"
    },
    profilePic: {
        type: String,
        default: ""
    }
});

module.exports = userSchema;