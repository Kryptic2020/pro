const keys = require('../../config/keys');

module.exports = (user, booking,dateAUS) => {
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
          
          <div>
            <a href="${keys.redirectDomain}/booking/mybooking">
              <div style="border-radius: 2px; background-color:#ED2939">
                <span style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">Open App at My Bookings
                </span>
              </div>
            </a>
          </div>
          <div style="text-align:left">
          <p>English</p>
<p>In case of unforeseen and cancellations that were warned the or done before 24 h, there will be no charge. In the case of cancellation on the same day of the scheduled time, no show (no came in the day scheduled) or delay above the tolerance will be charged the fee for the schedule that was vacant $10.00 on the next schedule to compensate the schedule that I was vacant and not harm me.</p>
<p>If you can not cancel in the app please text me in the numbers:</p>
<p>Thiago: 0410477708,</p>

<p>Priscila: 0410645743</p>

<p>to inform.</p>
<p>Thank in advance.</p>

<p>Portuguese</p>
<p>Em caso de imprevisto e cancelamentos que forem 24h antes do horário agendado, não haverá cobrança. No caso de cancelamento no mesmo dia do horário agendado, falta ou atraso acima da tolerância será cobrado a taxa de $10,00 para compensar o horário que ficou vago e não me prejudicar.</p>

<p>Se você não conseguir cancelar pelo aplicativo me avise via mensagem através dos números:</p>

<p>Thiago: 0410477708,</p>

<p>Priscila: 0410645743</p>

<p>Obrigado.</p>
          <p>Enjoy your next visit</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
