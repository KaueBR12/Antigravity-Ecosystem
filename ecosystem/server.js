const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const PORT = 4091;
const SKILLS_DIR = 'c:/Users/kaueb/SYNC/.agent/skills';
const WORKFLOWS_DIR = 'c:/Users/kaueb/SYNC/.agent/workflows';
const OBSIDIAN_SKILLS_DIR = 'c:/Users/kaueb/SYNC/03 - Recursos/Antigravity Skills';
const LIVE_DOC_PATH = 'c:/Users/kaueb/SYNC/00 - Dashboards/Antigravity Live Feed.md';


const CATEGORY_CONFIG = [
  { name: '01 - IA & Agentes', color: '#00e5ff', keywords: ['ai-', 'llm-', 'rag-', 'agent', 'gemini', 'openai', 'crewai', 'langgraph', 'autonomous', 'hugging-face', 'machine-learning', 'transcriber', 'whisper', 'vision', 'ml-', 'claude', 'gpt-', 'prompt', 'training', 'inference', 'videodb', 'fal-', 'stability', 'langchain', 'scikit', 'nlp', 'copilot', 'imagen', 'pipecat', 'notebooklm', 'embedding', 'andruia-', 'agentfolio', 'context7', 'deep-research', 'evaluation', 'langfuse', 'loki-mode', 'memory-systems', 'multi-advisor', 'parallel-agents', 'superpowers', 'task-intelligence', 'voice-agents', 'yes-md', 'chatbot', 'generative', 'qiskit', 'scanpy', 'seaborn', 'statsmodels', 'sympy', 'matplotlib', 'neural', 'deep-learning', 'data-scientist', 'yann-lecun', 'andrej-karpathy', 'sam-altman', 'steve-jobs', 'warren-buffett', 'elon-musk', 'bill-gates'] },
  { name: '02 - Frontend & UI', color: '#ff4081', keywords: ['react', 'nextjs', 'angular', 'vue', 'tailwind', 'shadcn', 'ui-', 'frontend', 'css', 'html', 'animejs', 'animation', 'threejs', 'design', 'ux-', 'figma', 'avalonia', 'makepad', 'robius', 'hig-', 'canvas', 'spline', 'remotion', 'stitch', 'favicon', 'magic-ui', 'scroll-', 'iconsax', 'radix', 'vizcom', 'zustand', 'javascript', 'typescript', 'component', 'webflow', 'wordpress', 'shopify', 'seo', 'marketing', 'copywriting', 'game', 'unity', 'unreal', 'godot', 'minecraft', 'bevy', 'chrome-extension', 'electron'] },
  { name: '03 - Backend & APIs', color: '#00e676', keywords: ['nodejs', 'express', 'fastapi', 'rest-', 'graphql', 'backend', 'trpc', 'api-', 'dotnet', 'nestjs', 'laravel', 'django', 'flask', 'grpc', 'webhook', 'inngest', 'temporal', 'bullmq', 'cqrs', 'event-sourc', 'saga-', 'drizzle', 'prisma', 'convex', 'supabase', 'clerk', 'dbos', 'golang', 'scala', 'elixir', 'haskell', 'julia', 'socket', 'websocket', 'server', 'middleware', 'automation', 'integration', 'zapier', 'n8n', 'stripe', 'paypal', 'payment', 'twilio', 'ruby', 'rails', 'rust-', 'php-', 'java-', 'python-', 'oauth', 'hubspot', 'salesforce', 'whatsapp', 'telegram', 'discord', 'slack', 'business', 'runtimes'] },
  { name: '04 - Mobile', color: '#ff9100', keywords: ['android', 'ios-', 'flutter', 'react-native', 'expo', 'mobile', 'swiftui', 'jetpack', 'kotlin-coroutines', 'app-store', 'appdeploy'] },
  { name: '05 - DevOps & Cloud', color: '#448aff', keywords: ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'cicd', 'deployment', 'serverless', 'linux', 'bash', 'shell', 'powershell', 'devops', 'infra', 'cloudflare', 'render', 'cloud', 'helm', 'istio', 'linkerd', 'k8s', 'cloudformation', 'gitops', 'grafana', 'network', 'observability', 'prometheus', 'slo-', 'turborepo', 'vercel', 'datadog', 'sentry', 'ansible', 'pipeline'] },
  { name: '06 - Banco de Dados', color: '#ffd740', keywords: ['database', 'sql', 'postgres', 'mongodb', 'nosql', 'bigquery', 'data-', 'redis', 'elasticsearch', 'clickhouse', 'alloydb', 'neon', 'dbt', 'migration', 'schema', 'vector', 'algolia', 'upstash', 'mysql', 'sqlite', 'cassandra', 'dynamodb', 'firebase', 'query', 'storage', 'cache', 'orm', 'warehouse'] },
  { name: '07 - Segurança', color: '#ff1744', keywords: ['security', 'pentest', 'audit', 'vulnerability', 'xss', 'injection', 'hacking', 'scanner', 'metasploit', 'fuzzing', 'burp', 'semgrep', 'threat', 'owasp', 'encryption', 'red-team', 'forensics', 'malware', 'reverse-eng', 'shodan', 'wireshark', 'privilege', 'attack', 'exploit', 'zeroize', 'secrets', 'gdpr', 'pci', 'compliance', 'sast', 'ffuf', 'blockchain', 'web3', 'solidity', 'cyber', 'firewall', 'waf'] },
  { name: '08 - Qualidade & Testes', color: '#64ffda', keywords: ['testing', 'qa-', 'tdd', 'unit-', 'e2e', 'test', 'playwright', 'puppeteer', 'selenium', 'cypress', 'jest', 'lint', 'coverage', 'mock'] },
  { name: '09 - Arquitetura & Gestão', color: '#b2ff59', keywords: ['clean-code', 'ddd', 'solid', 'architect', 'conductor', 'workflow', 'project', 'patterns', 'refactoring', 'debug', 'mcp', 'git', 'monorepo', 'microservices', 'c4', 'code-review', 'context', 'documentation', 'changelog', 'commit', 'pr-', 'issues', 'plan-', 'writing', 'skill', 'diary', 'build', 'spec', 'tool', 'verification', 'brainstorm', 'kaizen', 'postmortem', 'wiki', 'startup', 'github', 'gitlab', 'cc-skill', 'domain-driven', 'environment-setup', 'legacy-modernizer', 'software-architecture', 'varlock', 'engineering'] },
  { name: '10 - Outros', color: '#78909c', keywords: ['miscellaneous', 'general'] }
];

// Cache de skills para ativação persistente (trabalhando)
const STATE_FILE = path.join(__dirname, 'state.json');
let lockedSkills = new Map(); // name -> metadata { isObsidian, timestamp }

function loadState() {
  if (fs.existsSync(STATE_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
      lockedSkills = new Map(data);
      console.log(`💾 State loaded: ${lockedSkills.size} locked skills restored.`);
    } catch (e) {
      console.error('Error loading state:', e);
    }
  }
}

function saveState() {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(Array.from(lockedSkills.entries()), null, 2));
  } catch (e) {
    console.error('Error saving state:', e);
  }
}

loadState();

function classifySkill(skillName) {
  const name = skillName.toLowerCase();
  for (let i = 0; i < CATEGORY_CONFIG.length; i++) {
    const cat = CATEGORY_CONFIG[i];
    if (cat.keywords.length > 0 && cat.keywords.some(k => name.includes(k))) {
      return i;
    }
  }
  return 9;
}

function loadSkillsData() {
  const allSkills = [];

  // 1. Load Local Skills
  if (fs.existsSync(SKILLS_DIR)) {
    const dirs = fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    for (const dir of dirs) {
      const skillFile = path.join(SKILLS_DIR, dir, 'SKILL.md');
      if (!fs.existsSync(skillFile)) continue;

      let description = '';
      try {
        const content = fs.readFileSync(skillFile, 'utf8').substring(0, 500);
        const descMatch = content.match(/description:\s*(.+)/i);
        if (descMatch) description = descMatch[1].trim();
      } catch (_e) { /* skip */ }

      const groupIndex = classifySkill(dir);
      allSkills.push({
        name: dir,
        category: CATEGORY_CONFIG[groupIndex].name,
        groupIndex,
        isObsidian: false,
        description: description || dir.replace(/-/g, ' ')
      });
    }
  }

  // 2. Load Obsidian Skills (Recursive)
  function findObsidianSkills(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        findObsidianSkills(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.includes('Index')) {
        const skillName = entry.name.replace('.md', '');
        // Evitar duplicatas se já carregou da local (projeto é prioritário)
        if (allSkills.some(s => s.name === skillName)) continue;

        let description = '';
        try {
          // Tenta pegar descrição simplificada do frontmatter se existir
          const content = fs.readFileSync(fullPath, 'utf8').substring(0, 300);
          const descMatch = content.match(/description:\s*(.+)/i);
          if (descMatch) description = descMatch[1].trim();
        } catch (_e) { /* skip */ }

        const groupIndex = classifySkill(skillName + ' ' + path.basename(dir));
        allSkills.push({
          name: skillName,
          category: CATEGORY_CONFIG[groupIndex].name,
          groupIndex,
          isObsidian: true,
          description: description || skillName.replace(/-/g, ' ')
        });
      }
    }
  }
  findObsidianSkills(OBSIDIAN_SKILLS_DIR);

  return {
    categories: CATEGORY_CONFIG.map((c, i) => ({
      name: c.name,
      color: c.color,
      count: allSkills.filter(s => s.groupIndex === i).length
    })),
    skills: allSkills,
    totalCount: allSkills.length
  };
}

// --- Express + WebSocket ---
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const skillsData = loadSkillsData();
console.log(`📦 Loaded ${skillsData.totalCount} skills across ${skillsData.categories.length} categories`);

app.get('/api/skills', (_req, res) => {
  res.json({
    ...skillsData,
    lockedSkills: Array.from(lockedSkills.entries()).map(([name, meta]) => ({ name, ...meta }))
  });
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === 1) client.send(msg);
  });
}

wss.on('connection', (ws) => {
  console.log('🔌 Client connected');
  ws.send(JSON.stringify({ 
    type: 'connected', 
    totalSkills: skillsData.totalCount,
    lockedSkills: Array.from(lockedSkills.entries()).map(([name, meta]) => ({ name, ...meta }))
  }));
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === 'log') {
        broadcast({
          type: 'log-particle',
          skill: data.skill || 'system',
          message: data.message,
          level: data.level || 'info',
          timestamp: Date.now()
        });
      }
    } catch (e) {
      console.error('Error parsing WS message:', e);
    }
  });

  ws.on('close', () => console.log('🔌 Client disconnected'));
});

// --- File Watcher (detect skill/workflow/obsidian reads) ---
const recentActivations = new Set();
const watcher = chokidar.watch([
  path.join(SKILLS_DIR, '*/SKILL.md'),
  path.join(WORKFLOWS_DIR, '*.md'),
  path.join(OBSIDIAN_SKILLS_DIR, '**/*.md')
], {
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: false
});

watcher.on('all', (event, filePath) => {
  let skillName = '';
  if (filePath.includes('.agent\\skills')) {
    skillName = path.basename(path.dirname(filePath));
  } else if (filePath.includes('.agent\\workflows')) {
    skillName = path.basename(filePath, '.md');
  } else if (filePath.includes('Antigravity Skills')) {
    skillName = path.basename(filePath, '.md');
  }
  
  if (!skillName || recentActivations.has(skillName)) return;
  recentActivations.add(skillName);
  setTimeout(() => recentActivations.delete(skillName), 5000);

  const groupIndex = classifySkill(skillName);
  console.log(`⚡ Skill activated: ${skillName}`);
  
  // Set as working automatically when read
  lockedSkills.set(skillName, { timestamp: Date.now(), isObsidian: skillName.includes('obsidian') });
  saveState();
  
  broadcast({
    type: 'skill-activated',
    skill: skillName,
    category: CATEGORY_CONFIG[groupIndex].name,
    groupIndex,
    status: 'working',
    isObsidian: skillName.includes('obsidian'),
    timestamp: Date.now()
  });
});

// --- Manual Activation & Status API ---
app.post('/api/activate', (req, res) => {
  const { skill, isObsidian, status } = req.body;
  if (!skill) return res.status(400).json({ error: 'Skill name required' });

  const skillInfo = skillsData.skills.find(s => s.name === skill || s.name.toLowerCase() === skill.toLowerCase());
  
  if (skillInfo) {
    const sStatus = status || 'working';
    if (sStatus === 'working') {
      lockedSkills.set(skillInfo.name, { isObsidian: !!isObsidian, timestamp: Date.now() });
    } else {
      lockedSkills.delete(skillInfo.name);
    }
    saveState();

    console.log(`🚀 Skill status update: ${skillInfo.name} -> ${sStatus} ${isObsidian ? '[OBSIDIAN]' : ''}`);
    broadcast({
      type: 'skill-activated',
      skill: skillInfo.name,
      category: skillInfo.category,
      groupIndex: skillInfo.groupIndex,
      isObsidian: !!isObsidian,
      status: sStatus,
      timestamp: Date.now()
    });
    return res.json({ status: 'updated', skill: skillInfo.name, state: sStatus });
  }

  res.status(404).json({ error: 'Skill not found' });
});

function logToObsidian(skill, message, level) {
  try {
    const dir = path.dirname(LIVE_DOC_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const timestamp = new Date().toLocaleString();
    const icon = level === 'error' ? '🔴' : (level === 'warn' ? '🟡' : '🔵');
    const logLine = `| ${timestamp} | ${icon} ${level.toUpperCase()} | **${skill}** | ${message} |\n`;

    if (!fs.existsSync(LIVE_DOC_PATH)) {
      const header = `# 🌌 Antigravity Live Feed\n\n| Timestamp | Level | Skill | Message |\n| --- | --- | --- | --- |\n`;
      fs.writeFileSync(LIVE_DOC_PATH, header);
    }

    fs.appendFileSync(LIVE_DOC_PATH, logLine);
  } catch (e) {
    console.error('Error logging to Obsidian:', e);
  }
}

// Endpoint para Logs Reais
app.post('/api/log', (req, res) => {
  const { skill, message, level, persist } = req.body;
  const sLevel = level || 'info';
  const sSkill = skill || 'system';
  const sMessage = message || 'No message';

  broadcast({
    type: 'log-particle',
    skill: sSkill,
    message: sMessage,
    level: sLevel,
    timestamp: Date.now()
  });

  // Persiste no Obsidian se solicitado ou se for nível técnico importante
  if (persist || sLevel === 'error' || sLevel === 'warn') {
    logToObsidian(sSkill, sMessage, sLevel);
  }

  res.json({ status: 'processed' });
});

// Endpoint para Sinais de Busca do Chat
app.post('/api/signal', (req, res) => {
  const { type, query, skill, skills } = req.body;
  
  if (type === 'search') {
    // Broadcast search ripple
    broadcast({
      type: 'search-pulse',
      query: query || 'Universal Search',
      timestamp: Date.now()
    });

    // Also highlight skills that match the query keywords
    if (query) {
      const q = query.toLowerCase();
      const matches = skillsData.skills.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.category.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q))
      );

      matches.forEach(s => {
        broadcast({
          type: 'skill-activated',
          skill: s.name,
          category: s.category,
          groupIndex: s.groupIndex,
          status: 'working',
          isObsidian: s.isObsidian,
          timestamp: Date.now(),
          message: `Matched search: ${query}`
        });
      });
    }
    return res.json({ status: 'search-signal-sent' });
  }

  if (type === 'activate' && skill) {
    const skillName = skill.toLowerCase();
    const skillInfo = skillsData.skills.find(s => s.name.toLowerCase() === skillName || s.name.toLowerCase().includes(skillName));
    if (skillInfo) {
      broadcast({
        type: 'skill-activated',
        skill: skillInfo.name,
        category: skillInfo.category,
        groupIndex: skillInfo.groupIndex,
        status: 'working',
        isObsidian: skillInfo.isObsidian,
        timestamp: Date.now()
      });
      return res.json({ status: 'activated', skill: skillInfo.name });
    }
  }

  if (type === 'highlight-skills' && skills) {
    skills.forEach(sName => {
      const s = skillsData.skills.find(sk => sk.name.toLowerCase() === sName.toLowerCase());
      if (s) {
        broadcast({
          type: 'skill-activated',
          skill: s.name,
          category: s.category,
          groupIndex: s.groupIndex,
          status: 'working',
          isObsidian: s.isObsidian,
          timestamp: Date.now()
        });
      }
    });
    return res.json({ status: 'skills-highlighted' });
  }

  res.json({ status: 'signal-processed' });
});

server.listen(PORT, () => {
  console.log(`\n🌌 Antigravity Ecosystem running at http://localhost:${PORT}\n`);
});
