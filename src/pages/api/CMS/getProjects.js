


// schema
const { default: connectDB } = require("../middleWare/connectDB");
import CMSSchemaFunc from "../schema/CMSSchema";





// router
const handler = async (req, res) => {

    const CMSSchema = CMSSchemaFunc(req.body.userId);

    if (!req.body.projectId) {
        let data = await CMSSchema.find()
            .select('-contents')

        res.json(data);

    }

    else {

        let data = await CMSSchema.findOne({ _id: req.body.projectId })

        res.json(data);
    }
}



export default connectDB(handler, 'anisoleCMS');