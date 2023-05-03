const mongoose = require("mongoose");

var mongoURL = "mongodb://localhost:27017/mern-rooms"

// 

mongoose.connect(mongoURL)

var connection = mongoose.connection
connection.on('error', () => {
    console.log("Connection failed")
})

connection.on('connected', ()=> {
    console.log("success");
})

module.exports = mongoose