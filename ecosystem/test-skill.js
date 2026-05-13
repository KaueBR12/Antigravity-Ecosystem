const fs = require('fs');
const path = require('path');

const SKILLS_DIR = 'c:/Users/kaueb/SYNC/.agent/skills';

// Pega o nome da skill dos argumentos, ou usa uma de exemplo
const skillName = process.argv[2] || 'clean-code';

const skillPath = path.join(SKILLS_DIR, skillName, 'SKILL.md');

if (!fs.existsSync(skillPath)) {
  console.error(`❌ Erro: Skill '${skillName}' não encontrada em ${skillPath}`);
  console.log('Uso: node test-skill.js <nome-da-skill>');
  process.exit(1);
}

try {
  // "Toca" no arquivo atualizando o tempo de modificação (como o comando touch no linux)
  const now = new Date();
  fs.utimesSync(skillPath, now, now);
  console.log(`✅ Sucesso! O arquivo SKILL.md da skill '${skillName}' foi tocado.`);
  console.log(`📡 O chokidar no server.js deve ter detectado e acendido a skill no visualizador!`);
} catch (err) {
  console.error(`❌ Erro ao tentar tocar no arquivo:`, err.message);
}
