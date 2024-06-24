const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3080;

app.use(express.static(__dirname));

app.use('/js', express.static(path.join(__dirname, 'src', 'js')));

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});