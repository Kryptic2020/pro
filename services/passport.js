const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
	.Strategy;
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook')
	.Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const bcrypt = require('bcrypt');
const User = mongoose.model('users');
//const newRegisteredUser = require('../services/emailTemplates/NewRegisteredUser');

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.

passport.serializeUser((user, done) => {
	done(null, user.id);
	//console.log(user);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
	//console.log(id);
});

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true,
		},
		async (
			accessToken,
			refreshToken,
			profile,
			done
		) => {
			const existingUser = await User.findOne({
				googleId: profile.id,
			});
			//	console.log(profile);
			const existingEmail = await User.findOne({
				email: profile.emails[0].value,
			});
			//const emailArray = profile.emails.map(k)=>{}

			/*if (existingUser && !existingEmail) {
				//already have a record with the given profile ID
				return done(null, existingUser);
			} else if (existingEmail) {
				return done(null, false);
			} else {*/

			if (existingUser) {
				//already have a record with the given profile ID
				return done(null, existingUser);
			} else {
				if (!existingEmail) {
					//We don't have a record with this ID, make a new record
					await new User({
						googleId: profile.id,
						fullName: profile.displayName,
						email: profile.emails[0].value,
						provider: profile.provider,
						givenName: profile.name.givenName,
						familyName: profile.name.familyName,
						photo: profile.photos[0].value,
						isAdmin: false,
						emailVerified: true,
					})
						.save()
						.then((user) => done(null, user));
					const user = await User.findOne({
						googleId: profile.id,
					});
				} else {
					return done(null, false);
				}
				/*const NotifyAdmin = new AdmMailer(
					{ subject: 'New user has been registered into our app'},
					newRegisteredUser(user)
				); console.log(user.googleId);
				await NotifyAdmin.send().then(res => { console.log(res); }).catch(e => { console.log(e); });*/
			}
		}
	)
);

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			//session: true,
			//passReqToCallback: true,
		},
		async (email, password, done) => {
			User.findOne({ email: email }, (err, user) => {
				//if (!user.emailVerified) return done(null, false);
				console.log('user', user);
				if (!user) return done(null, false);
				bcrypt.compare(
					password,
					user.password,
					(err, result) => {
						if (result === true) {
							return done(null, user);
						} else {
							return done(null, false);
						}
					}
				);
			});
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: keys.facebookClientID,
			clientSecret: keys.facebookClientSecret,
			callbackURL: '/auth/facebook/callback',
			proxy: true,
		},
		async (
			accessToken,
			refreshToken,
			profile,
			done
		) => {
			console.log(profile);

			const existingUser = await User.findOne({
				facebookId: profile.id,
			});
			if (existingUser) {
				//already have a record with the given profile ID
				return done(null, existingUser);
			}
			//We don't have a record with this ID, make a new record
			const user = new User({
				facebookId: profile.id,
				fullName: profile.displayName,
				provider: profile.provider,
				givenName: profile.name.givenName,
				familyName: profile.name.familyName,
				isAdmin: false,
				emailVerified: false,
			})
				.save()
				.then((user) => done(null, user));
			/*const NotifyAdmin = new AdmMailer(
			{ subject: 'New user has been registered into our app'},
			newRegisteredUser(user)
		);
		await NotifyAdmin.send().then(res => { console.log(res); }).catch(e => { console.log(e); });*/
		}
	)
);
