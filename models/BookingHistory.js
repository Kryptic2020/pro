const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingHistorySchema = new Schema({
	date: String,
	bookingID:String,
	time: String,
	service: String,
	staff: String,
	price:Number,
	specialty: String,
	bookedByID: { type: String, default: '' },
	bookedByName: { type: String, default: '' },
	isBooked: { type: Boolean, default: 'false' },
	isCancelled: { type: Boolean, default: 'false' },
	cancelledBy: { type: String, default: '' },
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('bookingHistory', bookingHistorySchema);