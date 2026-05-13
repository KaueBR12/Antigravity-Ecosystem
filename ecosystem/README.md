# 🌌 Antigravity Ecosystem: Technical Specifications

> **Scope**: Internal System Engine | **Architecture**: Reactive Mesh | **Style**: Hyper-Brutalist

Este documento detalha o funcionamento técnico do servidor e do dashboard do ecossistema Antigravity. Para uma visão geral do projeto, consulte o [README principal](../README.md).

---

## ⚙️ Core Engine: `server.js`

O servidor atua como o ponto de convergência de toda a telemetria do sistema.

### 1. File System Watching (Chokidar)
O motor utiliza o `chokidar` para monitorar alterações em:
- `../.agent/skills/*/SKILL.md`
- `../.agent/workflows/*.md`

Ao detectar uma leitura ou escrita, o servidor mapeia o nome da pasta para uma categoria e envia um sinal de ativação via WebSocket para o frontend.

### 2. Neural Categories Mapping
Os nós no dashboard são coloridos e agrupados dinamicamente com base nas seguintes categorias definidas no backend:
- **Index 1**: IA & Agentes (Ciano)
- **Index 2**: Frontend & UI (Rosa)
- **Index 3**: Backend & APIs (Verde Ácido)
- **Index 4**: Mobile & Apps (Amarelo)
- **Index 9**: Arquitetura & Gestão (Lima)

### 3. Log Stream Bridge
O endpoint `/api/log` permite que scripts Python ou Bash enviem mensagens diretamente para o HUD visual. Isso é essencial para monitorar processos de longa duração sem olhar para o terminal.

---

## 🎨 Visual Interface: Neural Mesh

O frontend foi construído para ser visualmente denso e informativo.

### Renderização via Canvas
Para manter a performance estável, não utilizamos elementos DOM para os nós da rede neural. Toda a renderização de linhas de conexão e partículas é feita via **HTML5 Canvas**, garantindo que o sistema não trave mesmo com centenas de pulsos simultâneos.

### Estética Brutalista
- **Zero Filters**: Não utilizamos `blur`, `backdrop-filter` ou `opacity` em excesso.
- **Sharp Shadows**: Sombras sólidas (`4px 4px 0px #000`) em vez de gradientes suaves.
- **Grids**: O background possui um grid técnico fixo para orientação visual.

---

## 🛠️ Desenvolvimento & Debugging

### Adicionando Novas Skills
Para que uma nova skill apareça no dashboard, basta criar uma pasta em `.agent/skills/` com um arquivo `SKILL.md`. O sistema detectará automaticamente o novo nó na próxima ativação.

### Simulação de Telemetria
Você pode usar o script `test-skill.js` para simular tráfego e testar a estabilidade visual do dashboard.

---

## 📟 Endpoints de Controle

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/activate` | Ativa um nó de skill específico |
| `POST` | `/api/log` | Envia mensagem para o Log HUD |
| `GET` | `/api/state` | Retorna o estado atual da malha neural |

---

> *Technical Document v1.2 - Antigravity Ecosystem Team*
