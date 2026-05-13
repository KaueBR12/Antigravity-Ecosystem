const https = require('https');
const { execSync } = require('child_process');

const API_KEY = 'd82f4cbd37c9683575539385788838ea91640dac7e8046cfbf81b2b1003d3f53';
const PORT = 27124; // Porta padrão do Obsidian Local REST API
const HOST = '127.0.0.1';

async function updateObsidianLog(message) {
    const timestamp = new Date().toLocaleString('pt-BR');
    const content = `\n- [${timestamp}] ${message}`;
    
    const options = {
        hostname: HOST,
        port: PORT,
        path: '/vault/Log%20de%20Sincroniza%C3%A7%C3%A3o.md',
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'text/markdown',
            'Heading': 'Histórico de Sincronização'
        },
        rejectUnauthorized: false // Permite certificados auto-assinados comuns no Obsidian Local API
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                resolve();
            } else {
                reject(new Error(`Obsidian API Error: ${res.statusCode}`));
            }
        });
        req.on('error', reject);
        req.write(content);
        req.end();
    });
}

function syncGit() {
    try {
        execSync('git add .', { stdio: 'inherit' });
        const status = execSync('git status --porcelain').toString();
        if (status) {
            execSync('git commit -m "Auto-sync: ' + new Date().toISOString() + '"', { stdio: 'inherit' });
            return "Git: Alterações commitadas.";
        }
        return "Git: Nada para commitar.";
    } catch (error) {
        return "Git: Erro na sincronização - " + error.message;
    }
}

async function main() {
    console.log("Iniciando Sincronização...");
    const gitResult = syncGit();
    console.log(gitResult);
    
    try {
        await updateObsidianLog(gitResult);
        console.log("Log do Obsidian atualizado.");
    } catch (error) {
        console.error("Erro ao atualizar Obsidian:", error.message);
    }
}

main();
