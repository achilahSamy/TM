const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


const config = require('../config/mail.js');

router.get('/', (req, res) => {
  res.render("contactus", {
    title: "Contact Us"
  });
});

router.post('/', (req, res) => {

  const {
    fname,
    lname,
    email,
    tel,
    message
  } = req.body;
  let errors = [];

  if (!fname || !lname || !email || !tel || !message) {
    errors.push({
      msg: 'Please fill in all fields'
    });
  }

  if (tel.length > 16 || tel.length < 10) {
    errors.push({
      msg: 'Invalid phone number'
    });
  }

  if (errors.length > 0) {
    res.render('contactus', {
      title: "Contact US",
      errors,
      fname,
      lname,
      email,
      tel,
      message
    });
  } else {
    const output = `
          <p>You have a message</p>
          <h3>Contact Details</h3>
          <p>Name: ${req.body.fname}, ${req.body.lname}</p>
          <p>Email: ${req.body.email}, Phone no.: ${req.body.tel}</p>
          <h3>Message</h3>
          <p>${req.body.message}</p>
      `; // Email Template

    let transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false,
      auth: {
        user: config.user,
        pass: config.pass
      },
      tls: {
        rejectUnauthorized: false
      }
    }); // Create reusable transporter object using the default SMTP transport

    // Use this is you want to use Gmail SMTP
    //     let transporter = nodemailer.createTransport(
    //             `smtps://${config.user}:${config.pass}@smtp.gmail.com`
    //     );

    let mailOptions = {
      from: config.from,
      to: config.to,
      subject: config.subject,
      html: output
    }; // Setup email settings

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessagerUrl(info));

      req.flash('success_msg',
        'You mail was sent; thanks for reaching out!!');
      res.redirect('/contact');

    }); // Send mail with defined transport object

  }

});


module.exports = router;
