const { default: mongoose } = require("mongoose")



const connectDB = (handler, dbName) => {
    return async (req, res) => {


        if (!mongoose.connection.readyState)
            await mongoose.connect(process.env.URI + dbName)
        else if (dbName != mongoose.connections[0].name) {
            await mongoose.disconnect();
            await mongoose.connect(process.env.URI + dbName)
        }


        return handler(req, res)
    }

}

export default connectDB