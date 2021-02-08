const passport = require('passport');
const express = require('express');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('users');
const randomToken = require('random-token');
const transporter = require('../services/transporterNodeMailer');
const newRegisteredUser = require('../services/emailTemplates/NewRegisteredUser');
const signUpTemplate = require('../services/emailTemplates/SignUpTemplate');
const resetPassLink = require('../services/emailTemplates/resetPassLink');
//const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey(keys.sendGridKey);

module.exports = (app) => {
	// Configure the local strategy for use by Passport.
	// The local strategy require a `verify` function which receives the credentials
	// (`username` and `password`) submitted by the user.  The function must verify
	// that the password is correct and then invoke `cb` with a user object, which
	// will be set at `req.user` in route handlers after authentication.

	app.post('/api/login', (req, res, next) => {
		passport.authenticate(
			'local',
			(err, user, info) => {
				if (err) throw err;
				if (!user)
					res.send('Incorrect credentials');
				else {
					req.login(user, (err) => {
						if (err) throw err;
						res.send('logged');
						console.log('backend logged');
					});
				}
			}
		)(req, res, next);
	});

	app.get('/user', (req, res) => {
		res.send(req.user);
	});

	//Register Page
	app.post('/api/register', async (req, res) => {
		console.log('register');
		const {
			email,
			fullName,
			photo,
			phone,
			password,
			provider,
		} = req.body;
		const hash = bcrypt.hashSync(password, 10);
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			//already have a record with the given profile ID
			res.send('Email already exist');
			return done(null, existingUser);
		} else {
			const token = randomToken(50);
			if (!existingUser) {
				const user = new User({
					email,
					fullName,
					photo,
					phone,
					password: hash,
					provider,
					token,
					emailVerified: false,
					isAdmin: false,
				});
				async function signUp() {
					let info = await transporter.sendMail({
						from: keys.sender, // sender address
						to: email, // list of receivers
						subject: 'Email verification ✔', // Subject line
						text: 'Email verification', // plain text body
						html: signUpTemplate(user), // html body
					});
					console.log(
						'Message sent: %s',
						info.messageId
					);
				}
				signUp().catch(console.error);
				async function newRegistered() {
					let info2 = await transporter.sendMail({
						from: keys.sender, // sender address
						to: keys.CCadmin, // list of receivers
						subject:
							'New user has been registered into our app ✔', // Subject line
						text:
							'New user has been registered into our app', // plain text body
						html: newRegisteredUser(user), // html body
					});
					console.log(
						'Message sent: %s',
						info2.messageId
					);
				}
				newRegistered().catch(console.error);
				try {
					await user.save();
					res.send('registered');
				} catch (err) {
					res.status(471).send(err);
				}
			}
		}
	});

	//Resend vaidate Email
	app.post(
		'/api/auth/verify-email/resend',
		async (req, res) => {
			const { email } = req.body;
			const user = req.user;
			console.log(req.body);
			const resetPassUser = await User.findOne({
				email,
			});
			if (resetPassUser) {
				res.send(
					'Re-sent!!!       Please check your inbox and spam box'
				);
				async function signUp() {
					let info = await transporter.sendMail({
						from: keys.sender, // sender address
						to: email, // list of receivers
						subject: 'Email verification ✔', // Subject line
						text: 'Email verification', // plain text body
						html: signUpTemplate(user), // html body
					});
					console.log(
						'Message sent: %s',
						info.messageId
					);
				}
				signUp().catch(console.error);
			} else {
				res.send('Email does not exist');
			}
		}
	);

	//Confirm email
	app.get(
		'/api/emailvalidation/:id',
		async (req, res) => {
			const token = req.params.id;
			const found = await User.updateOne(
				{ token },
				{
					emailVerified: true,
					token: randomToken(50),
				},
				function (err, docs) {
					if (err) {
						console.log(err);
						res.send(
							'There was an error, please try again later'
						);
					} else if (docs.nModified === 0) {
						res.redirect('/');
					} else if (docs.nModified > 0) {
						res.redirect('/');
					}
				}
			);
		}
	);

	// Reset password request
	app.post('/api/forgot-pass', async (req, res) => {
		const { email } = req.body;

		const user = await User.findOne({ email });
		if (user) {
			if (user.provider == 'App') {
				async function resetPass() {
					let info = await transporter.sendMail({
						from: keys.sender, // sender address
						to: email, // list of receivers
						subject: 'Reset Password ✔', // Subject line
						text: 'Reset Password', // plain text body
						html: resetPassLink(user), // html body
					});
					console.log(
						'Message sent: %s',
						info.messageId
					);
				}
				resetPass().catch(console.error);
				res.send(
					'We have sent a Reset Password Link to your registered email address'
				);
			} else if (user.provider == 'google') {
				res.send(
					'Email registered with social midia account'
				);
			}
		} else {
			res.send('Email does not exist');
		}
	});

	// New password
	app.post('/api/reset-pass', async (req, res) => {
		const { password, token } = req.body;
		const hash = bcrypt.hashSync(password, 10);
		await User.updateOne(
			{ token },
			{ password: hash, token: randomToken(50) }
		)
			.then(res.send('Password Successfully Updated'))
			.catch(
				res.send(
					'Password could not be updated, please try again later or contact the Admin'
				)
			);
	});

	//Theme color change
	app.post('/api/theme-update', async (req, res) => {
		const { color } = req.body;
		await User.updateOne(
			{ _id: req.user._id },
			{ theme: color }
		);
	});

	//Register personal info
	app.post('/api/personal-info', async (req, res) => {
		const { fullName, phone } = req.body;
		console.log(fullName, phone);
		await User.updateOne(
			{ _id: req.user._id },
			{ fullName, phone }
		);
		res.send('Personal info Sucessfully Updated');
	});

	app.post(
		'/api/auth/daysCalendarView',
		async (req, res) => {
			const { _id } = req.body;
			const daysCalendarView = await User.findOne({
				_id,
			});
			const days = {
				days: daysCalendarView.daysCalendarView,
			};
			res.send(days);
		}
	);
};

/*
	app.get('/api/send-email', async (req, res) => {
		async function main() {
			let user = {
				token: 'hgjdhgajghaghasd;ghashfjadasf',
				fullName: 'Pedroso Roberto',
				phone: '0444 555 999',
				email: 'asd@asd.asd',
			};

			// send mail with defined transport object
			let info = await transporter.sendMail({
				from: keys.sender, // sender address
				to: keys.CCadmin, // list of receivers
				subject: 'Aqui e Noixs Thiagao ✔', // Subject line
				text: 'Hello world?', // plain text body
				html: signUpTemplate(user), // html body
			});
			console.log('Message sent: %s', info.messageId);
		}
		main().catch(console.error);
		res.send('enviado');
	});
*/

//UPDATE DAYS AHEAD TO BE VISIBLE TO CLIENTS ON CALENDAR
