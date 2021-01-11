const keys = require('../../config/keys');

module.exports = (user) => {
	return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Reset Passord Link!</h3>
          <p>Hey ${user.fullName}, you're almost back enjoying our Web App. </p>
          <p>Simply click the big red button bellow to reset your password.</p>
          <div>
            <div style="border-radius: 2px; background-color:#ED2939">
            <a style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;" href="${keys.redirectDomain}/newpass/?key=${user.token}">
            Reset Password
            </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};
