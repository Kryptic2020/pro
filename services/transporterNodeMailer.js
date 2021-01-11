const nodemailer = require('nodemailer');
const keys = require('../config/keys');

module.exports = nodemailer.createTransport({
        host: keys.host,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: keys.user, 
          pass: keys.pass, 
        },
        tls: {
          rejectUnauthorized:keys.tls,
        }
});
      









