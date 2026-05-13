const http = require('http');

function sendRequest(path, method, data) {
  const postData = JSON.stringify(data);
  const options = {
    hostname: 'localhost',
    port: 4091,
    path: path,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let responseData = '';
    res.on('data', (chunk) => { responseData += chunk; });
    res.on('end', () => {
      console.log(`[${path}] Status: ${res.statusCode} Response: ${responseData}`);
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

console.log('🚀 Invocando Funcionalidades em Tempo Real...');

// 1. Ativar uma skill via Obsidian (com flash)
setTimeout(() => {
  console.log('\n--- Testando Flash Obsidian ---');
  sendRequest('/api/activate', 'POST', { skill: 'obsidian-bridge', isObsidian: true });
}, 1000);

// 2. Enviar Logs reais (partículas de bits)
setTimeout(() => {
  console.log('\n--- Testando Partículas de Log ---');
  sendRequest('/api/log', 'POST', { skill: 'javascript-pro', message: 'Iniciando compilação...', level: 'info' });
}, 2000);

setTimeout(() => {
  sendRequest('/api/log', 'POST', { skill: 'nodejs-backend-patterns', message: 'Erro na conexão de rede', level: 'error' });
}, 2500);

setTimeout(() => {
  sendRequest('/api/log', 'POST', { skill: 'clean-code', message: 'Linting completo', level: 'warn' });
}, 3000);

console.log('\n✅ Script de teste finalizado. Verifique a aplicação web!');
