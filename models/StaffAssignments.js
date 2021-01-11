const mongoose = require('mongoose');
const { Schema } = mongoose;



const staffAssignmentsSchema = new Schema({
	staff: String,
	staffID: String,
	assignedSpecialty:String,
	assignedServices:Array,
});

mongoose.model('staffAssignments', staffAssignmentsSchema);