const keys = require('../../config/keys');

module.exports = (user, booking, dateAUS) => {
	return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Thanks for Enjoying our App</h3>
          <p>Hey ${user.fullName}, </p>
          <p>The Booking below has been cancelled: </p>
          <p>Date: ${dateAUS.date} </p>
          <p>Time: ${booking.time} </p>
          <p>Service: ${booking.service} </p>
          <p>Price: ${booking.price} </p>
          
          <div>
            <a href="${keys.redirectDomain}/booking/mybooking">
              <div style="border-radius: 2px; background-color:#ED2939">
                <span style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">Open App at My Bookings
                </span>
              </div>
            </a>
          </div>
          <div style="text-align:left">

          <p>Thank You!</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
