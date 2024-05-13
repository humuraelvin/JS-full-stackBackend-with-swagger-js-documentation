const mongoose = require('mongoose');
const debug = require('debug')('app:debug')
require('dotenv').config();

const dbconnection = async () => {
    try {
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Mongodb successfully");

    } catch (error) {
        console.log("Error happened while trying to connected to mongodb", error);
    }
}

module.exports = dbconnection;