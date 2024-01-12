import connectDB from "../middleWare/connectDB";
import CMSSchemaFunc from "../schema/CMSSchema";


function handler(req, res) {


    if (!req.body.userId) {
        res.status(403).json({ err: "user Id missing" })
        return
    }

    if (!req.body.projectName) {
        res.status(403).json({ err: "project Name is missing" })
        return
    }


    const CMSSchema = CMSSchemaFunc(req.body.userId);

    const obj = {
        project: req.body.projectName
    }
    const data = new CMSSchema(obj);
    data.save()


    res.status(200).json({ success: 'project created' })
}


export default connectDB(handler, 'anisoleCMS')