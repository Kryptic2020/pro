const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requirePhone = require('../middlewares/requirePhone');
const requireEmail = require('../middlewares/requireEmail');
const requireActiveUser = require('../middlewares/requireActiveUser');
const T = mongoose.model('timeTable');
const NewCalendar = mongoose.model('newCalendar');
const BookingHistory = mongoose.model('bookingHistory');
const CalendarHistory = mongoose.model('calendarHistory');
const User = mongoose.model('users');
const Specialties = mongoose.model('specialty');
const ServicePrice = mongoose.model('servicePrice');
const StaffAssignments = mongoose.model('staffAssignments');
const WaitingList = mongoose.model('waitingList');
const transporter = require('../services/transporterNodeMailer');

const bookingCancelation = require('../services/emailTemplates/BookingCancelation');
const keys = require('../config/keys');
//const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey(keys.sendGridKey);
const Mailer = require('../services/Mailer');
const bookingNotification = require('../services/emailTemplates/BookingNotification');

const { CCadmin } = require('../config/keys');

const { parseISO } = require('date-fns');
const BookingNotification = require('../services/emailTemplates/BookingNotification');
//const { writeFileSync } = require('fs');
//const ics = require('ics');

module.exports = (app) => {
	//CHECK USERS PROFILE
	app.get(
		'/api/phone-check',
		requireLogin,
		requirePhone,
		async (req, res) => {}
	);
	app.get(
		'/api/email-check',
		requireLogin,
		requireEmail,
		async (req, res) => {}
	);
	app.get(
		'/api/is-active-check',
		requireLogin,
		requireActiveUser,
		async (req, res) => {}
	);

	//CREATE SPECIALTY
	app.post(
		'/api/specialty/post',
		requireLogin,
		async (req, res) => {
			const { specialty, description } = req.body;
			const sc = await Specialties.find({
				name: specialty,
			});
			if (sc.length > 0) {
				res.send('This Specialty already exist!!!');
			} else {
				const s = new Specialties({
					name: specialty,
					description,
				});
				await s.save();
				res.send('Saved!');
			}
		}
	);

	//FETCHING SPECIALTIES
	app.get('/api/specialties/get', async (req, res) => {
		const sp = await Specialties.find({});
		res.send(sp);
	});

	//DELETE SPECIALTY
	app.post(
		'/api/specialty/delete',
		requireLogin,
		async (req, res) => {
			const { _id } = req.body;
			await Specialties.findByIdAndRemove({ _id });
			res.send('Deleted!!');
		}
	);

	//CREATE SERVICEPRICE
	app.post(
		'/api/serviceprice/post',
		requireLogin,
		async (req, res) => {
			const {
				name,
				price,
				assignmentID,
				serviceDetails,
			} = req.body;
			const sc = await ServicePrice.find({ name });
			if (sc.length > 0) {
				res.send(
					'This service name already exist!!!'
				);
			} else {
				const s = new ServicePrice({
					name,
					price,
					assignmentID,
					serviceDetails,
				});
				await s.save();
				res.send('Service Successfully Created!!!');
			}
		}
	);

	//FETCHING SERVICEPRICE
	app.get('/api/serviceprice/get', async (req, res) => {
		const sc = await ServicePrice.find({});
		res.send(sc);
	});

	//DELETE SERVICEPRICE
	app.post(
		'/api/serviceprice/delete',
		requireLogin,
		async (req, res) => {
			const { _id } = req.body;
			const dl = await ServicePrice.findByIdAndRemove(
				{ _id }
			);
			if (dl) {
				res.send('Deleted!');
			} else {
				res.send('Something went wrong.');
			}
		}
	);

	//DELETE SERVICEPRICE
	app.post(
		'/api/serviceprice/update',
		requireLogin,
		async (req, res) => {
			const { _id, price } = req.body;
			await ServicePrice.updateOne(
				{ _id },
				{ price }
			);
			res.send('Price Updated!!');
		}
	);

	//CREATE STAFF ASSIGNMENTS
	app.post(
		'/api/staffassignments/post',
		requireLogin,
		async (req, res) => {
			const {
				staff,
				staffID,
				assignedSpecialty,
				assignedServices,
			} = req.body;

			const exist = await StaffAssignments.find({
				staffID,
				assignedSpecialty,
			});
			if (exist.length > 0) {
				res.send(
					'Staff already assigned for this specialty!'
				);
			} else {
				const s = new StaffAssignments({
					staff,
					staffID,
					assignedSpecialty,
					assignedServices,
				});
				await s.save();
				res.send(
					'Staff Assignments Successfully Created!!!'
				);
			}
		}
	);

	//FETCHING STAFF ASSIGNMENTS
	app.get(
		'/api/staffassignments/get',
		async (req, res) => {
			const sp = await StaffAssignments.find({});
			res.send(sp);
		}
	);

	//DELETE STAFF ASSIGNMENTS
	app.post(
		'/api/staffassignments/delete',
		requireLogin,
		async (req, res) => {
			const { _id } = req.body;
			await StaffAssignments.deleteOne({
				_id,
			});
			await ServicePrice.deleteMany({
				assignmentID: _id,
			});
			res.send('Deleted!!');
		}
	);

	app.get(
		'/api/timeTable/get',
		requireLogin,
		async (req, res) => {
			const table = await T.find({
				_user: req.user.id,
			});
			res.send(table);
		}
	);

	app.delete(
		'/api/timeTable/:id',
		requireLogin,
		async (req, res) => {
			const table = await T.findByIdAndRemove(
				req.params.id
			);
			if (table) {
				res.send('Deleted!!');
			} else {
				res.send(
					'Deleting table failed. Please try again later.'
				);
			}
		}
	);

	//CREATE TIME TABLE
	app.post(
		'/api/createTimeTable',
		requireLogin,
		async (req, res) => {
			const { tableName, tableTimes } = req.body;
			const f = await T.findOne({
				timeTableName: tableName,
			});
			if (f) {
				res.send('This name already exist');
			} else {
				const t = new T({
					_user: req.user.id,
					timeTableName: tableName,
					times: tableTimes,
				});

				await t.save();
				if (t) {
					res.send('Successfully Created!!!');
				} else {
					res.send('Something went wrong!');
				}
			}
		}
	);

	//POSTING CALENDAR SPECIALTY&DATE&TIME
	app.post(
		'/api/calendar/post',
		requireLogin,
		async (req, res) => {
			const {
				times,
				toLocaleArray,
				specialty,
				openView,
				staff,
				staffID,
				startDate,
				endDate,
				processedDate,
				tableName,
				excludedDays,
			} = req.body;
			const s = new CalendarHistory({
				processedBy: req.user.fullName,
				processedDate,
				specialty,
				staff,
				startDate,
				endDate,
				excludedDays,
				isVisible: openView,
				tableName,
				slots: times.times,
				type: 'Create',
			});
			await s.save();
			times.times.forEach(async (T) => {
				toLocaleArray.forEach(async (D) => {
					await NewCalendar.updateOne(
						{
							date: D,
							time: T,
							specialty,
							staffID,
						},
						{ $set: { openView } }
					).exec();
					const calendar = await NewCalendar.findOne(
						{
							date: D,
							time: T,
							specialty,
							staffID,
						}
					);
					if (calendar) {
					} else {
						const addCalendar = await new NewCalendar(
							{
								date: new Date(D),
								time: T,
								specialty,
								openView,
								staffID,
								staff,
							}
						).save();
					}
				});
			});
			res.send('Successfully Created!!!');
		}
	);

	//OVERRIDING CALENDAR SPECIALTY&DATE&TIME
	app.post(
		'/api/calendar/override',
		requireLogin,
		async (req, res) => {
			const {
				times,
				toLocaleArray,
				specialty,
				openView,
				staff,
				staffID,
				startDate,
				endDate,
				processedDate,
				tableName,
				excludedDays,
			} = req.body;
			const s = new CalendarHistory({
				processedBy: req.user.fullName,
				processedDate,
				specialty,
				staff,
				startDate,
				endDate,
				excludedDays,
				isVisible: openView,
				tableName,
				slots: times.times,
				type: 'Override',
			});
			await s.save();
			times.times.forEach(async (T) => {
				toLocaleArray.forEach(async (D) => {
					await NewCalendar.updateOne(
						{
							date: D,
							time: T,
							specialty,
							staffID,
						},
						{ $set: { openView } }
					).exec();
				});
			});
			res.send('Overrided');
		}
	);

	//DELETE CALENDAR SPECIALTY&DATE&TIME
	app.post(
		'/api/calendar/delete',
		requireLogin,
		async (req, res) => {
			const {
				times,
				toLocaleArray,
				specialty,
				staff,
				staffID,
				startDate,
				endDate,
				processedDate,
				tableName,
				excludedDays,
			} = req.body;
			const s = new CalendarHistory({
				processedBy: req.user.fullName,
				processedDate,
				specialty,
				staff,
				startDate,
				endDate,
				excludedDays,
				tableName,
				slots: times.times,
				type: 'Delete',
			});
			await s.save();
			times.times.forEach(async (T) => {
				toLocaleArray.forEach(async (D) => {
					const calendar = await NewCalendar.findOne(
						{
							date: D,
							time: T,
							specialty,
							staffID,
							isBooked: false,
						}
					);
					if (calendar) {
						await NewCalendar.deleteOne({
							_id: calendar._id,
						});
					} else {
					}
				});
			});
			res.send('Deleted');
		}
	);

	//FETCHING CALENDAR DATE&TIME
	app.get(
		'/api/calendar/get',
		requireLogin,
		async (req, res) => {
			const cal = await NewCalendar.find({});
			res.send(cal);
		}
	);
	//FETCHING CALENDAR BY SPECIALTY
	app.post(
		'/api/calendar/byspecialty',
		requireLogin,
		async (req, res) => {
			const { specialty } = req.body;
			const byspecialty = await NewCalendar.find({
				specialty,
			});
			res.send(byspecialty);
		}
	);

	//FETCHING CALENDAR BY DATE&SERVICE
	app.post(
		'/api/calendar/bydates',
		requireLogin,
		async (req, res) => {
			const {
				specialty,
				startDate,
				endDate,
				staffID,
			} = req.body;
			const byspecialty = await NewCalendar.find({
				specialty,
				staffID,
				date: { $gte: startDate, $lte: endDate },
			});
			res.send(byspecialty);
		}
	);

	//FETCHING CALENDAR BY TODAYDATE&SERVICE
	app.post(
		'/api/calendar/from-today',
		requireLogin,
		async (req, res) => {
			const { date } = req.body;
			const today = await NewCalendar.find({
				staffID: req.user._id,
				date: { $gte: date },
			});
			res.send(today);
		}
	);

	//POSTING NEW BOOKING
	app.post(
		'/api/booking/new',
		requireActiveUser,
		requireLogin,
		async (req, res) => {
			const {
				date,
				time,
				specialty,
				staffID,
				staff,
				service,
				price,
			} = req.body;
			const id = await NewCalendar.find({
				date,
				time,
				specialty,
				staffID,
			});
			/*ics.createEvent(
        {
          title: 'Dinner',
          description: 'Nightly thing I do',
          busyStatus: 'FREE',
          start: [2020, 10, 15, 6, 30],
          duration: { minutes: 40 },
        },
        (error, value) => {
          if (error) {
            console.log(error);
          }

          writeFileSync("./event.ics", value);
        }
      );*/
			await NewCalendar.updateOne(
				{
					date,
					time,
					specialty,
					staffID,
				},
				{
					$set: {
						bookedByID: req.user._id,
						bookedByName: req.user.fullName,
						isBooked: true,
						service,
						staffID,
						contactNumber: req.user.phone,
						price,
					},
				}
			)
				.exec()
				.then((res) => {
					//CANCEL UNPAID BOOKING AFTER 3 MIN
					setTimeout(async () => {
						const bookingInfo = await NewCalendar.find(
							{
								date,
								time,
								specialty,
								staffID,
							}
						);

						const {
							_id,
							service,
							price,
							bookedByName,
						} = bookingInfo[0];

						const userID = req.user._id;
						if (
							!bookingInfo[0].paymentMethod ||
							(bookingInfo[0]
								.paymentMethod === 'Card' &&
								!bookingInfo[0].isPaid)
						) {
							cancelBooking(
								_id,
								specialty,
								date,
								time,
								service,
								price,
								bookedByName,
								userID
							);
						}
					}, 180000);

					//console.log(res, 'res');
				})
				.catch((err) => {
					//console.log(err, 'err');
				});
			res.send('Well Done!');
			let zica = '';
			id.map((x) => {
				zica = x._id;
			});
			const booking = new BookingHistory({
				date,
				time,
				service,
				specialty,
				bookedByID: req.user._id,
				bookedByName: req.user.fullName,
				isBooked: true,
				isCancelled: false,
				price,
				staff,
				bookingID: zica,
			});
			await booking.save();
			//Great place to send an Email!
			const email = req.user.email;
			const user = {
				fullName: req.user.fullName,
			};
			const dateAUS = {
				date: new Date(
					parseISO(booking.date)
				).toLocaleDateString('es-ES', {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
				}),
			};
			const data = {
				subject: 'Booking Confirmation Pro ✔',
				to: email,
			};

			const mailer = new Mailer(
				data,
				BookingNotification(user, booking, dateAUS)
			);
			try {
				await mailer.send();
			} catch (err) {
				res.status(422).send(err);
			}
		}
	);

	//POSTING NEW BOOKING
	app.post(
		'/api/booking/admnew',
		requireLogin,
		async (req, res) => {
			const {
				date,
				time,
				specialty,
				service,
				_id,
				staff,
				staffID,
				price,
				fullName,
			} = req.body;

			const newBooking = await NewCalendar.findOne({
				date,
				time,
				specialty,
				staff,
			});
			const user = await User.findOne({ _id });
			if (newBooking) {
				res.send(
					'FAILED :  Date&Time Already Exist!'
				);
			} else {
				const bookingAdm = new NewCalendar({
					date,
					time,
					service,
					specialty,
					staff,
					staffID,
					price,
					bookedByID: _id,
					bookedByName: fullName,
					contactNumber: user.phone,
					isBooked: true,
					isCancelled: false,
					openView: true,
				});
				await bookingAdm.save();
				const idAdm = await NewCalendar.find({
					date,
					time,
					specialty,
					staff,
				});

				let zicaAdm = '';
				idAdm.map((x) => {
					zicaAdm = x._id;
				});
				const booking = new BookingHistory({
					date,
					time,
					service,
					specialty,
					bookedByID: _id,
					bookedByName: fullName,
					isBooked: true,
					isCancelled: false,
					price,
					staff,
					bookingID: zicaAdm,
				});
				await booking.save();
				const email = user.email;
				res.send('Succesfully Created');
				const dateAUS = {
					date: new Date(
						parseISO(booking.date)
					).toLocaleDateString('es-ES', {
						year: 'numeric',
						month: 'numeric',
						day: 'numeric',
					}),
				};
				async function bookingConfirmation() {
					let info = await transporter.sendMail({
						from: keys.senderNode, // sender address
						to: email, // list of receivers
						subject:
							'Booking Confirmation  - ( DO NOT REPLY ) ✔', // Subject line
						text:
							'Booking Confirmation  - ( DO NOT REPLY )', // plain text body
						html: bookingNotification(
							user,
							booking,
							dateAUS
						), // html body
					});
				}
				bookingConfirmation().catch(console.error);
				async function bookingConfirmation2() {
					let info2 = await transporter.sendMail({
						from: keys.senderNode, // sender address
						to: CCadmin, // list of receivers
						subject:
							'Booking Confirmation - ADM ✔', // Subject line
						text: 'Booking Confirmation - ADM', // plain text body
						html: bookingNotification(
							user,
							booking,
							dateAUS
						), // html body
					});
				}
				bookingConfirmation2().catch(console.error);
			}
		}
	);

	//FETCHING MY BOOKING
	app.get(
		'/api/my-booking/history/get',
		requireLogin,
		async (req, res) => {
			let data = [];
			const myBooking = await BookingHistory.find({
				bookedByID: req.user._id,
			}).sort('date');
			myBooking.map((j) => {
				if (j.bookedByID === req.user.id) {
					data.push({
						date: j.date,
						time: j.time,
						service: j.service,
						specialty: j.specialty,
						isCancelled: j.isCancelled,
						price: j.price,
						staff: j.staff,
						bookingID: j.bookingID,
						bookedByName: j.bookedByName,
					});
				}
			});
			res.send(data);
		}
	);

	//FETCHING REMAINING SPOTS
	app.post(
		'/api/booking/remainingspots',
		requireLogin,
		async (req, res) => {
			const { specialty, staffID, today } = req.body;
			const freespots = await NewCalendar.find({
				date: { $gte: today },
				isBooked: false,
				openView: true,
				specialty,
				staffID,
			});
			res.send(freespots);
		}
	);

	cancelBooking = async (
		_id,
		specialty,
		date,
		time,
		service,
		price,
		bookedByName,
		userID
	) => {
		const details = await NewCalendar.findOne({
			_id,
			bookedByName,
		});
		const user = await User.findOne({
			_id: details.bookedByID,
		});
		await NewCalendar.updateOne(
			{
				_id,
			},
			{
				$set: {
					bookedByID: '',
					bookedByName: '',
					isBooked: false,
					cancelledBy: userID,
					contactNumber: '',
					isCancelled: true,
					service: '',
					price: '',
					paymentMethod: '',
					isPaid: false,
				},
			}
		)
			.exec()
			.then((res) => {
				const found = BookingHistory.updateOne(
					{
						bookingID: details._id,
						isCancelled: false,
					},
					{
						$set: {
							isBooked: false,
							cancelledBy: userID,
							isCancelled: true,
						},
					}
				)
					.exec()
					.then((res) => {
						//	console.log(res, 'res');
					})
					.catch((err) => {
						console.log(err, 'err');
					});
			})
			.catch((err) => {
				console.log(err, 'err');
			});
		const email = user.email;
		const booking = {
			date: details.date,
			time,
			service,
			price,
		};
		const dateAUS = {
			date: new Date(booking.date).toLocaleDateString(
				'es-ES',
				{
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
				}
			),
		};
		async function bookingCancellation() {
			let info = await transporter.sendMail({
				from: keys.senderNode, // sender address
				to: email, // list of receivers
				subject:
					'Your Booking has been cancelled  - ( DO NOT REPLY )', // Subject line
				text:
					'Your Booking has been cancelled  - ( DO NOT REPLY )', // plain text body
				html: bookingCancelation(
					user,
					booking,
					dateAUS
				), // html body
			});
			//console.log("Message sent: %s", info.messageId);
		}

		bookingCancellation().catch(console.error);
		async function bookingCancellation2() {
			let info2 = await transporter.sendMail({
				from: keys.senderNode, // sender address
				to: CCadmin, // list of receivers
				subject: 'Your Booking has been cancelled', // Subject line
				text: 'Your Booking has been cancelled', // plain text body
				html: bookingCancelation(
					user,
					booking,
					dateAUS
				), // html body
			});
			//console.log("Message sent: %s", info2.messageId);
		}
		bookingCancellation2().catch(console.error);
	};

	//CANCEL BOOKING
	app.post(
		'/api/booking/cancel',
		requireLogin,
		async (req, res) => {
			const {
				_id,
				specialty,
				date,
				time,
				service,
				price,
				bookedByName,
			} = req.body;
			const userID = req.user._id;
			await cancelBooking(
				_id,
				specialty,
				date,
				time,
				service,
				price,
				bookedByName,
				userID
			);
			res.send('cancelled');
		}
	);

	//UPDATE CALENDAR OPEN/CLOSE VIEW
	app.post(
		'/api/calendar/update/opencloseview',
		requireLogin,
		async (req, res) => {
			const { _id, openView } = req.body;
			let updatedView = '';
			if (openView) {
				updatedView = false;
			} else {
				updatedView = true;
			}
			await NewCalendar.updateOne(
				{
					_id,
				},
				{
					$set: {
						openView: updatedView,
					},
				}
			)
				.exec()
				.then((res) => {
					//console.log(res.data);
				})
				.catch((err) => {
					console.log(err, 'err');
				});
			res.send('Successfully Updated!!!');
		}
	);

	//CREATE WAITING LIST
	app.post(
		'/api/booking/waiting-list',
		requireLogin,
		async (req, res) => {
			const {
				date,
				time,
				specialty,
				staff,
				service,
				//	message,
				requestedAt,
			} = req.body;
			const waiting = new WaitingList({
				date,
				time,
				staff,
				specialty,
				service,
				phone: req.user.phone,
				fullName: req.user.fullName,
				userID: req.user._id,
				requestedAt,
				//message,
			});
			await waiting.save();
			res.send(
				'Your request was sent, we will contact you in case of cancelations'
			);
			//console.log("Message sent: %s", info.messageId);
		}
	);

	//FETCHING WAITING LIST
	app.get(
		'/api/booking/waitinglist/get',
		async (req, res) => {
			//let data = [];
			const myWaitingList = await WaitingList.find(
				{}
			).sort('date');
			res.send(myWaitingList);
		}
	);

	//DELETE WAITING LIST
	app.post(
		'/api/booking/waitinglist/delete',
		requireLogin,
		async (req, res) => {
			const { _id } = req.body;
			await WaitingList.deleteOne({
				_id,
			})
				.exec()
				.then((res) => {})
				.catch((err) => {
					console.log(err, 'err');
				});
			res.send('Successfully Updated!!!');
		}
	);

	//UPDATE COMMENTS
	app.post(
		'/api/calendar/comments/update',
		requireLogin,
		async (req, res) => {
			const { _id, comments } = req.body;
			await NewCalendar.updateOne(
				{
					_id,
				},
				{
					$set: {
						comments,
					},
				}
			).exec();
			res.send('Updated!');
		}
	);

	//DELETE COMMENTS
	app.post(
		'/api/calendar/comments/delete',
		requireLogin,
		async (req, res) => {
			const { _id } = req.body;
			await NewCalendar.updateOne(
				{
					_id,
				},
				{
					$set: {
						comments: '',
					},
				}
			).exec();
			res.send('Deleted!');
		}
	);

	//CREATE CALENDAR HISTORY
	app.post(
		'/api/calendar-history/post',
		requireLogin,
		async (req, res) => {
			const {
				processedBy,
				processedDate,
				specialty,
				staff,
				startDate,
				endDate,
				excludedDays,
				isVisible,
				slots,
			} = req.body;
			const s = new CalendarHistory({
				processedBy,
				processedDate,
				specialty,
				staff,
				startDate,
				endDate,
				excludedDays,
				isVisible,
				slots,
			});
			await s.save();
			res.send('Saved!');
		}
	);

	//FETCHING CALENDAR HISTORY
	app.get(
		'/api/calendar-history/get',
		async (req, res) => {
			const sp = await CalendarHistory.find({});
			res.send(sp);
		}
	);

	//DELETE CALENDAR HISTORY
	app.post(
		'/api/calendar-history/delete',
		requireLogin,
		async (req, res) => {
			console.log('bateu');
			const { _id } = req.body;
			await CalendarHistory.findByIdAndRemove({
				_id,
			});
			res.send('Deleted!!');
		}
	);

	//FETCHING CALENDAR BY DATE&SERVICE
	app.post(
		'/api/sales/get',
		requireLogin,
		async (req, res) => {
			const {
				specialty,
				staffID,
				service,
				startDate,
				endDate,
			} = req.body;
			let query = {};

			if (specialty) {
				query.specialty = specialty;
			}
			if (staffID) {
				query.staffID = staffID;
			}
			if (service) {
				query.service = service;
			}
			query.isBooked = true;
			query.date = { $gte: startDate, $lte: endDate };

			const sales = await NewCalendar.find(query);
			res.send(sales);
		}
	);

	//UPDATE BOOKING PAYMENT METHOD
	app.post(
		'/api/booking/payment-method',
		requireLogin,
		async (req, res) => {
			const { bookingID, paymentMethod } = req.body;
			await NewCalendar.updateOne(
				{
					_id: bookingID,
				},
				{
					$set: {
						paymentMethod,
					},
				}
			)
				.exec()
				.then((res) => {
					//console.log(res, 'res');
				})
				.catch((err) => {
					//console.log(err, 'err');
				});
		}
	);
};
