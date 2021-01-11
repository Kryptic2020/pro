const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const randomToken = require('random-token');
//const signUpTemplate = require('../services/emailTemplates/SignUpTemplate');
const requireLogin = require('../middlewares/requireLogin');
//const AdmMailer = require('../services/AdmMailer');
//const newRegisteredUser = require('../services/emailTemplates/NewRegisteredUser');
const keys = require('../config/keys');

module.exports = app => {
	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect:'/auth'
	})
	);

	//REGISTER EMAIL FOR FACEBOOK LOGIN
	app.post('/api/email/register/facebook', requireLogin, async (req, res) => {
		const alreadyExist = await User.find({ email: req.body.email });
		if (alreadyExist.length > 0) { res.send('This email is not valid') } else {
			res.send('registered');
			const token = randomToken(50);
			await User.updateOne({
				_id: req.user._id
			}, {
				$set: { email: req.body.email, token },
			});
		const email = req.body.email;
		const user = req.user;
		/*const validationMailer = new SimpleMailer(
			{ subject: 'Email Confirmation', email },
			signUpTemplate(user)
		);
		await validationMailer.send().then(res => { console.log(res); }).catch(e => { console.log(e); });
		const NotifyAdmin = new AdmMailer(
			{ subject: 'New user has been registered into our app'},
			newRegisteredUser(user)
		);
		await NotifyAdmin.send().then(res => { console.log(res); }).catch(e => { console.log(e); });*/
		}
		
	});
};
