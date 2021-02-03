const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('users');
const imageMimeTypes = [
	'image/jpeg',
	'image/png',
	'images/gif',
];

module.exports = (app) => {
	//FETCH CONTACTS
	app.get(
		'/api/contacts',
		requireLogin,
		async (req, res) => {
			const contacts = await User.find({});
			//console.log(table);
			res.send(contacts);
		}
	);

	//FETCH PROFILE
	app.post(
		'/api/profile/get',
		requireLogin,
		async (req, res) => {
			const { _id } = req.body;
			const profile = await User.findOne({ _id });
			console.log(profile);
			if (profile) {
				res.send(profile);
			} else {
				res.send(
					'Could not find profile, it does not exist or has been deleted!'
				);
			}
		}
	);

	//UPDATE PROFILE
	app.post(
		'/api/profile/update',
		requireLogin,
		async (req, res) => {
			const {
				fullName,
				phone,
				photo,
				isAdmin,
				_id,
				isActive,
				info,
				daysCalendarView,
			} = req.body;
			await User.updateOne(
				{
					_id,
				},
				{
					$set: {
						fullName,
						phone,
						photo,
						isAdmin,
						isActive,
						info,
						daysCalendarView,
					},
				}
			)
				.exec()
				.then((res) => {
					console.log(res, 'res');
				})
				.catch((err) => {
					console.log(err, 'err');
				});
			res.send('Successfully Updated!!!');
		}
	);

	//UPDATE PICTURE
	app.post(
		'/api/picture',
		requireLogin,
		async (req, res) => {
			const { photo } = req.body;
			console.log(photo, 'bateu');
			await User.updateOne(
				{ _id: req.user._id },
				{ photo }
			);
		}
	);
};
