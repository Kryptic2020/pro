const mongoose = require('mongoose');
const { Schema } = mongoose;

const newCalendarSchema = new Schema({
	date: Date,
	time: String,
	specialty: String,
	service: String,
	price: Number,
	paymentMethod: String,
	openView: Boolean,
	contactNumber: { type: Number, default: '' },
	bookedByName: { type: String, default: '' },
	bookedByID: { type: String, default: '' },
	isBooked: { type: Boolean, default: 'false' },
	isCancelled: { type: Boolean, default: 'false' },
	cancelledBy: { type: String, default: '' },
	staffID: { type: String, default: '' },
	staff: { type: String, default: '' },
	comments: { type: String, default: '' },
});

mongoose.model('newCalendar', newCalendarSchema);
