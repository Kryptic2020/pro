//prod.js - production keys here!

module.exports = {
	googleClientID: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	mongoURI: process.env.MONGO_URI,
	cookieKey: process.env.COOKIE_KEY,
	stripePublishableKey:
		process.env.STRIPE_PUBLISHABLE_KEY,
	stripeSecretKey: process.env.STRIPE_SECRET_KEY,
	sendGridKey: process.env.SEND_GRID_KEY,

	redirectDomain: process.env.REDIRECT_DOMAIN,
	facebookClientID: process.env.FACEBOOK_CLIENT_ID,
	facebookClientSecret:
		process.env.FACEBOOK_CLIENT_SECRET,
	sender: process.env.SENDER,
	senderNode: process.env.SENDER_NODE,
	CCadmin: process.env.CC_ADMIN,
	host: process.env.HOST,
	user: process.env.USER,
	pass: process.env.PASS,
	tls: process.env.TLS,
};
