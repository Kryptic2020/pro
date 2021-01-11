const mongoose = require('mongoose');
const { Schema } = mongoose;



const servicePriceSchema = new Schema({
	name: String,
	price: Number,
	assignmentID: String,
	serviceDetails:String
});

mongoose.model('servicePrice', servicePriceSchema);