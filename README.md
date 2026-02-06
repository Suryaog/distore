# 🚀 Discord Drive: Infinite Cloud Storage

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge) ![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-green.svg?style=for-the-badge) ![License](https://img.shields.io/badge/license-MIT-orange.svg?style=for-the-badge) ![Status](https://img.shields.io/badge/status-operational-success.svg?style=for-the-badge)

> **Turn your Discord Server into a secured, infinite capacity Cloud Storage system.**

**Discord Drive** is an advanced Proof of Concept (PoC) that exploits Discord's attachment system to store files of **any size**. It bypasses the standard 25MB file limit by intelligently chunking data, encrypting it with military-grade AES-256, and distributing it across a private Discord channel.

It features a beautiful, dark-themed **Web Dashboard** with real-time transfer speeds, drag-and-drop uploads, and instant file retrieval.



---

## ✨ Advanced Features

* **⚡ Infinite Storage Capacity**
Bypass Discord's 25MB limit. Files are automatically split into 5MB "chunks," uploaded individually, and virtually stitched back together upon download.

* **🔒 AES-256 Encryption**
Your data is private. Every chunk is encrypted locally before it ever touches Discord's servers. Even if someone finds the attachment links, they only see garbage data without your key.

* **📊 Real-Time Progress Bar**
Powered by `Socket.io`, track your upload status, transfer speed (MB/s), and chunking progress live from the browser.

* **🎨 Modern Dark UI**
A sleek, responsive frontend built with modern CSS variables, featuring Drag & Drop support, file search, and storage usage statistics.

* **🚀 High-Speed I/O**
Utilizes Node.js Streams and Buffers to handle file splitting and merging efficiently without overloading server memory.

---

## 🛠️ Architecture

Here is how the magic happens under the hood:

1. **Upload**: The frontend sends the file to the local Node.js server.
2. **Chunking**: The server slices the file into **5MB** pieces.
3. **Encryption**: Each piece is encrypted using `AES-256-CTR` with a unique Initialization Vector (IV).
4. **Distribution**: The bot uploads these encrypted chunks to your specified Discord channel as attachments.
5. **Indexing**: The message IDs and IVs are saved to `data.json`.
6. **Retrieval**: When you click download, the bot fetches all chunks, decrypts them, merges them into a single stream, and serves the original file.

---

## ⚙️ Installation & Setup

### 1. Prerequisites
* Node.js (v16 or higher)
* A Discord Account
* A Discord Server (Guild) created for storage

### 2. Clone & Install
Download the source code and install the dependencies:
`npm install`

### 3. Discord Bot Setup
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Create a **New Application** -> **Bot**.
3. **Enable Message Content Intent** in the Bot settings.
4. Copy your **Bot Token**.
5. Invite the bot to your server using OAuth2 (Scopes: `bot`, Permissions: `Send Messages`, `Read Messages`, `Attach Files`).

### 4. Configuration
Open `settings/config.json` and configure your credentials:

{
  "token": "PASTE_YOUR_BOT_TOKEN_HERE",
  "guildId": "YOUR_SERVER_ID",
  "channelId": "YOUR_CHANNEL_ID_WHERE_FILES_GO",
  "encryptionKey": "CREATE_A_RANDOM_32_CHAR_STRING_HERE",
  "port": 3000
}

> **Note:** The `encryptionKey` **MUST** be exactly 32 characters long for AES-256.

---

## 🚀 Usage Guide

### Starting the Server
Run the main entry point to start the Express server and the Discord bot:
`node main.js`

### Using the Interface
1. Open your web browser and navigate to `http://localhost:3000`.
2. **Upload**: Drag and drop any file into the drop zone. Watch the progress bar as it pushes to Discord.
3. **Search**: Use the search bar to filter through your uploaded files instantly.
4. **Download**: Click download. The server pulls chunks from Discord and decrypts them on the fly.

---

## 📂 Project Structure

discord-drive/
├── frontend/             # The Web Interface
│   ├── index.html        # Main Dashboard
│   ├── style.css         # Modern Dark Theme Styling
│   └── script.js         # Frontend Logic & Socket.io
├── discord/              # Backend Logic
│   ├── chunking.js       # Encryption & File Splitting Algo
│   └── logic.js          # Discord API Interactions
├── settings/             # Configuration
│   ├── config.json       # Secrets & Keys
│   └── data.json         # Database of file indices
├── uploads/              # Temp folder for processing
├── main.js               # Server Entry Point
└── package.json          # Dependencies

---

## ⚠️ Disclaimer

**This project is for educational purposes only.** Using Discord as a file storage service (CDN) for large-scale data may violate Discord's [Terms of Service](https://discord.com/terms). The author is not responsible for any banned accounts or lost data.

---

## 🤝 Contributing

Pull requests are welcome! Enjoy your free unlimited cloud storage! ☁️

---

## ✨ Advanced Features

* **⚡ Infinite Storage Capacity** Bypass Discord's 25MB limit. Files are automatically split into 5MB "chunks," uploaded individually, and virtually stitched back together upon download.

* **🔒 AES-256 Encryption** Your data is private. Every chunk is encrypted locally before it ever touches Discord's servers. Even if someone finds the attachment links, they only see garbage data without your key.

* **📊 Real-Time Progress Bar** Powered by `Socket.io`, track your upload status, transfer speed (MB/s), and chunking progress live from the browser.

* **🎨 Modern Dark UI** A sleek, responsive frontend built with modern CSS variables, featuring Drag & Drop support, file search, and storage usage statistics.

* **🚀 High-Speed I/O** Utilizes Node.js Streams and Buffers to handle file splitting and merging efficiently without overloading server memory.

---

## 🛠️ Architecture

Here is how the magic happens under the hood:

1.  **Upload**: The frontend sends the file to the local Node.js server.
2.  **Chunking**: The server slices the file into **5MB** pieces.
3.  **Encryption**: Each piece is encrypted using `AES-256-CTR` with a unique Initialization Vector (IV).
4.  **Distribution**: The bot uploads these encrypted chunks to your specified Discord channel as attachments.
5.  **Indexing**: The message IDs and IVs are saved to `data.json`.
6.  **Retrieval**: When you click download, the bot fetches all chunks, decrypts them, merges them into a single stream, and serves the original file.

---

## ⚙️ Installation & Setup

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (v16 or higher)
* A Discord Account
* A Discord Server (Guild) created for storage

### 2. Clone & Install
Download the source code and install the dependencies:
```bash
npm install```
### 3. Discord Bot Setup
Go to the Discord Developer Portal.
Create a New Application -> Bot.
Enable Message Content Intent in the Bot settings.
Copy your Bot Token.
Invite the bot to your server using OAuth2 (Scopes: bot, Permissions: Send Messages, Read Messages, Attach Files).
### 4. Configuration
Open settings/config.json and configure your credentials:
