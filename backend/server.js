// server/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const BASE_DIR = path.join(__dirname, 'user_files');
if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR);
}

// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, BASE_DIR),
    filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

// Routes
app.post('/upload', upload.array('files'), (req, res) => {
    res.json({ message: 'Files uploaded successfully!' });
});

app.post('/create', (req, res) => {
    const { filename, content } = req.body;
    const filePath = path.join(BASE_DIR, filename);
    fs.writeFile(filePath, content, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'File created successfully!' });
    });
});

app.post('/edit', (req, res) => {
    const { filename, content } = req.body;
    const filePath = path.join(BASE_DIR, filename);
    fs.writeFile(filePath, content, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'File edited successfully!' });
    });
});

app.post('/delete', (req, res) => {
    const { filename } = req.body;
    const filePath = path.join(BASE_DIR, filename);
    fs.unlink(filePath, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'File deleted successfully!' });
    });
});

app.listen(PORT, () => console.log(`✅ MCP Server running at http://localhost:${PORT}`));
