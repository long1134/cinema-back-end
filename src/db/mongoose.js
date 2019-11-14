const mongoose = require("mongoose")

const MONGODB_API = process.env.API_MONGOOSE
const MONGODB_API_CLIENT = "mongodb://127.0.0.1:27017/cinema"
 
mongoose.connect(MONGODB_API,{
    useNewUrlParser : true,
    useCreateIndex:true,
    useFindAndModify:false
})