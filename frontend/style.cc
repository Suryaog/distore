:root {
    --bg-primary: #36393f;
    --bg-secondary: #2f3136;
    --accent: #5865F2;
    --text-primary: #ffffff;
    --text-secondary: #b9bbbe;
    --success: #3ba55c;
    --danger: #ed4245;
}

body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    display: flex;
    justify-content: center;
    min-height: 100vh;
}

.container {
    width: 900px;
    padding: 20px;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    border-bottom: 2px solid var(--bg-secondary);
    padding-bottom: 20px;
}

h1 {
    margin: 0;
    color: var(--accent);
    display: flex;
    align-items: center;
    gap: 10px;
}

.drop-zone {
    border: 2px dashed var(--bg-secondary);
    border-radius: 10px;
    padding: 40px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    background-color: var(--bg-secondary);
}

.drop-zone:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
}

.drop-zone i {
    font-size: 40px;
    color: var(--accent);
    margin-bottom: 10px;
}

.progress-container {
    margin-top: 20px;
    background: var(--bg-secondary);
    padding: 15px;
    border-radius: 8px;
}

.progress-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 0.9em;
    color: var(--text-secondary);
}

.progress-bar-bg {
    height: 8px;
    background: #202225;
    border-radius: 4px;
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    background: var(--accent);
    width: 0%;
    transition: width 0.3s ease;
}

.search-bar {
    margin-top: 30px;
    background: var(--bg-secondary);
    padding: 10px 15px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.search-bar input {
    background: transparent;
    border: none;
    color: white;
    width: 100%;
    outline: none;
    font-size: 16px;
}

table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
}

th {
    text-align: left;
    color: var(--text-secondary);
    padding: 10px;
    border-bottom: 1px solid var(--bg-secondary);
}

td {
    padding: 15px 10px;
    border-bottom: 1px solid var(--bg-secondary);
}

.btn-download {
    background: var(--success);
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    font-size: 0.9em;
    transition: opacity 0.2s;
}

.btn-download:hover {
    opacity: 0.8;
}

::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
    background: #202225;
    border-radius: 4px;
      }
  
