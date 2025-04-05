const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
// create a server
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);

// middleware
app.use(express.json());

// connect to mongodb
const DB = process.env.DB ||  "mongodb+srv://sujal:Suj%40ltourgenie@cluster0.l9yxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(DB).then(() => {
    console.log("connection successful");
}).catch((e) => {
    console.log(e);
})
 
//listen to the server
server.listen(port, "0.0.0.0", () => {
    console.log(`server started on port ${port} `);
}
);
