const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000; // Change this to your desired port number or 5500 for VS Code Live Server

app.use(express.json());


app.post('/send-message', (req, res) => {
  const { name, email, phoneNumber, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-gmail-username', // Replace with your Gmail username
      pass: 'your-gmail-password', // Replace with your Gmail password
    },
  });

  // Email message options
  const mailOptions = {
    from: 'your-gmail-username', // Replace with your Gmail username (same as above)
    to: 'your-email-address@example.com', // Replace with your email address where you want to receive messages
    subject: 'New Message from Portfolio Contact Form',
    html: `
      <h3>Name: ${name}</h3>
      <h3>Email: ${email}</h3>
      <h3>Phone Number: ${phoneNumber}</h3>
      <p>${message}</p>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Failed to send message');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Message sent successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
