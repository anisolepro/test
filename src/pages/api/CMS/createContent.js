

import connectDB from "../middleWare/connectDB";


// schemas
import CMSSchemaFunc from "../schema/CMSSchema";




async function handler(req, res) {


    if (!req.body.userId) {

        res.status(403).json({ err: "user ID is  missing" })
        return
    }
    if (!req.body.projectId) {

        res.status(403).json({ err: "Project Id is  missing" })
        return
    }
    if (!req.body.contentName) {

        res.status(403).json({ err: "Content Name is  missing" })
        return
    }


    const CMSSchema = CMSSchemaFunc(req.body.userId);



    const obj = {
        project: req.body.projectId,
        content: {
            name: req.body.contentName,
            schema: req.body.contentSchema
        }
    }


    const data = new CMSSchema(obj)
    data.save()



    res.status(200).json({ success: 'page created' })
}


export default connectDB(handler, 'anisoleCMS')