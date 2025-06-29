const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { sampleSize } = require('lodash');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.array('images'), (req, res) => {
  res.json({ message: 'Files uploaded successfully', files: req.files });
});

app.get('/random-images', (req, res) => {
  fs.readdir('./uploads', (err, files) => {
    if (err) return res.status(500).send('Server error');
    const randomFiles = sampleSize(files, 3).map(f => `http://localhost:${PORT}/uploads/${f}`);
    res.json(randomFiles);
  });
});

app.post('/upload-dog', async (req, res) => {
  const { url } = req.body;
  const filename = `dog_${Date.now()}.jpg`;
  const filePath = path.join(__dirname, 'uploads', filename);
  const response = await axios.get(url, { responseType: 'stream' });

  response.data.pipe(fs.createWriteStream(filePath)).on('finish', () => {
    res.json({ message: 'Dog image saved', path: `/uploads/${filename}` });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
