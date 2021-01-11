const mongoose = require('mongoose');
const { Schema } = mongoose;



const specialtySchema = new Schema({
	name: String
});

mongoose.model('specialty', specialtySchema);