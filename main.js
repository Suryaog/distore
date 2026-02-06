const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const discordLogic = require('./discord/logic.js');
const config = require('./settings/config.json');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const upload = multer({ dest: 'uploads/' });

app.use(express.static('frontend'));
app.use(express.json());

discordLogic.login();

io.on('connection', (socket) => {
    console.log('Client connected');
});

app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded');
    
    const socketId = req.body.socketId;
    const socket = io.sockets.sockets.get(socketId);

    try {
        await discordLogic.uploadToDiscord(req.file.path, req.file.originalname, socket);
        fs.unlinkSync(req.file.path); 
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/files', (req, res) => {
    res.json(discordLogic.getFiles());
});

app.get('/download/:id', async (req, res) => {
    try {
        const { buffer, name } = await discordLogic.downloadFromDiscord(req.params.id);
        res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
        res.send(buffer);
    } catch (err) {
        res.status(500).send('Error downloading file');
    }
});

server.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
});
