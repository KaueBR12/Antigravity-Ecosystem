/* eslint-env browser */
/* global d3 */
(function () {
  'use strict';

  // ── Config ─────────────────────────────────────────────
  const DORMANT_ALPHA = 0.08;
  const ACTIVE_PEAK_MS = 2500;
  const FADE_MS = 3000;
  const SIGNAL_SPEED_MS = 600;

  // ── State ──────────────────────────────────────────────
  let nodes = [];
  let hubNodes = [];
  let skillNodes = [];
  let coreNode = null;
  let links = [];
  let hubLinks = [];
  const nodesMap = new Map();
  const linksMap = new Map(); // targetId -> link
  let activationCount = 0;
  let hoveredNode = null;
  let ws = null;
  let currentTransform = d3.zoomIdentity;
  let skillsData = null;
  let particles = [];
  let bursts = []; // Array of {x, y, color, particles: [], shockwave: 0}
  let packets = []; // Array of {t, link, color, type}
  let baseRotation = 0;
  let lastFrameTime = performance.now();
  let isHovering = false;
  let activeCategory = null;
  let transitionAlpha = 0; // 0 to 1 for smooth layout transition
  let searchRipples = []; // Array of {x, y, radius, alpha, query}

  // Caches for performance
  const colorCache = new Map();
  const MAX_BURSTS = 10;
  const MAX_PACKETS = 15;
  const VIEWPORT_MARGIN = 100; // Pixels outside viewport to still render

  // Active animations: Map<skillId, { start, phase, signalProgress }>
  const activeAnims = new Map();
  // Obsidian activity pulses: Map<skillId, { intensity, lastPulse }>
  const pulsingAnims = new Map();
  // Skills currently in use (Active Lock) - Map<skillId, { isObsidian }>
  const lockedSkills = new Map();

  const canvas = document.getElementById('graph-canvas');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  function resizeCanvas() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // ── Load & Init ────────────────────────────────────────
  fetch('/api/skills').then(r => r.json()).then(data => {
    skillsData = data;
    document.querySelector('#stat-total .stat-value').textContent = data.totalCount;
    
    if (data.lockedSkills) {
      data.lockedSkills.forEach(s => {
        lockedSkills.set(s.name, { isObsidian: s.isObsidian });
      });
    }

    initParticles();
    buildNeuralLayout(data);
    buildLegend(data.categories);
    initSearch(data.skills);
    initZoom();
    initMouse();
    connectWebSocket();
    render();
  });

  function initParticles() {
    // Ambient background particles removed to reduce visual clutter
    particles = [];
  }

  // ── Neural Network Layout ─────────────────────────────
  function buildNeuralLayout(data) {
    nodesMap.clear();
    linksMap.clear();
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h);
    const hubRing = scale * 0.16;
    const skillRingBase = scale * 0.28;
    const skillRingStep = 15;
    const sectorAngle = (Math.PI * 2) / data.categories.length;

    // Core node (Antigravity brain)
    coreNode = {
      id: '__core__', type: 'core', label: 'Antigravity',
      x: cx, y: cy, targetX: cx, targetY: cy, radius: 12, color: '#00e5ff', brightness: 0.6
    };

    // Hub nodes (inner ring)
    hubNodes = data.categories.map((cat, i) => {
      const angle = i * sectorAngle - Math.PI / 2;
      return {
        id: '__hub__' + cat.name, type: 'hub',
        label: cat.name.replace(/^\d+\s-\s/, ''),
        group: i, color: cat.color, count: cat.count,
        x: cx + Math.cos(angle) * hubRing,
        y: cy + Math.sin(angle) * hubRing,
        targetX: cx + Math.cos(angle) * hubRing,
        targetY: cy + Math.sin(angle) * hubRing,
        radius: 6, brightness: 0.25, baseAngle: angle,
        dist: hubRing
      };
    });

    // Hub-to-core links (with curve control points)
    hubLinks = hubNodes.map(h => {
      // Offset control point to make a sweeping arc
      const cpX = cx + Math.cos(h.baseAngle + 0.5) * (hubRing * 0.5);
      const cpY = cy + Math.sin(h.baseAngle + 0.5) * (hubRing * 0.5);
      return { source: coreNode, target: h, cpX, cpY };
    });

    // Skill nodes (radial dendrites from each hub)
    const groupBuckets = {};
    data.skills.forEach(s => {
      if (!groupBuckets[s.groupIndex]) groupBuckets[s.groupIndex] = [];
      groupBuckets[s.groupIndex].push(s);
    });

    skillNodes = [];
    links = [];
    const skillsPerRing = 20;

    for (const [gi, bucket] of Object.entries(groupBuckets)) {
      const hub = hubNodes[parseInt(gi)];
      const baseAngle = hub.baseAngle;

      bucket.forEach((skill, idx) => {
        const ring = Math.floor(idx / skillsPerRing);
        const posInRing = idx % skillsPerRing;
        const totalInRing = Math.min(skillsPerRing, bucket.length - ring * skillsPerRing);

        // Stagger angles and distance slightly for organic feel
        const spread = Math.min(sectorAngle * 0.9, totalInRing * 0.035);
        const organicWobble = (Math.random() - 0.5) * 0.05;
        const angle = baseAngle - spread / 2 + (posInRing / Math.max(1, totalInRing - 1)) * spread + organicWobble;
        const dist = skillRingBase + ring * skillRingStep + (Math.random() * 8);

        const node = {
          id: skill.name, type: 'skill', label: skill.name,
          group: parseInt(gi), color: hub.color,
          category: skill.category, description: skill.description,
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          targetX: cx + Math.cos(angle) * dist,
          targetY: cy + Math.sin(angle) * dist,
          baseAngle: angle, dist: dist,
          radius: 1.5 + Math.random() * 1.5, brightness: DORMANT_ALPHA
        };
        skillNodes.push(node);

        // Organic curve control point
        const cpAngle = baseAngle + (angle - baseAngle) * 1.5;
        const cpDist = hubRing + (dist - hubRing) * 0.5;
        const cpX = cx + Math.cos(cpAngle) * cpDist;
        const cpY = cy + Math.sin(cpAngle) * cpDist;

        const link = { source: hub, target: node, cpX, cpY };
        links.push(link);
        linksMap.set(node.id, link);
      });
    }

    nodes = [coreNode, ...hubNodes, ...skillNodes];
    nodes.forEach(n => nodesMap.set(n.id, n));
  }

  // Helper to get bezier point
  function getBezierXY(t, sx, sy, cp1x, cp1y, ex, ey) {
    return {
      x: (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cp1x + t * t * ex,
      y: (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cp1y + t * t * ey
    };
  }

  // ── Rendering ──────────────────────────────────────────
  function render() {
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h);
    const now = performance.now();

    // Global slow rotation (normalized by deltaTime)
    const dt = now - lastFrameTime;
    lastFrameTime = now;
    const dtFactor = dt / 16.666; // Normalized to 60fps
    
    if (!isHovering) {
      baseRotation += dtFactor * 0.0008; // Adjusted speed for dt
    }
    const rotation = baseRotation;

    // Update animations
    updateAnimations(now, dtFactor);

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Clear with semi-transparent fill for subtle trails
    ctx.fillStyle = 'rgba(3, 5, 8, 0.4)';
    ctx.fillRect(0, 0, w, h);

    // Calculate viewport bounds in world space for culling
    const invK = 1 / currentTransform.k;
    const vX0 = (-currentTransform.x - VIEWPORT_MARGIN) * invK;
    const vY0 = (-currentTransform.y - VIEWPORT_MARGIN) * invK;
    const vX1 = (w - currentTransform.x + VIEWPORT_MARGIN) * invK;
    const vY1 = (h - currentTransform.y + VIEWPORT_MARGIN) * invK;

    const inViewport = (x, y, r = 0) => {
      // Basic rectangle check
      return x + r > vX0 && x - r < vX1 && y + r > vY0 && y - r < vY1;
    };

    // Draw Background Grid
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.03)';
    ctx.lineWidth = 1;
    const gridSize = 100;
    const offsetX = (currentTransform.x % gridSize);
    const offsetY = (currentTransform.y % gridSize);

    ctx.beginPath();
    for (let x = offsetX; x < w; x += gridSize) {
      ctx.moveTo(x, 0); ctx.lineTo(x, h);
    }
    for (let y = offsetY; y < h; y += gridSize) {
      ctx.moveTo(0, y); ctx.lineTo(w, y);
    }
    ctx.stroke();

    // Localized Grid Glow around active Hubs
    hubNodes.forEach(n => {
      if (n.brightness > 0.3) {
        const hubGlow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 200);
        hubGlow.addColorStop(0, hexA(n.color, 0.05));
        hubGlow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = hubGlow;
        ctx.fillRect(n.x - 200, n.y - 200, 400, 400);
      }
    });

    // Ambient particles rendering removed
    ctx.globalAlpha = 1.0;

    // Vignette Effect (Screen Space)
    const vignette = ctx.createRadialGradient(cx, cy, scale * 0.2, cx, cy, scale * 0.8);
    vignette.addColorStop(0, 'rgba(5, 7, 10, 0)');
    vignette.addColorStop(1, 'rgba(5, 7, 10, 0.6)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);

    // Apply Zoom & Pan
    ctx.translate(currentTransform.x, currentTransform.y);
    ctx.scale(currentTransform.k, currentTransform.k);

    // Smooth position interpolation for nodes
    const lerpFactor = 0.08;
    const allNodes = [coreNode, ...hubNodes, ...skillNodes];
    allNodes.forEach(n => {
      if (n.targetX !== undefined) {
        n.x += (n.targetX - n.x) * lerpFactor;
        n.y += (n.targetY - n.y) * lerpFactor;
      }
    });

    // Apply Rotation around Core or active Hub
    const pivot = (activeCategory && hubNodes.find(h => h.id === '__hub__' + activeCategory)) || coreNode;
    ctx.translate(pivot.x, pivot.y);
    ctx.rotate(rotation);
    ctx.translate(-pivot.x, -pivot.y);

    // Update & Draw Bursts (World Space)
    bursts.forEach((b) => {
      // Shockwave
      b.shockwave = (b.shockwave || 0) + 0.05;
      if (b.shockwave < 1) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.shockwave * 60, 0, Math.PI * 2);
        ctx.strokeStyle = hexA(b.color, (1 - b.shockwave) * 0.5);
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      b.particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        p.life -= 0.015;
        if (p.life <= 0) return;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.2 * p.life, 0, Math.PI * 2);
        ctx.fillStyle = hexA(p.color, p.life); ctx.fill();
      });
      b.particles = b.particles.filter(p => p.life > 0);
    });
    bursts = bursts.filter(b => b.particles.length > 0 || b.shockwave < 1);

    // Random ambient packets removed - only functional packets (logs/activations) allowed
    packets.forEach((p, idx) => {
      const node = nodesMap.get(p.skillId);
      if (!node) { packets.splice(idx, 1); return; }

      // SKIP particles that don't belong to the active category filter
      if (activeCategory !== null && node.category !== activeCategory) {
        packets.splice(idx, 1);
        return;
      }

      p.t += p.speed * (dtFactor || 1);
      if (p.t >= 1) {
        createImpactBurst(node.x, node.y, p.type === 'log' ? 
          (p.level === 'error' ? '#ff1744' : (p.level === 'warn' ? '#ffd740' : '#ffffff')) : 
          node.color, p.type === 'log' ? 5 : 3);
        packets.splice(idx, 1); 
        return; 
      }
      const hub = hubNodes[node.group];
      const hubLink = hubLinks[node.group];
      const link = linksMap.get(p.skillId);

      let pt;
      if (p.t < 0.4) {
        pt = getBezierXY(p.t / 0.4, coreNode.x, coreNode.y, hubLink.cpX, hubLink.cpY, hub.x, hub.y);
      } else {
        pt = getBezierXY((p.t - 0.4) / 0.6, hub.x, hub.y, link.cpX, link.cpY, node.x, node.y);
      }

      ctx.save();
      if (p.type === 'log') {
        // Log particles are more intense and "techy"
        ctx.fillStyle = p.level === 'error' ? '#ff1744' : (p.level === 'warn' ? '#ffd740' : '#ffffff');
        ctx.shadowBlur = 4;
        ctx.shadowColor = ctx.fillStyle;
      } else {
        ctx.fillStyle = hexA(node.color, 0.6);
      }
      
      ctx.translate(pt.x, pt.y);
      ctx.rotate(p.t * 10);
      
      if (p.type === 'log') {
        ctx.font = '8px var(--font-mono)';
        ctx.fillText('0', 0, 0); // Binary log bit
      } else {
        ctx.fillRect(-1, -1, 2, 2); // Square "bit"
      }
      ctx.restore();
    });

    // Draw Background Nebulas (Colored soft glows)
    ctx.globalCompositeOperation = 'screen';
    for (const n of hubNodes) {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, scale * 0.2);
      g.addColorStop(0, hexA(n.color, 0.1 * (0.5 + n.brightness)));
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(n.x - scale * 0.25, n.y - scale * 0.25, scale * 0.5, scale * 0.5);
    }

    // Draw core node (Only if no filter is active)
    if (!activeCategory) {
      // Render Search Ripples
      searchRipples = searchRipples.filter(r => r.alpha > 0.01);
      searchRipples.forEach(r => {
        r.radius += 8;
        r.alpha *= 0.96;
        
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = hexA('#00e5ff', r.alpha * 0.5);
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = `italic ${14 + r.radius * 0.05}px "Outfit", sans-serif`;
        ctx.fillStyle = hexA('#00e5ff', r.alpha);
        ctx.textAlign = 'center';
        ctx.fillText(r.query, r.x, r.y - r.radius - 10);
      });

      // Render Neural Lines
      // Core Orbital Rings (Nested & Counter-rotating)
      [0.4, 0.6, 0.8, 1.1].forEach((rFactor, i) => {
        const ringRot = rotation * (i % 2 === 0 ? 4 : -3);
        ctx.strokeStyle = hexA(i % 2 === 0 ? '#00e5ff' : '#448aff', 0.08);
        ctx.setLineDash(i % 2 === 0 ? [] : [10, 5]);
        ctx.beginPath();
        ctx.ellipse(coreNode.x, coreNode.y, scale * 0.12 * rFactor, scale * 0.09 * rFactor, ringRot, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);
    }

    // Draw hub-to-core links
    for (const l of hubLinks) {
      if (activeCategory) continue; // Hubs are center in solar system mode
      if (!inViewport(l.target.x, l.target.y, 50) && !inViewport(l.source.x, l.source.y, 50)) continue;
      
      const brightness = Math.max(l.source.brightness, l.target.brightness) * 0.5;
      const grad = ctx.createLinearGradient(l.source.x, l.source.y, l.target.x, l.target.y);
      grad.addColorStop(0, hexA('#00e5ff', 0.1 + brightness));
      grad.addColorStop(1, hexA(l.target.color, 0.1 + brightness));

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1 + brightness * 2;
      ctx.beginPath();
      ctx.moveTo(l.source.x, l.source.y);
      ctx.quadraticCurveTo(l.cpX, l.cpY, l.target.x, l.target.y);
      ctx.stroke();
    }

    // Draw skill links (synapses / orbital paths)
    for (const l of links) {
      if (activeCategory !== null && l.target.category !== activeCategory) continue;
      if (!inViewport(l.target.x, l.target.y, 20) && !inViewport(l.source.x, l.source.y, 20)) continue;

      const b = activeCategory ? 0.8 : l.target.brightness;
      const alpha = activeCategory ? 0.15 : (0.05 + b * 0.3);

      ctx.strokeStyle = hexA(l.target.color, alpha);
      ctx.lineWidth = activeCategory ? 0.8 : (b > DORMANT_ALPHA + 0.1 ? 1.2 : 0.5);

      ctx.beginPath();
      ctx.moveTo(l.source.x, l.source.y);
      ctx.quadraticCurveTo(l.cpX, l.cpY, l.target.x, l.target.y);
      ctx.stroke();
    }

    // Draw signal pulses on active links (Comet effect)
    for (const [skillId, anim] of activeAnims) {
      const node = nodesMap.get(skillId);
      if (!node) continue;
      if (activeCategory !== null && node.category !== activeCategory) continue;

      const hub = hubNodes[node.group];
      const hubLink = hubLinks[node.group];
      const link = linksMap.get(skillId);
      const t = anim.signalProgress;

      if (t < 1) {
        // Core → Hub signal (Only if no filter)
        if (!activeCategory) {
          const t1 = Math.min(1, t * 2);
          if (t1 < 1) {
            for (let i = 0; i < 12; i++) {
              const tailT = Math.max(0, t1 - i * 0.015);
              const pt = getBezierXY(tailT, coreNode.x, coreNode.y, hubLink.cpX, hubLink.cpY, hub.x, hub.y);
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, 3 - i * 0.2, 0, Math.PI * 2);
              ctx.fillStyle = hexA(node.color, (1.0 - i * 0.08) * 0.8);
              ctx.fill();
              if (i === 0) { // Glow head
                ctx.save();
                ctx.shadowBlur = 15; ctx.shadowColor = node.color;
                ctx.fill(); ctx.restore();
              }
            }
          }
        }

        // Hub → Skill signal
        const t2 = Math.max(0, Math.min(1, (t - 0.4) / 0.6));
        if (t2 > 0 && t2 < 1) {
          for (let i = 0; i < 8; i++) {
            const tailT = Math.max(0, t2 - i * 0.03);
            const pt = getBezierXY(tailT, hub.x, hub.y, link.cpX, link.cpY, node.x, node.y);
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2 - i * 0.2, 0, Math.PI * 2);
            ctx.fillStyle = hexA(node.color, 0.9 - i * 0.1);
            ctx.fill();
          }
        }
      }
    }
    ctx.globalCompositeOperation = 'source-over';

    // Draw skill nodes (Ultra Optimized: Swarm Batching)
    const activeBatch = [];
    const dormantBatch = [];
    
    for (const n of skillNodes) {
      if (activeCategory !== null && n.category !== activeCategory) continue;
      if (!inViewport(n.x, n.y, 30)) continue;
      
      const b = activeCategory ? Math.max(n.brightness, 0.75) : n.brightness;
      if (b < DORMANT_ALPHA + 0.005 && !activeCategory) {
        dormantBatch.push(n);
        continue;
      }
      activeBatch.push({ node: n, b });
    }

    // Pass 1: Dormant Nodes (Tiny static dots)
    ctx.fillStyle = hexA('#ffffff', DORMANT_ALPHA * 0.4);
    for (const n of dormantBatch) {
      ctx.fillRect(n.x - 0.5, n.y - 0.5, 1, 1);
    }

    // Pass 2: Active Nodes (With effects)
    for (const item of activeBatch) {
      const n = item.node;
      const b = item.b;
      const breathe = Math.sin(now / 1000 + n.x) * 0.1 + 1.0;
      const floatingY = Math.sin(now / 2000 + n.x) * 2;

      // Obsidian Pulse Effect
      const pulse = pulsingAnims.get(n.id);
      let pulseGlow = 0;
      if (pulse) {
        pulseGlow = Math.sin(now / 150) * pulse.intensity * 10;
        pulse.intensity *= 0.99; // Slowly fade intensity
        if (pulse.intensity < 0.01) pulsingAnims.delete(n.id);
      }

      // Glow Core (Replaces shadowBlur)
      ctx.beginPath();
      ctx.arc(n.x, n.y + floatingY, n.radius * breathe + (b > 0.5 ? b * 1.5 : 0) + pulseGlow, 0, Math.PI * 2);
      ctx.fillStyle = hexA(n.color, Math.min(1, b + (pulseGlow / 10)));
      ctx.fill();

      if (pulseGlow > 2) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (b > 0.4 || activeCategory) {
        ctx.globalCompositeOperation = 'screen';
        ctx.beginPath();
        ctx.arc(n.x, n.y + floatingY, n.radius + 0.5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }
    }

    // Draw hub nodes
    for (const n of hubNodes) {
      if (activeCategory !== null && n.category !== activeCategory && n.id !== '__hub__' + activeCategory) continue;
      if (!inViewport(n.x, n.y, 100)) continue;
      const b = n.brightness;

      // Outer glow & Pulse if active focus
      const isFocus = activeCategory && n.id === '__hub__' + activeCategory;
      const hubPulse = isFocus ? Math.sin(now / 400) * 0.2 + 1.1 : 1.0;

      const hGlow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 8 * hubPulse);
      hGlow.addColorStop(0, hexA(n.color, (isFocus ? 0.4 : 0.1) + b * 0.2));
      hGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = hGlow;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius * 8 * hubPulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius * hubPulse, 0, Math.PI * 2);
      ctx.strokeStyle = hexA(n.color, 0.4 + b * 0.6);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = hexA(n.color, (isFocus ? 0.6 : 0.2) + b * 0.8);
      ctx.fill();

      // Rotating Data Rings around Hub
      ctx.save();
      ctx.translate(n.x, n.y);
      ctx.rotate(now * 0.001 * (n.group % 2 === 0 ? 1 : -1));
      ctx.setLineDash([5, 15]);
      ctx.strokeStyle = hexA(n.color, 0.2 + b * 0.3);
      ctx.beginPath();
      ctx.arc(0, 0, n.radius + 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      ctx.setLineDash([]);

      ctx.save();
      ctx.translate(n.x, n.y);
      ctx.rotate(-rotation);

      const txt = n.label.toUpperCase();
      ctx.font = '700 9px var(--font-mono)';
      ctx.letterSpacing = '2px';
      const tw = ctx.measureText(txt).width;

      // HUD Label Plate
      ctx.fillStyle = '#05070a';
      ctx.strokeStyle = hexA(n.color, 0.8);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(-tw / 2 - 8, -n.radius - 24, tw + 16, 14, 2);
      ctx.fill();
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff'; // White text for maximum visibility
      ctx.fillText(txt, 0, -n.radius - 14);
      ctx.restore();
    }

    if (!activeCategory) {
      // Core Brain (Only if no filter)
      const heartbeat = Math.sin(now / 500) * 0.1 + 1.0;
      const fastPulse = Math.sin(now / 100) * 0.02 + 1.0;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const coreGlow = ctx.createRadialGradient(coreNode.x, coreNode.y, 0, coreNode.x, coreNode.y, coreNode.radius * 6 * heartbeat);
      coreGlow.addColorStop(0, hexA('#00e5ff', 0.4));
      coreGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(coreNode.x, coreNode.y, coreNode.radius * 6 * heartbeat, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 30 * heartbeat;
      ctx.shadowColor = '#00e5ff';
      ctx.beginPath();
      ctx.arc(coreNode.x, coreNode.y, coreNode.radius * heartbeat * fastPulse, 0, Math.PI * 2);
      ctx.fillStyle = hexA('#00e5ff', 0.8);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(coreNode.x, coreNode.y, coreNode.radius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.translate(coreNode.x, coreNode.y);
      ctx.rotate(-rotation);
      ctx.font = '800 12px Inter';
      ctx.letterSpacing = '3px';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#00e5ff';
      ctx.fillText('CORE', 0, 4);
      ctx.font = '700 8px Inter';
      ctx.fillStyle = hexA('#00e5ff', 0.6);
      ctx.fillText('ANTIGRAVITY', 0, -coreNode.radius - 15);
      ctx.restore();
    }

    // Hovered node label
    if (hoveredNode && hoveredNode.type === 'skill') {
      ctx.save();
      ctx.translate(hoveredNode.x, hoveredNode.y);
      ctx.rotate(-rotation);
      ctx.font = '600 11px Inter';
      ctx.textAlign = 'center';
      const m = ctx.measureText(hoveredNode.label);
      const p = 6;
      ctx.fillStyle = '#0f172a'; // Fundo azul escuro sólido
      ctx.beginPath();
      ctx.roundRect(-m.width / 2 - p, -20 - p, m.width + p * 2, 12 + p * 2, 4);
      ctx.fill();
      ctx.strokeStyle = hexA(hoveredNode.color, 0.6);
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.fillText(hoveredNode.label, 0, -15);
      ctx.restore();
    }

    ctx.restore();
    requestAnimationFrame(render);
  }


  // ── Animation System ───────────────────────────────────
  function createImpactBurst(x, y, color, count = 10) {
    if (bursts.length > MAX_BURSTS) bursts.shift(); // Evict old bursts
    const burstParticles = [];
    const particleCount = Math.min(count, 15); // Strict cap per burst
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 2;
      burstParticles.push({
        x: x, y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0.8 + Math.random() * 0.4,
        color: color
      });
    }
    bursts.push({ x: x, y: y, color: color, particles: burstParticles, shockwave: 0 });
  }

  function updateAnimations(now, dtFactor) {
    for (const [skillId, anim] of activeAnims) {
      const elapsed = now - anim.start;
      const node = nodesMap.get(skillId);
      if (!node) { activeAnims.delete(skillId); continue; }

      const hub = hubNodes[node.group];
      const lockMeta = lockedSkills.get(skillId);

      anim.signalProgress = Math.min(1, elapsed / SIGNAL_SPEED_MS);

      if (elapsed < SIGNAL_SPEED_MS) {
        node.brightness = DORMANT_ALPHA + (elapsed / SIGNAL_SPEED_MS) * 0.3;
        hub.brightness = 0.25 + (elapsed / SIGNAL_SPEED_MS) * 0.5;
      } else if (lockMeta || elapsed < SIGNAL_SPEED_MS + ACTIVE_PEAK_MS) {
        // Stay bright if locked or in peak phase
        node.brightness = 1;
        hub.brightness = 0.6;
        
        // Continuous pulse for locked Obsidian skills
        if (lockMeta && lockMeta.isObsidian) {
          if (!pulsingAnims.has(skillId)) {
             pulsingAnims.set(skillId, { intensity: 1.0, lastPulse: now });
          } else {
             pulsingAnims.get(skillId).intensity = Math.max(0.5, pulsingAnims.get(skillId).intensity);
          }
        }
      } else if (elapsed < SIGNAL_SPEED_MS + ACTIVE_PEAK_MS + FADE_MS) {
        const fadeProgress = (elapsed - SIGNAL_SPEED_MS - ACTIVE_PEAK_MS) / FADE_MS;
        const ease = fadeProgress * fadeProgress;
        node.brightness = 1 - ease * (1 - DORMANT_ALPHA);
        hub.brightness = 0.6 - ease * 0.35;
      } else {
        node.brightness = DORMANT_ALPHA;
        hub.brightness = 0.25;
        activeAnims.delete(skillId);
      }
    }
  }

  function activateSkill(skillName, options = {}) {
    const node = nodesMap.get(skillName);
    if (!node) return;

    if (options.status === 'working') {
      lockedSkills.set(skillName, { isObsidian: !!options.isObsidian });
    } else if (options.status === 'done') {
      lockedSkills.delete(skillName);
      // Restart the fade sequence by resetting the animation timer
      if (activeAnims.has(skillName)) {
        activeAnims.get(skillName).start = performance.now() - (SIGNAL_SPEED_MS + ACTIVE_PEAK_MS);
      }
    }

    if (!activeAnims.has(skillName)) {
      activeAnims.set(skillName, {
        start: performance.now(),
        signalProgress: 0
      });
    }

    if (options.isObsidian) {
      pulsingAnims.set(skillName, { intensity: 1.0, lastPulse: performance.now() });
    }

    activationCount++;
    document.querySelector('#stat-activations .stat-value').textContent = activationCount;

    const overlay = document.getElementById('active-overlay');
    overlay.classList.remove('hidden');
    document.getElementById('active-skill-name').textContent = skillName;
    const catLabel = document.getElementById('active-skill-category');
    catLabel.textContent = node.category || '';
    catLabel.style.color = node.color;
    overlay.querySelector('.active-dot').style.background = node.color;
    overlay.querySelector('.active-dot').style.boxShadow = '0 0 12px ' + node.color;

    addLogEntry(skillName, node.color, node.category, options.message || '');

    // Create Burst
    createImpactBurst(node.x, node.y, node.color, 25);

    setTimeout(() => {
      if (!activeAnims.has(skillName)) overlay.classList.add('hidden');
    }, SIGNAL_SPEED_MS + ACTIVE_PEAK_MS + FADE_MS + 200);
  }

  // ── Interactions ───────────────────────────────────────
  function initZoom() {
    const zoom = d3.zoom()
      .scaleExtent([0.2, 8])
      .on('zoom', e => { currentTransform = e.transform; });
    d3.select(canvas).call(zoom);
  }

  function initMouse() {
    canvas.addEventListener('mousemove', e => {
      const rotation = baseRotation;
      const pivot = (activeCategory && hubNodes.find(h => h.id === '__hub__' + activeCategory)) || coreNode;
      if (!pivot) return;

      // Inverse transform mouse coordinates through Zoom
      const zx = (e.offsetX - currentTransform.x) / currentTransform.k;
      const zy = (e.offsetY - currentTransform.y) / currentTransform.k;

      // Inverse rotation using the SAME pivot as render()
      const tx = zx - pivot.x;
      const ty = zy - pivot.y;
      const x = pivot.x + (tx * Math.cos(-rotation) - ty * Math.sin(-rotation));
      const y = pivot.y + (tx * Math.sin(-rotation) + ty * Math.cos(-rotation));

      let closest = null, minD = Infinity;

      // Filter by active category for precise interaction in Solar mode
      for (const n of skillNodes) {
        if (activeCategory !== null && n.category !== activeCategory) continue;
        const dx = n.x - x, dy = n.y - y;
        const d = dx * dx + dy * dy;
        if (d < 100 && d < minD) { closest = n; minD = d; }
      }
      
      if (!closest) {
        for (const n of hubNodes) {
          if (activeCategory !== null && n.id !== '__hub__' + activeCategory) continue;
          const dx = n.x - x, dy = n.y - y;
          const d = dx * dx + dy * dy;
          if (d < 300 && d < minD) { closest = n; minD = d; }
        }
      }

      hoveredNode = closest;
      canvas.style.cursor = closest ? 'pointer' : 'grab';
      updateTooltip(closest, e);
    });

    canvas.addEventListener('mouseenter', () => { isHovering = true; });
    canvas.addEventListener('mouseleave', () => { isHovering = false; });

    canvas.addEventListener('click', e => {
      if (hoveredNode && hoveredNode.type === 'skill') {
        activateSkill(hoveredNode.id);
      } else if (!hoveredNode) {
        // Click on background clears filter
        document.querySelectorAll('.legend-item').forEach(li => li.classList.remove('active'));
        setCategoryFilter(null);
      }
    });
  }

  function updateTooltip(node, event) {
    const tip = document.getElementById('tooltip');
    if (!node || node.type === 'core') { tip.classList.add('hidden'); return; }
    tip.classList.remove('hidden');
    tip.querySelector('.tooltip-name').textContent = node.label;
    tip.querySelector('.tooltip-category').textContent = (node.category || node.label).replace(/^\d+\s-\s/, '');
    tip.querySelector('.tooltip-desc').textContent = node.description || 'Neural capability active.';
    tip.style.left = (event.clientX + 16) + 'px';
    tip.style.top = (event.clientY + 16) + 'px';
    tip.style.borderColor = hexA(node.color, 0.4);
    tip.style.boxShadow = `0 10px 30px rgba(0,0,0,0.5), 0 0 15px ${hexA(node.color, 0.15)}`;
  }

  // ── WebSocket ──────────────────────────────────────────
  function connectWebSocket() {
    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    ws = new WebSocket(`${proto}//${location.host}`);
    ws.onopen = () => document.getElementById('stat-connection').classList.remove('disconnected');
    ws.onmessage = e => {
      const d = JSON.parse(e.data);
      if (d.type === 'connected') {
        if (d.lockedSkills) d.lockedSkills.forEach(s => {
          lockedSkills.add(s);
          activateSkill(s, { status: 'working' });
        });
      } else if (d.type === 'skill-activated') {
        activateSkill(d.skill, { 
          isObsidian: d.isObsidian, 
          message: d.message, 
          status: d.status 
        });
      } else if (d.type === 'log-particle') {
        createLogPacket(d.skill, d.level);
        const node = nodesMap.get(d.skill);
        if (d.level === 'doc') {
          addDocEntry(d.skill, node ? node.color : '#00e5ff', d.message);
        } else {
          addLogEntry(d.skill, node ? node.color : '#fff', node ? node.category : 'System', d.message);
        }
      } else if (d.type === 'search-pulse') {
        createSearchPulse(d.query);
      }
    };
    ws.onclose = () => {
      document.getElementById('stat-connection').classList.add('disconnected');
      setTimeout(connectWebSocket, 3000);
    };
  }

  function createLogPacket(skillId, level) {
    const node = nodesMap.get(skillId) || skillNodes[Math.floor(Math.random() * skillNodes.length)];
    if (!node) return;
    
    packets.push({
      t: 0,
      skillId: node.id,
      speed: 0.015 + Math.random() * 0.01,
      type: 'log',
      level: level
    });
  }

  function createSearchPulse(query) {
    searchRipples.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      radius: 0,
      alpha: 1.0,
      query: query || 'Neural Search'
    });
  }

  // ── UI Helpers ─────────────────────────────────────────
  function addLogEntry(name, color, category, message = '') {
    const log = document.getElementById('activity-log');
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const el = document.createElement('div');
    el.className = 'log-entry';
    el.innerHTML = `<div class="log-dot" style="background:${color};box-shadow:0 0 6px ${color}"></div>
      <div class="log-info"><div class="log-name">${name}</div>
      <div class="log-msg" style="font-size: 0.8em; color: rgba(255,255,255,0.6); margin-top: 2px;">${message}</div>
      <div class="log-meta" style="margin-top: 2px;">${(category || '').replace(/^\d+\s-\s/, '')} · ${time}</div></div>`;
    
    log.prepend(el);
    
    // Virtualization: limit to 35 items (better for performance with glassmorphism)
    if (log.children.length > 35) {
      while (log.children.length > 35) {
        log.lastElementChild.remove();
      }
    }
  }

  function addDocEntry(name, color, message) {
    const feed = document.getElementById('doc-feed');
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const el = document.createElement('div');
    el.className = 'doc-entry';
    el.innerHTML = `
      <div class="doc-header">
        <span class="doc-skill" style="color:${color}">${name}</span>
        <span class="doc-time">${time}</span>
      </div>
      <div class="doc-body">${message}</div>
    `;
    
    feed.prepend(el);
    
    // Glow effect
    el.style.boxShadow = `inset 0 0 10px ${hexA(color, 0.2)}`;
    setTimeout(() => { el.style.boxShadow = 'none'; }, 1000);

    if (feed.children.length > 20) feed.lastElementChild.remove();
  }


  function buildLegend(categories) {
    const c = document.getElementById('legend-items');
    categories.forEach(cat => {
      const el = document.createElement('div');
      el.className = 'legend-item';
      el.innerHTML = `<div class="legend-dot" style="background:${cat.color};box-shadow:0 0 4px ${cat.color}"></div>
        <span>${cat.name.replace(/^\d+\s-\s/, '')}</span><span class="legend-count">${cat.count}</span>`;

      el.addEventListener('click', () => {
        const isActive = el.classList.contains('active');
        document.querySelectorAll('.legend-item').forEach(li => li.classList.remove('active'));

        if (isActive) {
          setCategoryFilter(null);
        } else {
          el.classList.add('active');
          setCategoryFilter(cat.name);
        }
      });
      c.appendChild(el);
    });
  }

  function setCategoryFilter(categoryName) {
    activeCategory = categoryName;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cx = w / 2;
    const cy = h / 2;
    const scale = Math.min(w, h);

    if (!categoryName) {
      buildNeuralLayout(skillsData);
      return;
    }

    // Solar System Layout - Asteroid Belt Style
    const hub = hubNodes.find(h => h.id === '__hub__' + categoryName);
    const targetSkills = skillNodes.filter(s => s.category === categoryName);
    
    hub.targetX = cx;
    hub.targetY = cy;
    
    // Orbital parameters for "Asteroid Belt" (Tightened for better "together" feel)
    const baseRadius = scale * 0.06; // Closer to hub
    const ringSpacing = scale * 0.018; 
    const maxInRing = 12; // Fewer per ring for more rings (belt feel)
    
    targetSkills.forEach((s, i) => {
      const ringIndex = Math.floor(i / maxInRing);
      const posInRing = i % maxInRing;
      const countInRing = Math.min(maxInRing, targetSkills.length - ringIndex * maxInRing);
      
      // Asteroid Jitter (Organic positions)
      const jitterDist = (Math.random() - 0.5) * 15;
      const jitterAngle = (Math.random() - 0.5) * 0.12;
      
      const angle = (posInRing / countInRing) * Math.PI * 2 + (ringIndex * 0.5) + jitterAngle;
      const radius = baseRadius + ringIndex * ringSpacing + jitterDist;
      
      s.targetX = cx + Math.cos(angle) * radius;
      s.targetY = cy + Math.sin(angle) * radius;
      
      // Orbit Path Curves
      const link = links.find(l => l.target.id === s.id);
      if (link) {
        const cpAngle = angle + 0.4;
        const cpDist = radius * 0.85;
        link.cpX = cx + Math.cos(cpAngle) * cpDist;
        link.cpY = cy + Math.sin(cpAngle) * cpDist;
      }
    });

    // Push other hubs out of view gracefully
    hubNodes.forEach(n => {
      if (n.id !== hub.id) {
        const outAngle = n.baseAngle;
        n.targetX = cx + Math.cos(outAngle) * (scale * 0.8);
        n.targetY = cy + Math.sin(outAngle) * (scale * 0.8);
        n.brightness = 0;
      } else {
        n.brightness = 1.0;
      }
    });

    // Reset hub links for centered view
    hubLinks.forEach(l => {
      if (l.target.id === hub.id) {
        l.cpX = cx; l.cpY = cy; 
      }
    });
  }

  function initSearch(skills) {
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      if (q.length < 2) { results.classList.add('hidden'); return; }
      const matches = skills.filter(s => s.name.includes(q)).slice(0, 8);
      if (!matches.length) { results.classList.add('hidden'); return; }
      results.classList.remove('hidden');
      results.innerHTML = matches.map(s => {
        const cat = skillsData.categories[s.groupIndex];
        return `<div class="search-item" data-skill="${s.name}"><div class="legend-dot" style="background:${cat.color}"></div>${s.name}</div>`;
      }).join('');
      results.querySelectorAll('.search-item').forEach(el => {
        el.addEventListener('click', () => {
          const name = el.dataset.skill;
          const node = nodesMap.get(name);
          if (node) {
            const s = 3, tw = window.innerWidth, th = window.innerHeight;
            currentTransform = d3.zoomIdentity.translate(tw / 2 - node.x * s, th / 2 - node.y * s).scale(s);
            d3.select(canvas).transition().duration(800).call(d3.zoom().transform, currentTransform);
            activateSkill(name);
          }
          input.value = '';
          results.classList.add('hidden');
        });
      });
    });
    input.addEventListener('blur', () => setTimeout(() => results.classList.add('hidden'), 200));
  }

  // ── System Monitor ─────────────────────────────────────
  const startTime = Date.now();
  setInterval(() => {
    // Fake Latency
    const latency = Math.floor(Math.random() * 15 + 8);
    document.getElementById('m-latency').textContent = `${latency}ms`;

    // Uptime
    const elapsed = Date.now() - startTime;
    const h = Math.floor(elapsed / 3600000).toString().padStart(2, '0');
    const m = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, '0');
    const s = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
    document.getElementById('m-uptime').textContent = `${h}:${m}:${s}`;

    // Neural Load (based on active animations)
    const load = Math.min(99.9, (activeAnims.size * 2.5 + 4.2 + Math.random() * 2)).toFixed(1);
    document.getElementById('m-load').textContent = `${load}%`;
  }, 1000);

  // Demo event listener removed as requested

  // ── Utilities ──────────────────────────────────────────
  function hexA(hex, a) {
    const key = hex + a;
    if (colorCache.has(key)) return colorCache.get(key);
    
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const rgba = `rgba(${r},${g},${b},${a})`;
    
    colorCache.set(key, rgba);
    if (colorCache.size > 200) colorCache.clear(); // Prevent memory leak
    return rgba;
  }
})();
