


// schema
const { default: connectDB } = require("../middleWare/connectDB");
import CMSSchemaFunc from "../schema/CMSSchema";





// router
const handler = async (req, res) => {

    const CMSSchema = CMSSchemaFunc(req.body.userId);


    let data = await CMSSchema.find({
        project: req.body.projectId,
        'content.name': req.body.contentName,
        element: undefined,
    })




    res.json(data);

}



export default connectDB(handler, 'anisoleCMS');