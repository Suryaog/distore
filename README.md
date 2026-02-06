# 🚀 Discord Drive: Infinite Cloud Storage

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=for-the-badge) ![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-green.svg?style=for-the-badge) ![License](https://img.shields.io/badge/license-MIT-orange.svg?style=for-the-badge) ![Status](https://img.shields.io/badge/status-operational-success.svg?style=for-the-badge)

> **Turn your Discord Server into a secured, infinite capacity Cloud Storage system.**

**Discord Drive** is an advanced Proof of Concept (PoC) that exploits Discord's attachment system to store files of **any size**. It bypasses the standard 25MB file limit by intelligently chunking data, encrypting it with military-grade AES-256, and distributing it across a private Discord channel.

It features a beautiful, dark-themed **Web Dashboard** with real-time transfer speeds, drag-and-drop uploads, and instant file retrieval.

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
# Install dependencies
npm install
