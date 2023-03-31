const nodemailer = require('nodemailer');
 
module.exports = (app) => {
  app.post('/api/contact', (req, res) => {
    const { email, subject, message } = req.body;

    // TO DO VERIFICATION
    const transporter = nodemailer.createTransport({
      service: "gmail.com",
      auth: {
        user: "sctbettesty1234@gmail.com",
        pass: "testy1234",
      },
    });
    
    const mailOptions = {
      from: 'nedvedek111@gmail.com',
      to: 'nedvedek111@gmail.com',
      replyTo: email,
      subject,
      text: message,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      console.log(err && err.stack);
      console.dir(info);

      if (!err) {
        return res.status(200).send({ message: 'Success '});
      }
      
      return res.status(500).send({ message: 'Something went wrong while sending email '});
    });
  });
};
