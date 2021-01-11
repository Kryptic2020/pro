const keys = require('../../config/keys');

module.exports = (user) => {
	return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Email Confirmation!</h3>
          <p>Hey ${user.fullName}, you're almost ready to start enjoying our Web App. </p>
          <p>Simply click the big red button bellow to verify your email address.</p>
          <div>
            <a href="${keys.redirectDomain}/api/emailvalidation/${user.token}">
              <div style="border-radius: 2px; background-color:#ED2939">
                <span style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">Verify Email</span>
              </div>
            </a>
          </div>
        </div>
      </body>
    </html>
  `;
};
