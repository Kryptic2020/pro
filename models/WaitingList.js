const mongoose = require('mongoose');
const { Schema } = mongoose;



const waitingListSchema = new Schema({
	date: String,
	userID:String,
	time: String,
	service: String,
	staff: String,
	specialty: String,
	name: String,
	phone: String,
	fullName: String,
	requestedAt: String,
	message:String
});

mongoose.model('waitingList', waitingListSchema);