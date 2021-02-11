const mongoose = require('mongoose');
const { Schema } = mongoose;

const calendarHistorySchema = new Schema({
	processedBy: String,
	processedDate: Date,
	specialty: String,
	staff: String,
	startDate: Date,
	endDate: Date,
	excludedDays: Array,
	isVisible: Boolean,
	tableName: String,
	slots: Array,
	type: String,
});

mongoose.model('calendarHistory', calendarHistorySchema);
