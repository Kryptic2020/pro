const keys = require('../../config/keys');

module.exports = (user) => {
	return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>A new user has been registered into our app!</h3>
          <p>Hello Admin! </p>
          <p>We had a new register for ${user.fullName} </p>
          <p>email ${user.email} </p>
          <p>phone ${'0'+user.phone} </p>
          <div>
            <a  href="${keys.redirectDomain}/contacts">
              <div style="border-radius: 2px; background-color:#ED2939">
                <span style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;" > Open App at contacts </span>
              </div>
            </a>
          </div>
          <p>Enjoy your new users/clients</p>
        </div>
      </body>
    </html>
  `;
};
