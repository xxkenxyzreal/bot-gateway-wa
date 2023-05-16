const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Twilio credentials
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const twilioNumber = 'YOUR_TWILIO_PHONE_NUMBER';

// Create a new Twilio client
const client = twilio(accountSid, authToken);

// Handle incoming messages
app.post('/webhook', (req, res) => {
  const twiml = new twilio.twiml.MessagingResponse();

  // Process incoming message
  const message = req.body.Body;
  const sender = req.body.From;

  // TODO: Add your bot logic here
  // Example: Send a response
  twiml.message(`You said: ${message}`);

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

// Start the server
app.listen(3000, () => {
  console.log('Bot gateway for WhatsApp is running on port 3000');
});

// Send a message from your bot
function sendMessage(number, message) {
  client.messages
    .create({
      body: message,
      from: twilioNumber,
      to: number
    })
    .then(message => console.log('Message sent:', message.sid))
    .catch(error => console.error('Error sending message:', error));
}

// Example usage: Send a message to a phone number
const recipientNumber = 'RECIPIENT_PHONE_NUMBER';
const message = 'Hello from your bot!';
sendMessage(recipientNumber, message);
