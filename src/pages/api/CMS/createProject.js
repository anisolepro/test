import connectDB from "../middleWare/connectDB";
import CMSSchemaFunc from "../schema/CMSSchema";


function handler(req, res) {


    if (!req.body.userId) {

        res.status(403).json({ err: "user Id missing" })
        return
    }


    const CMSSchema = CMSSchemaFunc(req.body.userId);

    const obj = {
        projectName: req.body.projectName
    }
    const data = new CMSSchema(obj);
    data.save()


    res.status(200).send('project created')
}


export default connectDB(handler, 'anisoleCMS')