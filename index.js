const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const aiTripModel = require('./models/aitrip');
// create a server
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);

// middleware
app.use(express.json());

// connect to mongodb
const DB = process.env.DB;


mongoose.connect(DB).then(() => {
    console.log("connection successful");
}).catch((e) => {
    console.log(e);
});

app.get('/', (req, res) => {
    res.send("Hello from TourGenie backend!");
  });
  
// inserting the data
app.post('/insert-trip', async (req , res) =>{
    try {
        const aiTripData = req.body;
        const newTrip = new aiTripModel(aiTripData);
        const savedTrip = await newTrip.save();
        res.status(200).json({success: true, id: savedTrip._id});

    } catch (error) {
        console.error("Error inserting trip:", error);
        res.status(500).json({success: false, error: error.message});
    }
});
 
// get data given by ai agent
app.get('/get-latest-trip/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const latestTrip = await aiTripModel.findOne({email}).sort({createdAt : -1});
        if (!latestTrip) {
            return res.status(404).json({ success: false, message: 'No trip found for this email' });
          }
        res.status(200).json(latestTrip);
    } catch (error) {
        console.error("Error fetching user trips:", error);
    res.status(500).json({ success: false, error: error.message });
    }
})

//listen to the server
server.listen(port, "0.0.0.0", () => {
    console.log(`server started on port ${port} `);
}
);
