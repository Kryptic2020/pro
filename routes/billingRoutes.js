const mongoose = require('mongoose');
const NewCalendar = mongoose.model('newCalendar');
//const bodyParser = require('body-parser');
//const { el } = require('date-fns/locale');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

//const requireLogin = require('../middlewares/requireLogin');

const endpointSecret =
	'whsec_Wa1rjTRdMaYmP9zSe3ICAA7xH7MDZRMd';

module.exports = (app) => {
	app.post(
		'/api/create-checkout-session',
		async (req, res) => {
			const {
				bookingID,
				price,
				service,
				specialty,
			} = req.body;
			const session = await stripe.checkout.sessions.create(
				{
					payment_method_types: ['card'],
					metadata: {
						order_id: bookingID,
					},

					line_items: [
						{
							price_data: {
								currency: 'aud',
								product_data: {
									name: specialty,
									description: service,
								},
								unit_amount: price * 100,
							},
							quantity: 1,
						},
					],
					mode: 'payment',
					success_url:
						keys.redirectDomain +
						'/my-bookings',
					cancel_url:
						keys.redirectDomain + '/book-now',
				}
			);
			res.send(session.id);
		}
	);
	app.post('/api/webhook', async (req, res) => {
		let obj = '';
		if (req.body.type === 'payment_intent.created') {
			const timeoutObj = setTimeout(async () => {
				const id = await stripe.paymentIntents.cancel(
					req.body.data.object.id
				);
			}, 120000);
			if (
				req.body.type ===
					'checkout.session.completed' &&
				req.body.data.object.payment_status ===
					'paid'
			) {
				clearTimeout(timeoutObj);
				timeoutObj.unref();
			}
		}
		if (
			req.body.type ===
				'checkout.session.completed' &&
			req.body.data.object.payment_status === 'paid'
		) {
			//HERE WE GOT THE PAYMENT CONFIRMATION AND WILL RECORD IT ON THE BOOKING

			const updated = await NewCalendar.updateOne(
				{
					_id:
						req.body.data.object.metadata
							.order_id,
				},
				{
					$set: {
						isPaid: true,
					},
				}
			)
				.exec()
				.then((res) => {})
				.catch((err) => {
					//console.log(err, 'err');
				});
		}

		const sig = req.headers['stripe-signature'];
		let event;

		try {
			event = stripe.webhooks.constructEvent(
				payload,
				sig,
				endpointSecret
			);
		} catch (err) {
			return res
				.status(400)
				.send(`Webhook Error: ${err.message}`);
		}

		response.status(200);
	});
};
