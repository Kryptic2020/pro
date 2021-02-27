const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
	constructor({ subject, to }, content) {
		super();

		this.sgApi = sendgrid(keys.sendGridKey);
		this.from_email = new helper.Email(keys.sender);
		this.subject = subject;
		this.body = new helper.Content(
			'text/html',
			content
		);
		this.to = this.formatAddresses(to);
		this.addContent(this.body);
		this.addTo();
	}
	formatAddresses(to) {
		return new helper.Email(to);
	}

	addTo() {
		const personalize = new helper.Personalization();

		personalize.addTo(this.to);

		this.addPersonalization(personalize);
	}

	async send() {
		const request = this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON(),
		});

		const response = await this.sgApi.API(request);
		return response;
	}
}

module.exports = Mailer;
