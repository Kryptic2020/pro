// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
//const path = require('path');
//const nodemailer = require('nodemailer');

require('./models/User'); //has to come before services/passport, position matter here.

require('./models/Specialty');
require('./models/ServicePrice');
require('./models/StaffAssignments');
require('./models/TimeTable');
require('./models/NewCalendar');
require('./models/BookingHistory');
require('./models/CalendarHistory');
require('./models/WaitingList');
require('./services/passport');

mongoose.connect(keys.mongoURI, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const app = express();

// Body Parser Middleware
app.use(
	bodyParser.urlencoded({
		limit: '10mb',
		extended: false,
	})
);
app.use(bodyParser.json());

app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	})
);
// Initialize Passport and restore authentication state, if any, from the
// session.

app.use(passport.initialize());
app.use(passport.session());
/*
app.use((req, res, next) => {
  //console.log(req.session);
  //console.log(req.user);
  next();
});
*/

// Define routes.

require('./routes/authGoogleRoutes')(app);
require('./routes/authFacebookRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/calendarRoutes')(app);
require('./routes/contactsRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	//express will serve up production assets like our main.js file, or main.css file
	app.use(express.static('client/build'));
	//express will serve up the index.html file if it doesnt recognize the route
	const path = require('path');
	app.use('*', (req, res) => {
		res.sendFile(
			path.resolve(
				__dirname,
				'client',
				'build',
				'index.html'
			)
		);
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
