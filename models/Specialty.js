const mongoose = require('mongoose');
const { Schema } = mongoose;

const specialtySchema = new Schema({
	name: String,
	description: String,
});

mongoose.model('specialty', specialtySchema);
