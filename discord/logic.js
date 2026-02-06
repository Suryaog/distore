const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../settings/config.json');
const chunking = require('./chunking.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });
let db = require('../settings/data.json');

function saveDb() {
    fs.writeFileSync(path.join(__dirname, '../settings/data.json'), JSON.stringify(db, null, 2));
}

async function login() {
    await client.login(config.token);
    console.log(`Bot logged in as ${client.user.tag}`);
}

async function uploadToDiscord(filePath, fileName, socket) {
    const channel = await client.channels.fetch(config.channelId);
    if (!channel) throw new Error('Channel not found');

    const fileId = require('uuid').v4();
    const stats = fs.statSync(filePath);
    const chunks = await chunking.splitAndEncrypt(filePath, config.encryptionKey);
    
    const chunkIds = [];
    let uploadedBytes = 0;
    const startTime = Date.now();

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const attachment = new AttachmentBuilder(chunk.data, { name: `${fileId}_part_${i}.enc` });
        
        const msg = await channel.send({
            content: `File: ${fileName} | Part: ${i + 1}/${chunks.length}`,
            files: [attachment]
        });

        chunkIds.push({
            msgId: msg.id,
            iv: chunk.iv
        });

        uploadedBytes += chunk.data.length;
        const elapsed = (Date.now() - startTime) / 1000;
        const speed = (uploadedBytes / 1024 / 1024 / elapsed).toFixed(2);
        
        if (socket) {
            socket.emit('uploadProgress', {
                percent: Math.round(((i + 1) / chunks.length) * 100),
                speed: `${speed} MB/s`,
                status: `Uploading chunk ${i + 1} of ${chunks.length} to Discord...`
            });
        }
    }

    const fileData = {
        id: fileId,
        name: fileName,
        size: stats.size,
        uploadDate: new Date().toISOString(),
        chunks: chunkIds
    };

    db.push(fileData);
    saveDb();
    return fileData;
}

async function downloadFromDiscord(fileId) {
    const fileEntry = db.find(f => f.id === fileId);
    if (!fileEntry) throw new Error('File not found');

    const channel = await client.channels.fetch(config.channelId);
    const buffers = [];

    for (const chunkInfo of fileEntry.chunks) {
        const msg = await channel.messages.fetch(chunkInfo.msgId);
        const attachmentUrl = msg.attachments.first().url;
        
        const response = await fetch(attachmentUrl);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const decrypted = chunking.decryptBuffer(buffer, config.encryptionKey, chunkInfo.iv);
        buffers.push(decrypted);
    }

    return {
        buffer: Buffer.concat(buffers),
        name: fileEntry.name
    };
}

function getFiles() {
    return db.map(f => ({ id: f.id, name: f.name, size: f.size, date: f.uploadDate }));
}

module.exports = { login, uploadToDiscord, downloadFromDiscord, getFiles };
      
