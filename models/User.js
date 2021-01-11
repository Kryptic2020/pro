const mongoose = require('mongoose');
//const Schema = mongoose.Schema; the same as below

const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	facebookId: String,
	fullName: String,
	email: String,
	givenName: String,
	familyName: String,
	photo: String,
	phone: { type: Number, default: 9999999999 },
	password: String,
	provider: String,
	emailVerified: Boolean,
	token: String,
	isAdmin:Boolean,
	credits: { type: Number, default: 0 },
	isActive: { type: Boolean, default: true },
	info: String,
	theme: { type: String, default: '#23272B' },
	daysCalendarView:{ type: Number, default: 10 }
});

mongoose.model('users', userSchema);