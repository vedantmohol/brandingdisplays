const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

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

app.post('/api/send-email', async (req, res) => {
  const { name, phone, email, message } = req.body;

  try {
    const formData = new URLSearchParams();
    formData.append('access_key', 'YOUR_ACCESS_KEY_HERE');
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('message', message);

    // Dynamic import of node-fetch
    const fetch = await import('node-fetch');

    const response = await fetch.default('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      res.status(200).json({ message: 'Email sent successfully' });
    } else {
      res.status(500).json({ error: data.message });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
