const socket = io();
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const statusText = document.getElementById('statusText');
const speedText = document.getElementById('speedText');
const fileTableBody = document.getElementById('fileTableBody');
const searchInput = document.getElementById('searchInput');

let allFiles = [];

dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#5865F2';
});

dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#2f3136';
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#2f3136';
    if (e.dataTransfer.files.length) handleUpload(e.dataTransfer.files[0]);
});

fileInput.addEventListener('change', (e) => {
    if (fileInput.files.length) handleUpload(fileInput.files[0]);
});

async function handleUpload(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('socketId', socket.id);

    progressContainer.style.display = 'block';
    statusText.innerText = 'Uploading to server...';
    progressBar.style.width = '0%';
    
    const startTime = Date.now();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);

    xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
            const percent = (e.loaded / e.total) * 100;
            const elapsed = (Date.now() - startTime) / 1000;
            const speed = (e.loaded / 1024 / 1024 / elapsed).toFixed(2);
            
            // Client upload is the first 50% of the bar
            progressBar.style.width = (percent / 2) + '%';
            speedText.innerText = `${speed} MB/s`;
            statusText.innerText = `Uploading to Server: ${Math.round(percent)}%`;
        }
    };

    xhr.onload = () => {
        if (xhr.status === 200) {
            statusText.innerText = 'Processing & Encrypting...';
            loadFiles();
        } else {
            statusText.innerText = 'Error Uploading';
            statusText.style.color = '#ed4245';
        }
    };

    xhr.send(formData);
}

socket.on('uploadProgress', (data) => {
    // Discord upload is the second 50% of the bar
    const visualPercent = 50 + (data.percent / 2);
    progressBar.style.width = visualPercent + '%';
    speedText.innerText = data.speed;
    statusText.innerText = data.status;

    if (data.percent === 100) {
        setTimeout(() => {
            progressContainer.style.display = 'none';
            loadFiles();
        }, 1000);
    }
});

async function loadFiles() {
    const res = await fetch('/files');
    allFiles = await res.json();
    renderFiles(allFiles);
    updateStats();
}

function renderFiles(files) {
    fileTableBody.innerHTML = '';
    files.forEach(file => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><i class="fas fa-file"></i> ${file.name}</td>
            <td>${formatSize(file.size)}</td>
            <td>${new Date(file.date).toLocaleDateString()}</td>
            <td><a href="/download/${file.id}" class="btn-download" target="_blank"><i class="fas fa-download"></i> Download</a></td>
        `;
        fileTableBody.appendChild(row);
    });
}

function formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function updateStats() {
    const totalSize = allFiles.reduce((acc, file) => acc + file.size, 0);
    document.getElementById('fileCount').innerText = `${allFiles.length} Files`;
    document.getElementById('totalSize').innerText = `${formatSize(totalSize)} Used`;
}

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allFiles.filter(f => f.name.toLowerCase().includes(term));
    renderFiles(filtered);
});

loadFiles();
