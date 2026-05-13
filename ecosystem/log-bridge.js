const http = require('http');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

const skill = process.argv[2] || 'system';
const level = process.argv[3] || 'info';

console.log(`📡 Log Bridge ativo para a skill: [${skill}]`);

rl.on('line', (line) => {
  if (!line.trim()) return;
  
  // Imprime localmente para referência
  console.log(`[STREAMING] ${line}`);

  const postData = JSON.stringify({
    skill: skill,
    message: line,
    level: level
  });

  const options = {
    hostname: 'localhost',
    port: 4091,
    path: '/api/log',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options);
  req.on('error', (e) => {
    // Falha silenciosa para não quebrar o pipe original
  });
  req.write(postData);
  req.end();
});
