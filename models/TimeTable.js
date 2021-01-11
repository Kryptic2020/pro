const mongoose = require('mongoose');
const { Schema } = mongoose;

const timeTableSchema = new Schema({
	timeTableName: String,
	times: Array,
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('timeTable', timeTableSchema);
