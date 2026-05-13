const fs = require('fs');
const path = require('path');

const LIVE_DOC_PATH = 'c:/Users/kaueb/SYNC/00 - Dashboards/Antigravity Live Feed.md';

console.log('Checking path:', LIVE_DOC_PATH);
console.log('Exists:', fs.existsSync(LIVE_DOC_PATH));

if (fs.existsSync(LIVE_DOC_PATH)) {
    console.log('Content:', fs.readFileSync(LIVE_DOC_PATH, 'utf8'));
} else {
    const dir = path.dirname(LIVE_DOC_PATH);
    console.log('Directory exists:', fs.existsSync(dir));
    if (!fs.existsSync(dir)) {
        console.log('Attempting to create directory...');
        fs.mkdirSync(dir, { recursive: true });
        console.log('Directory created:', fs.existsSync(dir));
    }
}
