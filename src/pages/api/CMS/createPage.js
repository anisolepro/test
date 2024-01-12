

import connectDB from "../middleWare/connectDB";


// schemas
import CMSSchemaFunc from "../schema/CMSSchema";




async function handler(req, res) {


    if (
        !req.body.userId
        || !req.body.projectId
        || !req.body.contentName
        || !req.body.pageName
    ) {

        res.status(403).json({ err: "Something is  missing" })
        return
    }


    const CMSSchema = CMSSchemaFunc(req.body.userId);



    const obj = {
        project: req.body.projectId,
        content: {
            name: req.body.contentName,
        },
        page: {
            name: req.body.pageName
        }
    }


    const data = new CMSSchema(obj)
    data.save()



    res.status(200).json({ success: 'page created' })
}


export default connectDB(handler, 'anisoleCMS')