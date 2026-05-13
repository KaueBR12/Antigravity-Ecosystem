const http = require('http');

const args = process.argv.slice(2);
const skill = args[0];
const status = args[1] || 'working'; // 'working' ou 'done'
const isObsidian = args.includes('--obsidian');

if (!skill) {
  console.error('Uso: node manage-skill.js <nome-da-skill> [working|done] [--obsidian]');
  process.exit(1);
}

const data = JSON.stringify({
  skill: skill,
  status: status,
  isObsidian: isObsidian
});

const options = {
  hostname: 'localhost',
  port: 4091,
  path: '/api/activate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log(`✅ Skill ${skill} atualizada para: ${status} ${isObsidian ? '[OBSIDIAN]' : ''}`);
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.error('❌ Erro ao conectar ao Ecossistema:', error.message);
  process.exit(1);
});

req.write(data);
req.end();
