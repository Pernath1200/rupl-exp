/**
 * Status-portrait SVG: fixed skeleton, dim empty seats, light from fruit.
 * Navigation stays on spine — this is a portrait only (soft click → optional).
 */

/** @typedef {{ id: string, domain: string, tree_part?: string, root?: string, status?: string, foundation?: boolean, label?: string }} TreeNode */

const GRAMMAR_LATERALS = [
  { tree_part: "forms", label: "Formy", angle: -55 },
  { tree_part: "verbs", label: "Czasowniki", angle: -25 },
  { tree_part: "sentence", label: "Zdanie", angle: 10 },
  { tree_part: "chunks", label: "Chunki", angle: 40 },
  { tree_part: "links", label: "Spójniki", angle: 65 },
];

/** Fixed 12 house seats (A1 may only light a few). */
const HOUSES = [
  { tree_part: "home_family", label: "Dom", side: "L", i: 0 },
  { tree_part: "food_shopping", label: "Jedzenie", side: "L", i: 1 },
  { tree_part: "free_time", label: "Czas wolny", side: "L", i: 2 },
  { tree_part: "work_routine", label: "Praca", side: "L", i: 3 },
  { tree_part: "travel_city", label: "Miasto", side: "R", i: 0 },
  { tree_part: "health_body", label: "Zdrowie", side: "R", i: 1 },
  { tree_part: "self_body", label: "Ciało", side: "R", i: 2 },
  { tree_part: "knowledge", label: "Nauka", side: "R", i: 3 },
  { tree_part: "communication", label: "Komunikacja", side: "L", i: 4 },
  { tree_part: "money", label: "Pieniądze", side: "R", i: 4 },
  { tree_part: "public_life", label: "Publiczne", side: "L", i: 5 },
  { tree_part: "inner_life", label: "Wewnętrzne", side: "R", i: 5 },
];

/**
 * @param {object} opts
 * @param {TreeNode[]} opts.nodes
 * @param {(id: string) => boolean} opts.isFruit
 * @param {(id: string) => string} opts.progressState  // fruit|started|live|planned
 * @param {(node: TreeNode) => void} [opts.onSelect]
 */
export function renderTreePortrait(container, opts) {
  const nodes = opts.nodes || [];
  const isFruit = opts.isFruit || (() => false);
  const progressState = opts.progressState || (() => "planned");

  const byPart = {};
  for (const n of nodes) {
    const tp = n.tree_part || (n.domain === "grammar" ? n.root : null);
    if (!tp) continue;
    if (!byPart[tp]) byPart[tp] = [];
    byPart[tp].push(n);
  }

  function seatFill(treePart) {
    const list = byPart[treePart] || [];
    if (!list.length) return { fill: 0, state: "dim", nodes: [] };
    let sum = 0;
    let anyLive = false;
    let anyFruit = false;
    let anyStarted = false;
    for (const n of list) {
      if (n.status !== "live") continue;
      anyLive = true;
      const st = progressState(n.id);
      if (st === "fruit" || isFruit(n.id)) {
        anyFruit = true;
        sum += 1;
      } else if (st === "started") {
        anyStarted = true;
        sum += 0.4;
      } else {
        sum += 0.15;
      }
    }
    if (!anyLive) return { fill: 0, state: "dim", nodes: list };
    const fill = Math.min(1, sum / list.length);
    const state = anyFruit ? "fruit" : anyStarted ? "started" : "live";
    return { fill, state, nodes: list };
  }

  const tap = seatFill("tap_root");
  // Foundation packs also feed tap
  const foundations = nodes.filter(
    (n) => n.domain === "grammar" && n.foundation && n.status === "live",
  );
  if (foundations.length) {
    let s = 0;
    for (const n of foundations) {
      if (isFruit(n.id)) s += 1;
      else if (progressState(n.id) === "started") s += 0.4;
      else s += 0.15;
    }
    tap.fill = Math.max(tap.fill, Math.min(1, s / foundations.length));
    if (tap.fill > 0 && tap.state === "dim") tap.state = "live";
    if (foundations.some((n) => isFruit(n.id))) tap.state = "fruit";
  }

  const trunk = seatFill("trunk");
  const laterals = GRAMMAR_LATERALS.map((L) => ({
    ...L,
    ...seatFill(L.tree_part),
  }));
  const houses = HOUSES.map((H) => ({
    ...H,
    ...seatFill(H.tree_part),
  }));

  const W = 640;
  const H = 520;
  const cx = W / 2;
  const soilY = 248;
  const copper = "#c87840";
  const amber = "#e0a050";
  const dim = "rgba(160,160,160,0.22)";
  const dimStroke = "rgba(160,160,160,0.35)";

  function rootStroke(state, fill) {
    if (state === "dim") return dimStroke;
    if (state === "fruit") return "#22c55e";
    if (state === "started") return copper;
    return copper;
  }

  function rootWidth(fill, state) {
    if (state === "dim") return 2.2;
    return 2.5 + fill * 7;
  }

  function houseOpacity(state) {
    if (state === "dim") return 0.28;
    if (state === "fruit") return 1;
    if (state === "started") return 0.85;
    return 0.65;
  }

  // Build root paths (simple curves down from soil)
  const rootPaths = laterals
    .map((L, idx) => {
      const rad = (L.angle * Math.PI) / 180;
      const len = 70 + L.fill * 90;
      const x2 = cx + Math.sin(rad) * len;
      const y2 = soilY + 36 + Math.cos(Math.abs(rad) * 0.4) * (len * 0.85);
      const c1x = cx + Math.sin(rad) * len * 0.35;
      const c1y = soilY + 50;
      const c2x = cx + Math.sin(rad) * len * 0.75;
      const c2y = soilY + 20 + len * 0.5;
      const w = rootWidth(L.fill, L.state);
      const stroke = rootStroke(L.state, L.fill);
      const op = L.state === "dim" ? 0.35 : 0.95;
      const knotR = L.state === "dim" ? 3.5 : 4.5 + L.fill * 3;
      const knotFill =
        L.state === "fruit"
          ? "#22c55e"
          : L.state === "dim"
            ? dim
            : copper;
      const firstNode = (L.nodes || []).find((n) => n.status === "live");
      const dataId = firstNode ? firstNode.id : "";
      return `
        <path class="tp-root ${L.state}" data-part="${L.tree_part}" data-node="${dataId}"
          d="M ${cx} ${soilY + 8} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}"
          fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" opacity="${op}"/>
        <circle class="tp-knot ${L.state}" data-part="${L.tree_part}" data-node="${dataId}"
          cx="${x2}" cy="${y2}" r="${knotR}" fill="${knotFill}" stroke="${stroke}" stroke-width="1.2" opacity="${op}" style="cursor:${dataId ? "pointer" : "default"}"/>
        <text class="tp-label" x="${x2}" y="${y2 + 16}" text-anchor="middle" fill="${L.state === "dim" ? "#666" : "#c8a070"}" font-size="10" font-family="Segoe UI,system-ui,sans-serif">${L.label}</text>
      `;
    })
    .join("");

  // Tap root (straight down)
  const tapLen = 55 + tap.fill * 70;
  const tapW = rootWidth(tap.fill, tap.state === "dim" && tap.fill === 0 ? "dim" : tap.state);
  const tapStroke = rootStroke(
    tap.state === "dim" && tap.fill === 0 ? "dim" : tap.state,
    tap.fill,
  );

  // Trunk
  const trunkH = 70 + trunk.fill * 50;
  const trunkW = 14 + trunk.fill * 22;
  const trunkTop = soilY - trunkH;
  const trunkOp = trunk.state === "dim" ? 0.3 : 0.9;
  const trunkFill =
    trunk.state === "fruit"
      ? "url(#trunkGradFruit)"
      : trunk.state === "dim"
        ? dim
        : "url(#trunkGrad)";

  // Branches + house tips
  const branchBits = houses
    .map((H) => {
      const sign = H.side === "L" ? -1 : 1;
      const y0 = trunkTop + 18 + H.i * 14;
      const reach = H.state === "dim" ? 48 : 55 + H.fill * 70;
      const x1 = cx + sign * (trunkW * 0.35);
      const x2 = cx + sign * reach;
      const y2 = y0 - 8 - H.i * 2;
      const op = houseOpacity(H.state);
      const stroke =
        H.state === "fruit"
          ? "#22c55e"
          : H.state === "dim"
            ? dimStroke
            : amber;
      const sw = H.state === "dim" ? 1.4 : 1.8 + H.fill * 2.2;
      const leafNodes = (H.nodes || []).filter((n) => n.status === "live");
      const dataId = leafNodes[0]?.id || "";
      // simple leaf marks along branch if live
      let leaves = "";
      if (H.state !== "dim") {
        const nLeaves = 2 + Math.round(H.fill * 3);
        for (let k = 1; k <= nLeaves; k++) {
          const t = k / (nLeaves + 1);
          const lx = x1 + (x2 - x1) * t;
          const ly = y0 + (y2 - y0) * t;
          const lr = 2.2 + H.fill * 2;
          leaves += `<circle cx="${lx}" cy="${ly - 4}" r="${lr}" fill="${H.state === "fruit" ? "#22c55e" : amber}" opacity="${0.5 + H.fill * 0.5}"/>`;
        }
      }
      return `
        <path class="tp-branch ${H.state}" data-part="${H.tree_part}" data-node="${dataId}"
          d="M ${x1} ${y0} Q ${cx + sign * reach * 0.55} ${y0 - 12}, ${x2} ${y2}"
          fill="none" stroke="${stroke}" stroke-width="${sw}" opacity="${op}" stroke-linecap="round"/>
        ${leaves}
        <text class="tp-house-label" x="${x2 + sign * 4}" y="${y2 + 3}" text-anchor="${H.side === "L" ? "end" : "start"}"
          fill="${H.state === "dim" ? "#555" : "#d4b070"}" font-size="9" font-family="Segoe UI,system-ui,sans-serif"
          opacity="${op}" style="cursor:${dataId ? "pointer" : "default"}" data-node="${dataId}">${H.label}</text>
      `;
    })
    .join("");

  const svg = `
    <svg class="tree-portrait-svg" viewBox="0 0 ${W} ${H}" width="100%" height="auto" role="img" aria-label="Portret drzewa: korzenie gramatyka, pień i liście słówka">
      <defs>
        <linearGradient id="trunkGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#c87840"/>
          <stop offset="100%" stop-color="#e0a050"/>
        </linearGradient>
        <linearGradient id="trunkGradFruit" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#22c55e"/>
          <stop offset="100%" stop-color="#4ade80"/>
        </linearGradient>
        <radialGradient id="skyGlow" cx="50%" cy="20%" r="60%">
          <stop offset="0%" stop-color="rgba(224,160,80,0.08)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="#0a0a0a" rx="8"/>
      <rect width="${W}" height="${soilY}" fill="url(#skyGlow)"/>

      <!-- canopy / trunk -->
      <g class="tp-above">
        ${branchBits}
        <rect class="tp-trunk" x="${cx - trunkW / 2}" y="${trunkTop}" width="${trunkW}" height="${trunkH + 4}"
          rx="${Math.min(8, trunkW / 2)}" fill="${trunkFill}" opacity="${trunkOp}"/>
        <text x="${cx}" y="${trunkTop + trunkH * 0.55}" text-anchor="middle" fill="rgba(0,0,0,0.55)" font-size="9" font-weight="700" font-family="Segoe UI,system-ui,sans-serif">PIEŃ</text>
      </g>

      <!-- soil line -->
      <line x1="40" y1="${soilY}" x2="${W - 40}" y2="${soilY}" stroke="rgba(208,144,80,0.55)" stroke-width="2"/>
      <text x="${W - 48}" y="${soilY - 8}" text-anchor="end" fill="#888" font-size="9" font-family="Segoe UI,system-ui,sans-serif">A1 · linia gleby</text>

      <!-- roots -->
      <g class="tp-below">
        <path d="M ${cx} ${soilY + 8} L ${cx} ${soilY + 8 + tapLen}" fill="none" stroke="${tapStroke}"
          stroke-width="${tapW}" stroke-linecap="round" opacity="${tap.state === "dim" && tap.fill === 0 ? 0.35 : 0.95}"/>
        <text x="${cx}" y="${soilY + 8 + tapLen + 16}" text-anchor="middle" fill="${tap.fill > 0 ? copper : "#555"}" font-size="10" font-family="Segoe UI,system-ui,sans-serif">Kół · ${Math.round(tap.fill * 100)}%</text>
        ${rootPaths}
      </g>

      <text x="${cx}" y="22" text-anchor="middle" fill="#a0a0a0" font-size="11" font-family="Segoe UI,system-ui,sans-serif">Portret drzewa · korzenie = gramatyka · pień/liście = słówka</text>
      <text x="${cx}" y="${H - 12}" text-anchor="middle" fill="#555" font-size="9" font-family="Segoe UI,system-ui,sans-serif">szkielet stały · przyciemnione = jeszcze nieotwarte · klik = węzeł na ścieżce</text>
    </svg>
  `;

  container.innerHTML = svg;

  if (typeof opts.onSelect === "function") {
    container.querySelectorAll("[data-node]").forEach((el) => {
      const id = el.getAttribute("data-node");
      if (!id) return;
      el.addEventListener("click", () => {
        const node = nodes.find((n) => n.id === id);
        if (node) opts.onSelect(node);
      });
    });
  }

  return { laterals, houses, trunk, tap };
}
