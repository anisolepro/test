const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    projectName: {
        type: String,
        unique: true,
        required: true,
    },
    contents: {
        type: Object,
        default: {}
    },

});

module.exports = (userId) => {

    return mongoose.models["user-" + userId] || mongoose.model("user-" + userId, userSchema);
};