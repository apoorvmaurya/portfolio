const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 5500;

const accountSid = '';
const authToken = '';
const client = twilio(accountSid, authToken);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the same directory as server.js
app.use(express.static(__dirname));

// Endpoint to handle incoming user data and send the WhatsApp message
app.post('/send-message', (req, res) => {
  const { name, phone, email, message } = req.body;
  const toPhoneNumber = '+917081817800'; // Replace with your WhatsApp number (Twilio verified phone number)

  const textMessage = `New message from ${name} (${email}) no.${phone} : ${message}`;

  // Use Twilio to send a WhatsApp message
  client.messages
    .create({
      body: textMessage,
      from: 'whatsapp:+14155238886', // This is the Twilio sandbox WhatsApp number
      to: `whatsapp:${toPhoneNumber}`,
    })
    .then((message) => {
      console.log(message.sid); // Log Twilio response SID to the console
      res.send('Message sent successfully!');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Failed to send the message.');
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
