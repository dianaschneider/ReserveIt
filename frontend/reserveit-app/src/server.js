const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Endpoint to serve files based on the provided file path
app.get('/file', (req, res) => {
    const filePath = req.query.path;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(500).send('File not found');
        } else {
            const ext = path.extname(filePath);
            let contentType = 'application/octet-stream';

            if (ext === '.pdf') contentType = 'application/pdf';
            else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
            else if (ext === '.png') contentType = 'image/png';
            else if (ext === '.txt') contentType = 'text/plain';

            res.setHeader('Content-Type', contentType);
            res.send(data);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
