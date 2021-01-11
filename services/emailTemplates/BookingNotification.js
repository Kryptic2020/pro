const keys = require('../../config/keys');

module.exports = (user, booking,dateAUS) => {
	return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Thanks for Enjoying our App</h3>
          <p>Hey ${user.fullName}, </p>
          <p>Booking details </p>
          <p>Date: ${dateAUS.date} </p>
          <p>Time: ${booking.time} </p>
          <p>Service: ${booking.service} </p>
          
          <div>
            <a href="${keys.redirectDomain}/booking/mybooking">
              <div style="border-radius: 2px; background-color:#ED2939">
                <span style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;"> 
                  Open App at My Bookings
                </span>
              </div>
            </a>
          </div>
          <div style="text-align:left">
          <p>Covid-19 Update:</p>
<p>We will be asking our clients to wash their hands when they arrive for their appointments. We will be following all the recommended procedures to ensure ours and our clients health.</p>
<p>Corte feminino- Lave seu cabelo antes de vir caso desejar. ( Nós não temos estrutura para lavar aqui)</p>
<p> 
ENDEREÇO:</p>
<p>50 Mclachlan st, Fortitude Valley, 4006</p>
<p>Importante Leia tudo:</p>
<p>Atendemos dentro do nosso apartamento e devido a necessidade de organização e problemas ocorridos criei essas regras e dicas para um bom atendimento./p>
<p>1- Chegue 10 minutos adiantado e avise ao chegar. O atraso Tolerável é de 10 minutos.</p>
<p>2- Aguarde na entrada principal do prédio 50 Mclachlan st.</p>
<p>-Endereço: 50 Mclachlan st , Fortitude Valley, Postal Code 4006.</p>
<p>3- - A forma de pagamento aceito é somente em CASH.</p>
<p>4- Em caso de imprevisto e cancelamentos que forem avisados ou feitos com 24h de andecedência, não haverá cobrança. No caso de cancelamento no mesmo dia do horário agendado, falta ou atraso acima da tolerância, será cobrado uma taxa de $10,00 no próximo agendamento pelo horário que ficou vago para compensar e não me prejudicar.</p>
<p>Se você não conseguir cancelar pelo aplicativo me avise via mensagem através dos números:</p>
<p>Thiago: 0410477708</p>
<p>Priscila: 0410645743</p>
<p>5- Se vier de Carro ou moto, temos vaga de visitante no prédio a entrada è pela:
WINN ST, quando chegar avise vila ligação ou mensagem para eu abrir a garagem.</p>

<p>Obrigado e conto com sua presença</p>
<p>Important Read all:</p>
<p>We attend our clients inside our apartment and Due to the need for organisation and problems occurred I created these rules and tips for good service.</p>
<p>Woman's Haircut  - Shampoo your hair before came if you want. (We don't have structure to shampooing it here)</p>
<p>1- Arrive 10 minutes early and let us know when you arrive. Tolerable delay is 10 minutes.</p>
<p>2- Wait at the main entrance of the 50 Mclachlan st (Building name)</p>
<p>Address: 50 Mclachlan st, Fortitude Valley, Postal Code 4006.</p>
<p>3- The accepted payment method is only CASH .</p>
<p>4- In case of unforeseen and cancellations that were warned or done 24 h before, there will be no charge. In the case of cancellation on the same day of the scheduled time, no show(no came in the day scheduled) or delay above the tolerance will be charged $ 10.00 fee to compensate for the time that was left vacant and not harm me.</p>
<p>If you can not cancel in the app please text me in the numbers:</p>
<p>Thiago: 0410477708</p>
<p>Priscila: 0410645743</p>
<p>to inform.</p>
<p>5- If you come by Car or motorcycle, we do have a visitor park and the entry is in WINN ST, when you arrive here let us know via message or call and we will open it to you.</p>

<p>Thank in advance, I count on your presence.</p>
          <p>Enjoy your next visit</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
