const mongoose = require('mongoose');

const aitripSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    passport: String,
    departure_location: String,
    destination: String,
    departure_date: String,
    return_date: String,
    airline: String,
    departure_time: Date,
    duration_minutes: Number,
    features: [String],
    price: Number,
    hotel: {
        name: String,
        link: String,
        images: [
            {
                thumbnail: String,
                original: String
            }
        ],
        rate_per_night: Number,
        total_rate: Number
    },
    createdAt: Date
    
});

const aiTripModel = mongoose.model("AiTripModel", aitripSchema);
module.exports = aiTripModel;