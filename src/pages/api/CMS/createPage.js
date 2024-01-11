
import { v4 as uuidv4 } from 'uuid';


import connectDB from "../middleWare/connectDB";


// schemas
import CMSSchemaFunc from "../schema/CMSSchema";




async function handler(req, res) {


    if (!req.body.userId) {

        res.status(403).json({ err: "user Id missing" })
        return
    }


    const CMSSchema = CMSSchemaFunc(req.body.userId);


    const data = await CMSSchema.updateOne({
        _id: req.body.projectId
    }, {
        $set: {
            [`contents.${req.body.pageName}`]: {}
        }
    });


    res.status(200).send('page created')
}


export default connectDB(handler, 'anisoleCMS')