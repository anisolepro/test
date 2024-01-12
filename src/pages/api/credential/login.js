
import mongoose from "mongoose";
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');


// middleWare
import connectDB from "../middleWare/connectDB";

//  variables
const schema = require('../schema/UserSchema');




const handler = async (req, res) => {


    const UserSchema = mongoose.models.users || mongoose.model("users", schema);
    let user = await UserSchema.findOne({ "username": req.body.username });


    const result = user && await bcrypt.compare(req.body.password, user.password);


    if (result) {
        const jwtToken = jwt.sign(
            {
                _id: user._id
            }
            ,
            process.env.JWT_SECRET
        )
        res.status(200).json({ jwtToken })
    }
    else
        res.status(401).json({ err: "username or password not found" })


}


export default connectDB(handler, 'loginSystem');
// export default handler