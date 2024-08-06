const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Tesseract = require('tesseract.js');

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

app.post('/recognize-text', upload.single('image'), (req, res) => {
    const imageBuffer = req.file.buffer;

    Tesseract.recognize(
        imageBuffer,
        'eng',
        {
            logger: m => console.log(m),
        }
    )
    .then(({ data: { text } }) => {
        res.json({ text });
    })
    .catch(err => {
        res.status(500).json({ error: 'Text recognition failed' });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
