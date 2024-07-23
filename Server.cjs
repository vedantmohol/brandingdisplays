const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const https = require('https');
const querystring = require('querystring');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const dataFilePath = path.join(__dirname, 'data.json');
const uploadsDir = path.join(__dirname, 'public/uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.get('/api/data', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading data file' });
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/data', (req, res) => {
  fs.writeFile(dataFilePath, JSON.stringify(req.body, null, 2), 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error writing data file' });
    }
    res.json({ message: 'Data saved successfully' });
  });
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

let otps = {}; // Store OTPs temporarily
const userPasswords = {};

function generateOtp() {
  return crypto.randomInt(1000, 9999).toString();
}

function sendOtpEmail(email, otp, res) {
  const postData = querystring.stringify({
    access_key: '2ee767f0-da2f-492a-bdab-fd378eac9f2a',
    email: email,
    subject: 'Your OTP Code',
    message: `Your OTP code is ${otp}`
  });

  const options = {
    hostname: 'api.web3forms.com',
    port: 443,
    path: '/submit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  const request = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        if (parsedData.success) {
          res.status(200).json({ message: 'OTP sent successfully' });
        } else {
          console.error('Error from Web3Forms:', parsedData.message);
          res.status(500).json({ error: parsedData.message });
        }
      } catch (error) {
        console.error('Error parsing JSON:', data);
        res.status(500).json({ error: 'Error sending OTP' });
      }
    });
  });

  request.on('error', (e) => {
    console.error('Error sending OTP:', e);
    res.status(500).json({ error: 'Error sending OTP' });
  });

  request.write(postData);
  request.end();
}

const hardcodedEmail = 'vedantmohol18@gmail.com';

app.post('/api/send-otp', (req, res) => {
  const otp = generateOtp();
  otps[hardcodedEmail] = otp;
  sendOtpEmail(hardcodedEmail, otp, res);
});

app.post('/api/verify-otp', (req, res) => {
  const { otp } = req.body;
  if (otps[hardcodedEmail] && otps[hardcodedEmail] === otp) {
    delete otps[hardcodedEmail];
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
});

app.post('/api/resend-otp', (req, res) => {
  const otp = generateOtp();
  otps[hardcodedEmail] = otp;
  sendOtpEmail(hardcodedEmail, otp, res);
});

app.post('/api/reset-password', (req, res) => {
  const { newpassword } = req.body;
  if (newpassword) {
    userPasswords[hardcodedEmail] = newpassword; // Store the password (for demonstration purposes)
    res.status(200).json({ message: 'Password reset successfully' });
  } else {
    res.status(400).json({ error: 'Password is required' });
  }
});

app.post('/api/send-email', (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const postData = querystring.stringify({
    access_key: '2ee767f0-da2f-492a-bdab-fd378eac9f2a',
    name: name,
    phone: phone,
    email: email,
    message: message
  });

  const options = {
    hostname: 'api.web3forms.com',
    port: 443,
    path: '/submit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  const request = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        if (parsedData.success) {
          res.status(200).json({ message: 'Email sent successfully' });
        } else {
          console.error('Error from Web3Forms:', parsedData.message);
          res.status(500).json({ error: parsedData.message });
        }
      } catch (error) {
        console.error('Error parsing JSON:', data);
        res.status(500).json({ error: 'Error sending email' });
      }
    });
  });

  request.on('error', (e) => {
    console.error('Error sending email:', e);
    res.status(500).json({ error: 'Error sending email' });
  });

  request.write(postData);
  request.end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
