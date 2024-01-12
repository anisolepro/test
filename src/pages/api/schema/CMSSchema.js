const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    project: {
        type: String,
        required: true,
    },
    content: {
        type: Object
    },

    page: {
        type: Object,

    },
    element: {
        type: Object
    },
}, {
    timestamps: true
});

module.exports = (userId) => {

    return mongoose.models["user-" + userId] || mongoose.model("user-" + userId, userSchema);
};