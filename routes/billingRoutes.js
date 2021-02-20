const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
	app.post(
		'/api/stripe',
		requireLogin,
		async (req, res) => {
			//console.log(req.body, 'hello');
			const { amount, description, token } = req.body;
			const charge = await stripe.charges.create({
				amount,
				currency: 'aud',
				description,
				source: token.id,
			});
			console.log(charge);
			//	res.send(charge);
		}
	);
};
