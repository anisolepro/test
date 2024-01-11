import mongoose from 'mongoose';
import connectDB from '../middleWare/connectDB';

const jwt = require('jsonwebtoken');


// schemas
const schema = require('../schema/UserSchema')




const handler = async (req, res) => {


    const jwtToken = req.headers['authtoken'];

    console.log('authtoken', jwtToken)
    if (!jwtToken) {
        res.status(401).send({ err: " Auth Token Missing " });
        return;
    }
    jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, decodeData) => {
        if (err) {
            console.log("Error : ", err)
            res.status(403).send({ err: "Invalid Auth Token" })
            return;


        }

        const UserSchema = mongoose.models.users || mongoose.model("users", schema);


        const result = await UserSchema.findOne({ _id: decodeData._id }, { password: 0 })


        res.status(200).send(result)

    })


}






export default connectDB(handler, 'loginSystem')