import React, { useRef, useEffect, useCallback } from 'react';

// ============================================================
// DONEGAL RALLY - Pseudo-3D Racing Through the Wild Atlantic Way
// ============================================================

// --- DONEGAL LOCATIONS with TONS of local references ---
const LOCATIONS = [
  { name: "Letterkenny", distance: 0, type: 'town', speedLimit: 50, landmarks: [
    { name: "The Brewery Bar", type: 'pub', color: '#8B4513', side: -1 },
    { name: "Central Bar", type: 'pub', color: '#5a2222', side: 1 },
    { name: "McGinley's", type: 'shop', color: '#e8d8c8', side: -1 },
    { name: "The Cottage Bar", type: 'pub', color: '#6a3a1a', side: 1 },
    { name: "Gallagher's Hotel", type: 'pub', color: '#aa8866', side: -1 },
    { name: "An Grianán Theatre", type: 'shop', color: '#ccbbaa', side: 1 },
    { name: "Whoriskey's Eurospar", type: 'shop', color: '#ddeecc', side: -1 },
    { name: "Pearse Road Chippy", type: 'shop', color: '#ffeecc', side: 1 },
  ]},
  { name: "Ramelton", distance: 800, type: 'village', speedLimit: 50, landmarks: [
    { name: "The Bridge Bar", type: 'pub', color: '#6a4422', side: -1 },
    { name: "The Lennon Lodge", type: 'pub', color: '#885533', side: 1 },
    { name: "Swilly Stores", type: 'shop', color: '#ddeedd', side: -1 },
  ]},
  { name: "Rathmullan", distance: 1400, type: 'village', speedLimit: 50, landmarks: [
    { name: "Beachcomber Bar", type: 'pub', color: '#446688', side: 1 },
    { name: "The Tap Room", type: 'pub', color: '#7a5533', side: -1 },
  ]},
  { name: "Milford", distance: 2000, type: 'village', speedLimit: 50, landmarks: [
    { name: "The Milford Inn", type: 'pub', color: '#7a3322', side: 1 },
    { name: "Cope Stores", type: 'shop', color: '#fff8e0', side: -1 },
    { name: "Mulroy Woods Hotel", type: 'pub', color: '#997755', side: 1 },
  ]},
  { name: "Carrigart", distance: 2800, type: 'village', speedLimit: 50, landmarks: [
    { name: "The Carrigart Hotel", type: 'pub', color: '#5a3a2a', side: -1 },
    { name: "Downings Bay Hotel", type: 'pub', color: '#667788', side: 1 },
  ]},
  { name: "Downings", distance: 3400, type: 'village', speedLimit: 50, landmarks: [
    { name: "The Harbour Bar", type: 'pub', color: '#4a5a6a', side: 1 },
    { name: "Beach Hotel", type: 'pub', color: '#88aacc', side: -1 },
    { name: "Rosapenna Golf", type: 'shop', color: '#557744', side: 1 },
  ]},
  { name: "Creeslough", distance: 4200, type: 'village', speedLimit: 60, landmarks: [
    { name: "The Village Tavern", type: 'pub', color: '#7a5533', side: -1 },
    { name: "McNutt's Tweed", type: 'shop', color: '#e8e0d0', side: 1 },
    { name: "Patrick's Spar", type: 'shop', color: '#ddeedd', side: -1 },
  ]},
  { name: "Dunfanaghy", distance: 5000, type: 'town', speedLimit: 50, landmarks: [
    { name: "Patsy Dan's", type: 'pub', color: '#883322', side: -1 },
    { name: "The Mill Restaurant", type: 'pub', color: '#99aabb', side: 1 },
    { name: "The Workhouse", type: 'shop', color: '#aaaaaa', side: -1 },
    { name: "Muck & Muffins", type: 'shop', color: '#ffddaa', side: 1 },
    { name: "Corcreggan Mill", type: 'shop', color: '#bbaa88', side: -1 },
    { name: "Arnold's Hotel", type: 'pub', color: '#aa8866', side: 1 },
  ]},
  { name: "Falcarragh", distance: 5800, type: 'village', speedLimit: 50, landmarks: [
    { name: "Shamrock Lodge", type: 'pub', color: '#2a6a2a', side: 1 },
    { name: "Falcarragh Visitor Centre", type: 'shop', color: '#ccddcc', side: -1 },
    { name: "McFadden's Bar", type: 'pub', color: '#664422', side: 1 },
  ]},
  { name: "Gortahork", distance: 6400, type: 'village', speedLimit: 50, landmarks: [
    { name: "Teach Jack", type: 'pub', color: '#aa5533', side: -1 },
    { name: "An Crannóg", type: 'shop', color: '#bbccbb', side: 1 },
  ]},
  { name: "Bloody Foreland", distance: 7000, type: 'scenic', speedLimit: 80, landmarks: [
    { name: "Foreland Heights B&B", type: 'shop', color: '#ccddff', side: 1 },
  ]},
  { name: "Bunbeg", distance: 7600, type: 'village', speedLimit: 50, landmarks: [
    { name: "Leo's Tavern", type: 'pub', color: '#cc4444', side: 1 },
    { name: "Cope Superstore", type: 'shop', color: '#ddddee', side: -1 },
    { name: "Bunbeg House", type: 'pub', color: '#887766', side: 1 },
    { name: "Teach Hiúdaí Beag", type: 'pub', color: '#775544', side: -1 },
  ]},
  { name: "Gaoth Dobhair", distance: 8200, type: 'town', speedLimit: 50, landmarks: [
    { name: "Hiúdaí Beag's", type: 'pub', color: '#5a3322', side: -1 },
    { name: "Ionad Cois Locha", type: 'shop', color: '#ccddcc', side: 1 },
    { name: "Teach Mhicí", type: 'pub', color: '#6a4433', side: -1 },
    { name: "Scoil Náisiúnta", type: 'shop', color: '#ddccbb', side: 1 },
    { name: "Rann na Feirste", type: 'shop', color: '#aabbaa', side: -1 },
  ]},
  { name: "Anagaire", distance: 8800, type: 'village', speedLimit: 60, landmarks: [
    { name: "Danny Minnies", type: 'pub', color: '#993322', side: 1 },
  ]},
  { name: "Crolly", distance: 9200, type: 'village', speedLimit: 50, landmarks: [
    { name: "Lóistín Uí Dhónaill", type: 'pub', color: '#776655', side: -1 },
    { name: "Crolly Dolls Factory", type: 'shop', color: '#ffccdd', side: 1 },
  ]},
  { name: "Dunglow / An Clochán Liath", distance: 9800, type: 'town', speedLimit: 50, landmarks: [
    { name: "Beedy's Bar", type: 'pub', color: '#664422', side: -1 },
    { name: "The Riverside Hotel", type: 'pub', color: '#8899aa', side: 1 },
    { name: "Bonner's Corner", type: 'shop', color: '#eeddcc', side: -1 },
    { name: "Atlantic Stores", type: 'shop', color: '#ddeeff', side: 1 },
  ]},
  { name: "Loughros Point", distance: 10400, type: 'scenic', speedLimit: 80, landmarks: []},
  { name: "Ardara", distance: 11000, type: 'town', speedLimit: 50, landmarks: [
    { name: "Nancy's Bar", type: 'pub', color: '#884433', side: 1 },
    { name: "The Corner House", type: 'pub', color: '#775533', side: -1 },
    { name: "Kennedy's of Ardara", type: 'shop', color: '#f0e8d8', side: 1 },
    { name: "Peter Oliver's", type: 'pub', color: '#663322', side: -1 },
    { name: "Nesbitt Arms Hotel", type: 'pub', color: '#998877', side: 1 },
    { name: "Eddie Doherty Tweed", type: 'shop', color: '#ddccaa', side: -1 },
    { name: "Cup & Kettle Café", type: 'shop', color: '#ffeedd', side: 1 },
  ]},
  { name: "Glenties", distance: 11800, type: 'village', speedLimit: 50, landmarks: [
    { name: "The Highlands Hotel", type: 'pub', color: '#556644', side: -1 },
    { name: "Paddy's Bar", type: 'pub', color: '#774433', side: 1 },
    { name: "Lim's Chinese", type: 'shop', color: '#ff4444', side: -1 },
  ]},
  { name: "Fintown", distance: 12400, type: 'village', speedLimit: 60, landmarks: [
    { name: "The Fintown Railway", type: 'shop', color: '#aabb99', side: 1 },
  ]},
  { name: "Ballybofey", distance: 13000, type: 'town', speedLimit: 50, landmarks: [
    { name: "Jackson's Hotel", type: 'pub', color: '#887766', side: -1 },
    { name: "Kee's Hotel", type: 'pub', color: '#776655', side: 1 },
    { name: "Finn Valley Centre", type: 'shop', color: '#aabbcc', side: -1 },
  ]},
  { name: "Donegal Town", distance: 14000, type: 'town', speedLimit: 50, landmarks: [
    { name: "The Reel Inn", type: 'pub', color: '#773322', side: 1 },
    { name: "The Abbey Hotel", type: 'pub', color: '#aa9977', side: -1 },
    { name: "Magee's 1866", type: 'shop', color: '#e8ddd0', side: 1 },
    { name: "Simple Simon's", type: 'shop', color: '#eeeedd', side: -1 },
    { name: "The Old Castle Bar", type: 'pub', color: '#554433', side: 1 },
    { name: "Dom's Pier 1", type: 'pub', color: '#445566', side: -1 },
    { name: "Blueberry Tearoom", type: 'shop', color: '#aabbff', side: 1 },
    { name: "Four Masters Bookshop", type: 'shop', color: '#ccbbaa', side: -1 },
    { name: "The Diamond", type: 'shop', color: '#dddddd', side: 1 },
  ]},
  { name: "Mountcharles", distance: 14800, type: 'village', speedLimit: 60, landmarks: [
    { name: "The Village Bar", type: 'pub', color: '#665544', side: -1 },
    { name: "Salthill Gardens", type: 'shop', color: '#88aa77', side: 1 },
  ]},
  { name: "Killybegs", distance: 15400, type: 'town', speedLimit: 50, landmarks: [
    { name: "The Fleet Inn", type: 'pub', color: '#335577', side: 1 },
    { name: "Cope Killybegs", type: 'shop', color: '#ddeedd', side: -1 },
    { name: "Kitty Kelly's", type: 'pub', color: '#993355', side: 1 },
    { name: "The Sail Inn", type: 'pub', color: '#556677', side: -1 },
    { name: "Melly's Fish Shop", type: 'shop', color: '#bbddff', side: 1 },
  ]},
  { name: "Kilcar", distance: 16000, type: 'village', speedLimit: 60, landmarks: [
    { name: "Piper's Rest", type: 'pub', color: '#664422', side: -1 },
    { name: "Studio Donegal", type: 'shop', color: '#ccbbaa', side: 1 },
  ]},
  { name: "Carrick", distance: 16600, type: 'village', speedLimit: 50, landmarks: [
    { name: "Slieve League Lodge", type: 'pub', color: '#778866', side: 1 },
    { name: "Ti Linn Café", type: 'shop', color: '#ffeedd', side: -1 },
  ]},
  { name: "Ballyshannon", distance: 17400, type: 'town', speedLimit: 50, landmarks: [
    { name: "Sean Óg's", type: 'pub', color: '#553322', side: -1 },
    { name: "Dicey Reilly's", type: 'pub', color: '#664433', side: 1 },
    { name: "Donegal Parian China", type: 'shop', color: '#eeeeff', side: -1 },
    { name: "Niall Mór's", type: 'pub', color: '#443322', side: 1 },
  ]},
  { name: "Bundoran", distance: 18200, type: 'town', speedLimit: 50, landmarks: [
    { name: "Brennan's Bar", type: 'pub', color: '#553322', side: -1 },
    { name: "The Surf Shack", type: 'shop', color: '#44aacc', side: 1 },
    { name: "Madden's Bridge Bar", type: 'pub', color: '#664422', side: 1 },
    { name: "The Allingham Arms", type: 'pub', color: '#887766', side: -1 },
    { name: "Bundoran Adventure Park", type: 'shop', color: '#66cc66', side: 1 },
    { name: "Waterworld", type: 'shop', color: '#44aadd', side: -1 },
    { name: "The Atlantic Apartotel", type: 'pub', color: '#556688', side: 1 },
    { name: "Viscount Bar", type: 'pub', color: '#443333', side: -1 },
  ]},
];

// Pre-build a lookup: segIdx → landmarks to render (avoid scanning all locations each frame)
const LANDMARK_MAP = new Map();
for (const loc of LOCATIONS) {
  // Spread landmarks across a WIDE range so they're visible for a long time
  // Each landmark gets its own segment range, spread out evenly
  const spacing = Math.max(6, Math.floor(80 / Math.max(1, loc.landmarks.length)));
  for (let li = 0; li < loc.landmarks.length; li++) {
    const lm = loc.landmarks[li];
    const center = loc.distance + (li - loc.landmarks.length/2) * spacing;
    // Each building visible for 20 segments
    for (let offset = -10; offset <= 10; offset++) {
      const seg = Math.floor(center + offset);
      if (!LANDMARK_MAP.has(seg)) LANDMARK_MAP.set(seg, []);
      LANDMARK_MAP.get(seg).push(lm);
    }
  }
}

// Pre-build location zone lookup for speed
const LOCATION_ZONES = LOCATIONS.map(loc => ({
  ...loc,
  zoneStart: loc.distance - 200,
  zoneEnd: loc.distance + 200,
  approachStart: loc.distance - 400,
  approachEnd: loc.distance + 400,
}));

// Road segment definitions - narrow = width multiplier (1 = normal, 0.5 = narrow boreen)
const ROAD_SEGMENTS = [];
function buildRoad() {
  // narrow: 1 = full width, 0.55 = narrow boreen/single track
  // MOSTLY STRAIGHT roads with gentle bends — true Donegal N56/N15 feel
  const patterns = [
    { len: 300, curve: 0, narrow: 1 },           // Letterkenny - long straight
    { len: 40, curve: 0.15, narrow: 1 },          // Gentle bend
    { len: 400, curve: 0, narrow: 1 },            // Long N56 straight
    { len: 30, curve: -0.12, narrow: 1 },         // Slight bend
    { len: 500, curve: 0, narrow: 1 },            // Big open straight 100km/h
    { len: 35, curve: 0.1, narrow: 1 },
    { len: 300, curve: 0, narrow: 1 },
    { len: 60, curve: 0, narrow: 0.55 },          // *** NARROW BOREEN ***
    { len: 40, curve: -0.08, narrow: 0.55 },      // *** Narrow gentle bend ***
    { len: 60, curve: 0, narrow: 0.55 },          // *** End narrow ***
    { len: 400, curve: 0, narrow: 1 },            // Back to wide straight
    { len: 25, curve: 0.12, narrow: 1 },          // Slight right
    { len: 350, curve: 0, narrow: 1 },
    { len: 30, curve: -0.15, narrow: 1 },         // Gentle left
    { len: 500, curve: 0, narrow: 1 },            // Long fast straight
    { len: 35, curve: 0.1, narrow: 1 },
    { len: 80, curve: 0, narrow: 0.55 },          // *** NARROW country lane ***
    { len: 80, curve: 0, narrow: 0.55 },          // *** Still narrow ***
    { len: 400, curve: 0, narrow: 1 },
    { len: 25, curve: -0.1, narrow: 1 },
    { len: 600, curve: 0, narrow: 1 },            // Very long N56 straight
    { len: 30, curve: 0.15, narrow: 1 },
    { len: 400, curve: 0, narrow: 1 },
    { len: 20, curve: -0.12, narrow: 1 },
    { len: 350, curve: 0, narrow: 1 },
    { len: 70, curve: 0, narrow: 0.55 },          // *** NARROW boreen ***
    { len: 70, curve: 0, narrow: 0.55 },          // *** End narrow ***
    { len: 500, curve: 0, narrow: 1 },
    { len: 30, curve: 0.1, narrow: 1 },
    { len: 400, curve: 0, narrow: 1 },
    { len: 25, curve: -0.1, narrow: 1 },
    { len: 600, curve: 0, narrow: 1 },
    { len: 35, curve: 0.12, narrow: 1 },
    { len: 80, curve: 0, narrow: 0.55 },          // *** NARROW ***
    { len: 80, curve: 0, narrow: 0.55 },
    { len: 400, curve: 0, narrow: 1 },
    { len: 20, curve: -0.08, narrow: 1 },
    { len: 500, curve: 0, narrow: 1 },
    { len: 30, curve: 0.1, narrow: 1 },
    { len: 70, curve: 0, narrow: 0.55 },          // *** NARROW lane ***
    { len: 70, curve: 0, narrow: 0.55 },
    { len: 400, curve: 0, narrow: 1 },
    { len: 25, curve: -0.12, narrow: 1 },
    { len: 600, curve: 0, narrow: 1 },
    { len: 30, curve: 0.1, narrow: 1 },
    { len: 500, curve: 0, narrow: 1 },
    // === Extended road to reach Bundoran (need ~18500 total) ===
    { len: 35, curve: -0.1, narrow: 1 },
    { len: 400, curve: 0, narrow: 1 },
    { len: 60, curve: 0, narrow: 0.55 },          // Narrow boreen
    { len: 60, curve: 0, narrow: 0.55 },
    { len: 500, curve: 0, narrow: 1 },
    { len: 25, curve: 0.12, narrow: 1 },
    { len: 600, curve: 0, narrow: 1 },
    { len: 30, curve: -0.08, narrow: 1 },
    { len: 400, curve: 0, narrow: 1 },
    { len: 20, curve: 0.15, narrow: 1 },
    { len: 500, curve: 0, narrow: 1 },
    { len: 35, curve: -0.1, narrow: 1 },
    { len: 350, curve: 0, narrow: 1 },
    { len: 80, curve: 0, narrow: 0.55 },          // Narrow lane
    { len: 80, curve: 0, narrow: 0.55 },
    { len: 400, curve: 0, narrow: 1 },
    { len: 25, curve: 0.1, narrow: 1 },
    { len: 600, curve: 0, narrow: 1 },
    { len: 30, curve: -0.12, narrow: 1 },
    { len: 500, curve: 0, narrow: 1 },
    { len: 20, curve: 0.08, narrow: 1 },
    { len: 400, curve: 0, narrow: 1 },
    { len: 35, curve: -0.1, narrow: 1 },
    { len: 300, curve: 0, narrow: 1 },
    { len: 70, curve: 0, narrow: 0.55 },          // Narrow
    { len: 70, curve: 0, narrow: 0.55 },
    { len: 500, curve: 0, narrow: 1 },
    { len: 25, curve: 0.12, narrow: 1 },
    { len: 600, curve: 0, narrow: 1 },
    { len: 30, curve: -0.15, narrow: 1 },
    { len: 400, curve: 0, narrow: 1 },
    { len: 500, curve: 0, narrow: 1 },
    { len: 35, curve: 0.1, narrow: 1 },
    { len: 300, curve: 0, narrow: 1 },
    { len: 25, curve: -0.08, narrow: 1 },
    { len: 600, curve: 0, narrow: 1 },
    { len: 80, curve: 0, narrow: 0.55 },
    { len: 80, curve: 0, narrow: 0.55 },
    { len: 400, curve: 0, narrow: 1 },
    { len: 30, curve: 0.12, narrow: 1 },
    { len: 500, curve: 0, narrow: 1 },
    { len: 400, curve: 0, narrow: 1 },            // Final straight into Bundoran
    // === WILD ATLANTIC WAY coastal section ===
    { len: 200, curve: 0.05, narrow: 0.55 },     // Narrow winding coast road
    { len: 150, curve: -0.06, narrow: 0.55 },
    { len: 180, curve: 0.04, narrow: 0.55 },
    { len: 120, curve: -0.05, narrow: 0.55 },
    { len: 200, curve: 0.03, narrow: 0.55 },
    { len: 100, curve: 0, narrow: 1 },            // Brief wide section
    { len: 250, curve: -0.04, narrow: 0.55 },    // Back to narrow
    { len: 180, curve: 0.06, narrow: 0.55 },
    { len: 200, curve: 0, narrow: 0.55 },         // Straight narrow
    { len: 150, curve: -0.05, narrow: 0.55 },
    { len: 300, curve: 0, narrow: 1 },            // End of WAW section
  ];

  let pos = 0;
  for (const p of patterns) {
    for (let i = 0; i < p.len; i++) {
      ROAD_SEGMENTS.push({ curve: p.curve, narrow: p.narrow });
      pos++;
    }
  }
  return pos;
}
const TOTAL_SEGMENTS = buildRoad();

// Obstacle types
const OBS_TYPES = [
  { id: 'cow', name: 'COW', points: 50, moveSpeed: 0.2 },
  { id: 'bus', name: 'McGINLEY BUS', points: 100, moveSpeed: 0 },
  { id: 'buckfast', name: 'BUCKFAST', points: 75, moveSpeed: 0 },
  { id: 'baileys', name: 'BAILEYS', points: 75, moveSpeed: 0 },
  { id: 'sheep', name: 'SHEEP', points: 30, moveSpeed: 0.15 },
];

// ============ SPRITE DRAWING ============

function drawCow(ctx, x, y, w, h) {
  if (w < 8) return;
  // Body
  ctx.fillStyle = '#fff';
  ctx.fillRect(x + w*0.15, y + h*0.3, w*0.65, h*0.4);
  // Black patches
  ctx.fillStyle = '#222';
  ctx.fillRect(x + w*0.25, y + h*0.32, w*0.18, h*0.15);
  ctx.fillRect(x + w*0.55, y + h*0.38, w*0.15, h*0.12);
  // Head
  ctx.fillStyle = '#fff';
  ctx.fillRect(x, y + h*0.2, w*0.25, h*0.32);
  ctx.fillStyle = '#222';
  ctx.fillRect(x, y + h*0.2, w*0.1, h*0.12); // ear
  // Eye
  ctx.fillStyle = '#000';
  ctx.fillRect(x + w*0.08, y + h*0.28, w*0.06, h*0.06);
  // Pink nose
  ctx.fillStyle = '#ffaaaa';
  ctx.fillRect(x + w*0.03, y + h*0.42, w*0.12, h*0.08);
  // Nostrils
  ctx.fillStyle = '#222';
  ctx.fillRect(x + w*0.06, y + h*0.43, w*0.03, h*0.03);
  ctx.fillRect(x + w*0.11, y + h*0.43, w*0.03, h*0.03);
  // Legs
  ctx.fillStyle = '#eee';
  ctx.fillRect(x + w*0.2, y + h*0.7, w*0.08, h*0.25);
  ctx.fillRect(x + w*0.4, y + h*0.7, w*0.08, h*0.25);
  ctx.fillRect(x + w*0.6, y + h*0.7, w*0.08, h*0.25);
  // Hooves
  ctx.fillStyle = '#333';
  ctx.fillRect(x + w*0.2, y + h*0.9, w*0.08, h*0.1);
  ctx.fillRect(x + w*0.4, y + h*0.9, w*0.08, h*0.1);
  ctx.fillRect(x + w*0.6, y + h*0.9, w*0.08, h*0.1);
  // Udder
  ctx.fillStyle = '#ffaaaa';
  ctx.fillRect(x + w*0.45, y + h*0.65, w*0.12, h*0.08);
  // Tail
  ctx.fillStyle = '#222';
  ctx.fillRect(x + w*0.8, y + h*0.28, w*0.06, h*0.06);
  ctx.fillRect(x + w*0.85, y + h*0.22, w*0.06, h*0.12);
  // Label
  if (w > 30) {
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${Math.max(9, w*0.2)|0}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('MOO!', x + w/2, y - 2);
  }
}

function drawBus(ctx, x, y, w, h) {
  if (w < 10) return;
  // McGinley Bus - blue and white livery (Letterkenny's own)
  // Main body - McGinley blue
  ctx.fillStyle = '#1a3a7a';
  ctx.fillRect(x, y + h*0.12, w, h*0.65);
  // White lower panel
  ctx.fillStyle = '#eeeeff';
  ctx.fillRect(x, y + h*0.52, w, h*0.25);
  // Silver/grey roof
  ctx.fillStyle = '#aabbcc';
  ctx.fillRect(x + w*0.03, y + h*0.04, w*0.94, h*0.1);
  // Blue stripe accent
  ctx.fillStyle = '#2255aa';
  ctx.fillRect(x, y + h*0.48, w, h*0.05);
  // Windows - large coach style
  ctx.fillStyle = '#88ccee';
  const winCount = Math.max(2, Math.min(7, (w / 12)|0));
  const winW = w * 0.82 / winCount;
  for (let i = 0; i < winCount; i++) {
    ctx.fillRect(x + w*0.09 + i * winW, y + h*0.14, winW * 0.8, h*0.2);
    // Window tint reflection
    ctx.fillStyle = 'rgba(200,230,255,0.3)';
    ctx.fillRect(x + w*0.09 + i * winW, y + h*0.14, winW * 0.4, h*0.08);
    ctx.fillStyle = '#88ccee';
  }
  // Front windshield - large coach style
  ctx.fillStyle = '#aaddff';
  ctx.fillRect(x, y + h*0.1, w*0.12, h*0.28);
  // Wheels - larger, more realistic
  ctx.fillStyle = '#111';
  const wheelR = Math.max(4, h * 0.11);
  ctx.beginPath(); ctx.arc(x + w*0.18, y + h*0.82, wheelR, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + w*0.82, y + h*0.82, wheelR, 0, Math.PI*2); ctx.fill();
  // Chrome hubcaps
  ctx.fillStyle = '#ccc';
  ctx.beginPath(); ctx.arc(x + w*0.18, y + h*0.82, wheelR*0.35, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + w*0.82, y + h*0.82, wheelR*0.35, 0, Math.PI*2); ctx.fill();
  // Headlights
  ctx.fillStyle = '#ffff88';
  ctx.fillRect(x - w*0.01, y + h*0.28, w*0.04, h*0.08);
  ctx.fillRect(x - w*0.01, y + h*0.38, w*0.04, h*0.06);
  // Tail lights
  ctx.fillStyle = '#ff2222';
  ctx.fillRect(x + w*0.97, y + h*0.28, w*0.03, h*0.08);
  ctx.fillStyle = '#ffaa00';
  ctx.fillRect(x + w*0.97, y + h*0.38, w*0.03, h*0.06);
  // "McGINLEY" text
  if (w > 40) {
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${Math.max(8, w*0.13)|0}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('McGINLEY', x + w/2, y + h*0.32);
    ctx.fillStyle = '#aaccff';
    ctx.font = `${Math.max(6, w*0.08)|0}px monospace`;
    ctx.fillText('COACHES', x + w/2, y + h*0.42);
    // Letterkenny text
    ctx.fillStyle = '#1a3a7a';
    ctx.font = `${Math.max(5, w*0.07)|0}px monospace`;
    ctx.fillText('LETTERKENNY', x + w/2, y + h*0.66);
  } else if (w > 20) {
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${Math.max(6, w*0.16)|0}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('McG', x + w/2, y + h*0.32);
  }
  // Door
  ctx.fillStyle = '#334466';
  ctx.fillRect(x + w*0.02, y + h*0.35, w*0.08, h*0.38);
}

function drawBuckfast(ctx, x, y, w, h) {
  if (w < 6) return;
  // Bottle body - dark brown/green glass
  ctx.fillStyle = '#2a1a08';
  ctx.beginPath();
  ctx.moveTo(x + w*0.25, y + h*0.92);
  ctx.lineTo(x + w*0.22, y + h*0.35);
  ctx.lineTo(x + w*0.78, y + h*0.35);
  ctx.lineTo(x + w*0.75, y + h*0.92);
  ctx.closePath();
  ctx.fill();
  // Neck
  ctx.fillStyle = '#2a1a08';
  ctx.fillRect(x + w*0.35, y + h*0.08, w*0.3, h*0.28);
  // Cap - gold
  ctx.fillStyle = '#c8a84e';
  ctx.fillRect(x + w*0.37, y + h*0.03, w*0.26, h*0.07);
  // Label - cream/yellow
  ctx.fillStyle = '#f0e0a0';
  ctx.fillRect(x + w*0.24, y + h*0.45, w*0.52, h*0.32);
  // Label border - red
  ctx.strokeStyle = '#aa2222';
  ctx.lineWidth = Math.max(1, w*0.02);
  ctx.strokeRect(x + w*0.24, y + h*0.45, w*0.52, h*0.32);
  // Cross on label
  ctx.strokeStyle = '#aa2222';
  ctx.lineWidth = Math.max(1, w*0.02);
  ctx.beginPath();
  ctx.moveTo(x + w*0.5, y + h*0.48);
  ctx.lineTo(x + w*0.5, y + h*0.7);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + w*0.35, y + h*0.58);
  ctx.lineTo(x + w*0.65, y + h*0.58);
  ctx.stroke();
  // Glow effect (it's got powers)
  ctx.fillStyle = 'rgba(200,150,50,0.15)';
  ctx.beginPath();
  ctx.arc(x + w*0.5, y + h*0.55, w*0.45, 0, Math.PI*2);
  ctx.fill();
  // BUCKFAST text
  if (w > 16) {
    ctx.fillStyle = '#441100';
    ctx.font = `bold ${Math.max(5, w*0.16)|0}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('BUCKFAST', x + w/2, y + h*0.88);
  }
  // "TONIC WINE" subtitle
  if (w > 24) {
    ctx.fillStyle = '#aa2222';
    ctx.font = `${Math.max(4, w*0.1)|0}px monospace`;
    ctx.fillText('TONIC WINE', x + w/2, y + h*0.95);
  }
}

function drawBaileys(ctx, x, y, w, h) {
  if (w < 6) return;
  // Bottle body
  ctx.fillStyle = '#2d1a0e';
  ctx.fillRect(x + w*0.2, y + h*0.3, w*0.6, h*0.6);
  // Neck
  ctx.fillStyle = '#2d1a0e';
  ctx.fillRect(x + w*0.3, y + h*0.1, w*0.4, h*0.22);
  // Cap
  ctx.fillStyle = '#c8a84e';
  ctx.fillRect(x + w*0.35, y + h*0.05, w*0.3, h*0.08);
  // Label
  ctx.fillStyle = '#f5e6c8';
  ctx.fillRect(x + w*0.25, y + h*0.42, w*0.5, h*0.28);
  // Label border
  ctx.strokeStyle = '#c8a84e';
  ctx.lineWidth = 1;
  ctx.strokeRect(x + w*0.25, y + h*0.42, w*0.5, h*0.28);
  // Gold bands
  ctx.fillStyle = '#c8a84e';
  ctx.fillRect(x + w*0.25, y + h*0.38, w*0.5, h*0.05);
  ctx.fillRect(x + w*0.25, y + h*0.72, w*0.5, h*0.04);
  // Text
  if (w > 16) {
    ctx.fillStyle = '#2d1a0e';
    ctx.font = `bold ${Math.max(5, w*0.18)|0}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('BAILEYS', x + w/2, y + h*0.58);
    ctx.font = `${Math.max(4, w*0.12)|0}px monospace`;
    ctx.fillText('IRISH CREAM', x + w/2, y + h*0.66);
  }
}

function drawSheep(ctx, x, y, w, h) {
  if (w < 6) return;
  // Fluffy body
  ctx.fillStyle = '#f0f0f0';
  ctx.beginPath();
  ctx.ellipse(x + w*0.55, y + h*0.45, w*0.35, h*0.25, 0, 0, Math.PI*2);
  ctx.fill();
  // Extra fluff
  ctx.beginPath();
  ctx.ellipse(x + w*0.4, y + h*0.4, w*0.2, h*0.18, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(x + w*0.7, y + h*0.42, w*0.18, h*0.16, 0, 0, Math.PI*2);
  ctx.fill();
  // Head - black face
  ctx.fillStyle = '#222';
  ctx.fillRect(x + w*0.05, y + h*0.3, w*0.22, h*0.28);
  // Eye
  ctx.fillStyle = '#fff';
  ctx.fillRect(x + w*0.12, y + h*0.35, w*0.06, h*0.06);
  ctx.fillStyle = '#000';
  ctx.fillRect(x + w*0.14, y + h*0.36, w*0.03, h*0.04);
  // Legs
  ctx.fillStyle = '#222';
  ctx.fillRect(x + w*0.3, y + h*0.65, w*0.08, h*0.3);
  ctx.fillRect(x + w*0.5, y + h*0.65, w*0.08, h*0.3);
  ctx.fillRect(x + w*0.65, y + h*0.65, w*0.08, h*0.3);
  if (w > 20) {
    ctx.fillStyle = '#fff';
    ctx.font = `${Math.max(7, w*0.2)|0}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('BAA!', x + w/2, y - 2);
  }
}

function drawPub(ctx, x, y, w, h, name, color) {
  if (w < 15) return;
  // Building
  ctx.fillStyle = color || '#d4a574';
  ctx.fillRect(x, y + h*0.2, w, h*0.8);
  // Roof
  ctx.fillStyle = '#444';
  ctx.beginPath();
  ctx.moveTo(x - w*0.05, y + h*0.2);
  ctx.lineTo(x + w/2, y);
  ctx.lineTo(x + w*1.05, y + h*0.2);
  ctx.closePath();
  ctx.fill();
  // Chimney
  ctx.fillStyle = '#666';
  ctx.fillRect(x + w*0.75, y - h*0.05, w*0.1, h*0.25);
  // Door
  ctx.fillStyle = '#4a2810';
  ctx.fillRect(x + w*0.4, y + h*0.5, w*0.2, h*0.5);
  ctx.fillStyle = '#c8a84e';
  ctx.fillRect(x + w*0.55, y + h*0.72, w*0.04, h*0.04);
  // Windows with warm glow
  ctx.fillStyle = '#ffdd66';
  ctx.fillRect(x + w*0.08, y + h*0.35, w*0.22, h*0.2);
  ctx.fillRect(x + w*0.7, y + h*0.35, w*0.22, h*0.2);
  // Window panes
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;
  ctx.strokeRect(x + w*0.08, y + h*0.35, w*0.22, h*0.2);
  ctx.strokeRect(x + w*0.7, y + h*0.35, w*0.22, h*0.2);
  // Sign board
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(x + w*0.05, y + h*0.22, w*0.9, h*0.14);
  ctx.strokeStyle = '#c8a84e';
  ctx.strokeRect(x + w*0.05, y + h*0.22, w*0.9, h*0.14);
  // Pub name
  if (w > 25) {
    ctx.fillStyle = '#c8a84e';
    const fontSize = Math.min(Math.max(7, w*0.12)|0, 16);
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText(name, x + w/2, y + h*0.33);
  }
  // Guinness sign
  if (w > 40) {
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(x + w*0.7, y + h*0.6, w*0.22, h*0.12);
    ctx.fillStyle = '#f5e6c8';
    ctx.font = `${Math.max(5, w*0.06)|0}px monospace`;
    ctx.fillText('GUINNESS', x + w*0.81, y + h*0.69);
  }
  // Flower baskets
  ctx.fillStyle = '#ff6688';
  ctx.fillRect(x + w*0.05, y + h*0.33, w*0.06, h*0.04);
  ctx.fillRect(x + w*0.89, y + h*0.33, w*0.06, h*0.04);
}

function drawShop(ctx, x, y, w, h, name, color) {
  if (w < 15) return;
  // Building
  ctx.fillStyle = color || '#e8e8e8';
  ctx.fillRect(x, y + h*0.12, w, h*0.88);
  // Flat roof
  ctx.fillStyle = '#555';
  ctx.fillRect(x - w*0.02, y + h*0.1, w*1.04, h*0.05);
  // Large shop window
  ctx.fillStyle = '#88bbdd';
  ctx.fillRect(x + w*0.05, y + h*0.45, w*0.9, h*0.4);
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;
  ctx.strokeRect(x + w*0.05, y + h*0.45, w*0.9, h*0.4);
  // Door
  ctx.fillStyle = '#446688';
  ctx.fillRect(x + w*0.4, y + h*0.55, w*0.2, h*0.45);
  // Awning (red/white stripes)
  ctx.fillStyle = '#cc3333';
  ctx.fillRect(x + w*0.03, y + h*0.4, w*0.94, h*0.07);
  ctx.fillStyle = '#fff';
  const stripes = Math.max(2, (w / 12)|0);
  const sw = w * 0.94 / stripes;
  for (let i = 0; i < stripes; i += 2) {
    ctx.fillRect(x + w*0.03 + i*sw, y + h*0.4, sw, h*0.07);
  }
  // Sign
  ctx.fillStyle = '#2a5a2a';
  ctx.fillRect(x + w*0.05, y + h*0.15, w*0.9, h*0.22);
  ctx.strokeStyle = '#c8a84e';
  ctx.strokeRect(x + w*0.05, y + h*0.15, w*0.9, h*0.22);
  if (w > 25) {
    ctx.fillStyle = '#fff';
    const fontSize = Math.min(Math.max(7, w*0.11)|0, 14);
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText(name, x + w/2, y + h*0.3);
  }
}

function drawTree(ctx, x, y, w, h) {
  if (w < 4) return;
  ctx.fillStyle = '#5a3a1a';
  ctx.fillRect(x + w*0.35, y + h*0.6, w*0.3, h*0.4);
  ctx.fillStyle = '#1a5a1a';
  ctx.beginPath();
  ctx.moveTo(x + w/2, y);
  ctx.lineTo(x + w, y + h*0.45);
  ctx.lineTo(x, y + h*0.45);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#2a7a2a';
  ctx.beginPath();
  ctx.moveTo(x + w/2, y + h*0.2);
  ctx.lineTo(x + w*0.9, y + h*0.65);
  ctx.lineTo(x + w*0.1, y + h*0.65);
  ctx.closePath();
  ctx.fill();
}

function drawStoneWall(ctx, x, y, w, h) {
  if (w < 3 || h < 2) return;
  ctx.fillStyle = '#888';
  ctx.fillRect(x, y, w, h);
  const cols = Math.max(1, (w / (h * 0.8))|0);
  const sW = w / cols;
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < cols; c++) {
      const off = r % 2 === 0 ? 0 : sW * 0.5;
      const shade = 100 + ((c + r * 3) * 37) % 60;
      ctx.fillStyle = `rgb(${shade},${shade},${shade - 10})`;
      ctx.fillRect(x + c * sW + off, y + r * h/2, sW - 1, h/2 - 1);
    }
  }
}

function drawPlayerCar(ctx, x, y, w, h) {
  // Body
  ctx.fillStyle = '#2255cc';
  ctx.fillRect(x + w*0.1, y + h*0.3, w*0.8, h*0.6);
  // Hood
  ctx.fillStyle = '#1144aa';
  ctx.fillRect(x + w*0.15, y + h*0.12, w*0.7, h*0.2);
  // Windshield
  ctx.fillStyle = '#88bbee';
  ctx.fillRect(x + w*0.22, y + h*0.22, w*0.56, h*0.14);
  // Racing stripe
  ctx.fillStyle = '#fff';
  ctx.fillRect(x + w*0.42, y + h*0.12, w*0.16, h*0.78);
  // Side panels
  ctx.fillStyle = '#1133aa';
  ctx.fillRect(x + w*0.1, y + h*0.45, w*0.08, h*0.3);
  ctx.fillRect(x + w*0.82, y + h*0.45, w*0.08, h*0.3);
  // Wheels
  ctx.fillStyle = '#111';
  ctx.fillRect(x + w*0.04, y + h*0.32, w*0.1, h*0.16);
  ctx.fillRect(x + w*0.86, y + h*0.32, w*0.1, h*0.16);
  ctx.fillRect(x + w*0.04, y + h*0.72, w*0.1, h*0.16);
  ctx.fillRect(x + w*0.86, y + h*0.72, w*0.1, h*0.16);
  // Headlights
  ctx.fillStyle = '#ffff66';
  ctx.fillRect(x + w*0.2, y + h*0.12, w*0.1, h*0.05);
  ctx.fillRect(x + w*0.7, y + h*0.12, w*0.1, h*0.05);
  // Tail lights
  ctx.fillStyle = '#ff3333';
  ctx.fillRect(x + w*0.15, y + h*0.85, w*0.14, h*0.05);
  ctx.fillRect(x + w*0.71, y + h*0.85, w*0.14, h*0.05);
  // Plate
  ctx.fillStyle = '#fff';
  ctx.fillRect(x + w*0.35, y + h*0.88, w*0.3, h*0.07);
  ctx.fillStyle = '#000';
  ctx.font = `bold ${Math.max(7, w*0.14)|0}px monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('DL 241', x + w/2, y + h*0.94);
  // Rally number circle
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x + w/2, y + h*0.6, w*0.12, 0, Math.PI*2);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.font = `bold ${Math.max(10, w*0.22)|0}px monospace`;
  ctx.fillText('7', x + w/2, y + h*0.64);
}

// ============ THE GAME COMPONENT ============

function Game() {
  const canvasRef = useRef(null);
  const gsRef = useRef({
    running: false,
    started: false,
    gameOver: false,
    paused: false,
    score: 0,
    speed: 0,
    maxSpeed: 5,
    position: 0,
    playerX: -0.25,
    lives: 3,
    invincible: 0,
    combo: 1,
    comboTimer: 0,
    distanceTraveled: 0,
    currentLocation: 'Letterkenny',
    speedZone: 50,
    obstacles: [],
    oncomingCars: [],
    lastObstSpawn: 0,
    lastCarSpawn: 0,
    frameCount: 0,
    shake: 0,
    flashMsg: '',
    flashTimer: 0,
    nearMissMsg: '',
    nearMissTimer: 0,
    diffLevel: 1,
    inTown: false,
    nearbyLandmarks: [],
    obstFreq: 100,
    isNarrow: false,
    pullInWarning: false,
    drunkLevel: 0,       // 0 = sober, increases with each Buckfast hit
    drunkTimer: 0,       // frames remaining of current drunk effect
  });
  const keysRef = useRef({});

  const resetGame = useCallback(() => {
    const gs = gsRef.current;
    Object.assign(gs, {
      score: 0, speed: 0, position: 0, playerX: -0.25,
      lives: 3, invincible: 0, combo: 1, comboTimer: 0,
      distanceTraveled: 0, obstacles: [], oncomingCars: [],
      lastObstSpawn: 0, lastCarSpawn: 0, frameCount: 0,
      shake: 0, flashMsg: '', flashTimer: 0,
      nearMissMsg: '', nearMissTimer: 0, diffLevel: 1,
      gameOver: false, started: true, running: true,
      drunkLevel: 0, drunkTimer: 0,
    });
  }, []);

  // Input
  useEffect(() => {
    const down = (e) => {
      keysRef.current[e.code] = true;
      const gs = gsRef.current;
      if (!gs.started && (e.code === 'Space' || e.code === 'Enter')) {
        gs.started = true; gs.running = true;
      }
      if (gs.gameOver && (e.code === 'KeyR')) resetGame();
      if (e.code === 'KeyP') gs.paused = !gs.paused;
      e.preventDefault();
    };
    const up = (e) => { keysRef.current[e.code] = false; e.preventDefault(); };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, [resetGame]);

  // Main loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = Math.min(window.innerWidth, 1200);
      canvas.height = Math.min(window.innerHeight, 800);
    };
    resize();
    window.addEventListener('resize', resize);

    const loop = () => {
      const gs = gsRef.current;
      const W = canvas.width;
      const H = canvas.height;
      const keys = keysRef.current;
      gs.frameCount++;

      const accel = keys['ArrowUp'] || keys['KeyW'];
      const brake = keys['ArrowDown'] || keys['KeyS'];
      const left = keys['ArrowLeft'] || keys['KeyA'];
      const right = keys['ArrowRight'] || keys['KeyD'];

      // ====== UPDATE ======
      // Perspective constants (shared between update collision + render)
      const horizon = H * 0.42;
      const roadBottom = H;
      const roadHeight = roadBottom - horizon;
      const numLines = 200;
      const camH = 1500;

      if (gs.started && gs.running && !gs.paused && !gs.gameOver) {
        // Difficulty - slower progression
        gs.diffLevel = 1 + Math.floor(gs.distanceTraveled / 4000);
        gs.obstFreq = Math.max(60, 160 - gs.diffLevel * 8);
        gs.maxSpeed = Math.min(5, 2.5 + gs.diffLevel * 0.2);

        // Location zone check
        gs.inTown = false;
        let townSlow = 1;
        gs.speedZone = 100;
        gs.nearbyLandmarks = [];
        for (const z of LOCATION_ZONES) {
          if (gs.position >= z.zoneStart && gs.position <= z.zoneEnd) {
            gs.inTown = true;
            gs.speedZone = z.speedLimit || 50;
            townSlow = 0.35; // much slower in towns so you can see landmarks
            gs.currentLocation = z.name;
            gs.nearbyLandmarks = z.landmarks;
            break;
          } else if (gs.position >= z.approachStart && gs.position <= z.approachEnd) {
            gs.speedZone = 80;
            townSlow = 0.55;
            gs.currentLocation = z.name;
            // DON'T set nearbyLandmarks here — banner only shows inside town
            break;
          }
        }

        // Road segment lookup (needed for edge proximity + curvature)
        const segIdx = Math.floor(gs.position) % TOTAL_SEGMENTS;
        const seg = ROAD_SEGMENTS[segIdx];

        // AUTO-ACCELERATE - car drives itself, brake to slow
        // Pulling to the side (near road edge) auto-slows
        const edgeProximity = Math.abs(gs.playerX) / (0.85 * (seg ? seg.narrow : 1));
        const edgeSlow = edgeProximity > 0.7 ? 0.3 : edgeProximity > 0.5 ? 0.6 : 1;

        if (brake) {
          gs.speed = Math.max(0, gs.speed - 0.06);
        } else {
          // Auto accelerate toward target speed
          const targetSpeed = gs.maxSpeed * townSlow * edgeSlow;
          if (gs.speed < targetSpeed) {
            gs.speed = Math.min(targetSpeed, gs.speed + 0.03);
          } else {
            gs.speed = Math.max(targetSpeed, gs.speed - 0.02);
          }
        }

        // Steering — only when player presses keys
        // No auto-drift from curves (car stays in lane unless you steer)
        const steerAmt = 0.035 * (gs.speed / gs.maxSpeed);
        if (left) gs.playerX -= steerAmt;
        if (right) gs.playerX += steerAmt;

        // Road width clamp - can't leave the road!
        const roadNarrow = seg ? seg.narrow : 1;
        const roadEdge = 0.85 * roadNarrow; // narrower road = tighter clamp
        gs.isNarrow = roadNarrow < 0.7;

        // HARD wall at road edges - cannot leave the road at all
        if (gs.playerX > roadEdge) {
          gs.playerX = roadEdge - 0.01;
          gs.speed *= 0.85;
          gs.shake = 4;
        } else if (gs.playerX < -roadEdge) {
          gs.playerX = -roadEdge + 0.01;
          gs.speed *= 0.85;
          gs.shake = 4;
        }

        // Allow reversing with brake when stopped (for narrow sections)
        if (brake && gs.speed <= 0.05) {
          gs.speed = Math.max(-2, gs.speed - 0.05); // reverse!
        }
        if (gs.speed < 0) {
          // Reversing
          gs.position += gs.speed;
          gs.distanceTraveled = Math.max(0, gs.distanceTraveled + gs.speed);
          if (gs.position < 0) gs.position += TOTAL_SEGMENTS;
          if (accel) gs.speed = Math.min(0, gs.speed + 0.1); // brake while reversing = slow down
        } else {
          gs.position += gs.speed;
          gs.distanceTraveled += gs.speed;
        }
        if (gs.position >= TOTAL_SEGMENTS) gs.position -= TOTAL_SEGMENTS;

        // "PULL IN!" warning when narrow + oncoming car nearby
        gs.pullInWarning = false;
        if (gs.isNarrow) {
          for (const car of gs.oncomingCars) {
            const dist = car.z - gs.position;
            if (dist > 0 && dist < 100) {
              gs.pullInWarning = true;
              break;
            }
          }
        }

        // Spawn obstacles (only on player's half for narrow roads)
        gs.lastObstSpawn++;
        if (gs.lastObstSpawn > gs.obstFreq) {
          const t = OBS_TYPES[Math.floor(Math.random() * OBS_TYPES.length)];
          const laneRange = roadNarrow < 0.7 ? 0.5 : 1.4;
          gs.obstacles.push({
            type: t, z: gs.position + 300 + Math.random() * 100,
            x: (Math.random() - 0.5) * laneRange, wobble: Math.random() * 6.28,
            dodged: false, nearMissed: false,
          });
          gs.lastObstSpawn = 0;
          if (gs.diffLevel > 3 && Math.random() < 0.3) {
            const t2 = OBS_TYPES[Math.floor(Math.random() * OBS_TYPES.length)];
            gs.obstacles.push({
              type: t2, z: gs.position + 320 + Math.random() * 80,
              x: (Math.random() - 0.5) * laneRange, wobble: Math.random() * 6.28,
              dodged: false, nearMissed: false,
            });
          }
        }

        // Spawn oncoming - ONLY on narrow roads (the Donegal boreen experience!)
        // Ireland drives on the LEFT — oncoming cars come on the RIGHT side
        gs.lastCarSpawn++;
        if (gs.isNarrow && gs.lastCarSpawn > 160 && Math.abs(seg?.curve || 0) < 0.5) {
          const carX = 0.1 + Math.random() * 0.2; // right side of road (oncoming on right in Ireland)
          gs.oncomingCars.push({
            z: gs.position + 350, x: carX,
            speed: 0.3 + Math.random() * 0.2, // very slow
            isNarrowCar: true,
          });
          gs.lastCarSpawn = 0;
        }

        // Update obstacles
        for (const obs of gs.obstacles) {
          if (obs.type.id === 'cow' || obs.type.id === 'sheep') {
            obs.wobble += 0.03;
            obs.x += Math.sin(obs.wobble) * obs.type.moveSpeed * 0.05;
          }
          if (obs.type.id === 'bus') obs.z += 0.5;
        }

        // Update oncoming
        for (const c of gs.oncomingCars) c.z -= c.speed + gs.speed;

        // Drunk mode update
        if (gs.drunkTimer > 0) {
          gs.drunkTimer--;
          if (gs.drunkTimer <= 0) {
            gs.drunkLevel = Math.max(0, gs.drunkLevel - 1);
            if (gs.drunkLevel > 0) gs.drunkTimer = 300; // keep decaying
          }
          // Drunk steering drift — subtle, only at high levels
          if (gs.drunkLevel >= 3) {
            gs.playerX += Math.sin(gs.frameCount * 0.03) * (gs.drunkLevel - 2) * 0.0015;
          }
        }

        // Collisions — screen-space pixel overlap for precision
        // Player car screen rect (must match render code exactly)
        const pCarW = 80;
        const pCarH = 110;
        const pCarScreenX = W/2 - pCarW/2 + gs.playerX * W * 0.15;
        const pCarScreenY = H - pCarH - 15;
        // Player screen hitbox (slightly inset from visual for fairness)
        const pHitL = pCarScreenX + pCarW * 0.1;
        const pHitR = pCarScreenX + pCarW * 0.9;
        const pHitT = pCarScreenY + pCarH * 0.1;
        const pHitB = pCarScreenY + pCarH * 0.85;

        if (gs.invincible > 0) gs.invincible--;
        for (let i = gs.obstacles.length - 1; i >= 0; i--) {
          const obs = gs.obstacles[i];
          const relZ = obs.z - gs.position;
          if (relZ < -3 && !obs.dodged) {
            obs.dodged = true;
            gs.score += obs.type.points * gs.combo;
          }

          // Compute where this obstacle is on screen right now
          // (mirrors the render code exactly)
          if (relZ > 0 && relZ < 15) {
            const obsSegN = Math.floor(obs.z) % TOTAL_SEGMENTS;
            const obsProjScale = camH / relZ;
            const obsRoadW = obsProjScale * 7 * (ROAD_SEGMENTS[obsSegN] ? ROAD_SEGMENTS[obsSegN].narrow : 1);
            const obsScreenY = horizon + roadHeight * (1 / relZ) * (numLines / 4.5);
            // obs screen X uses same formula as render
            const obsScreenCenterX = W/2 + obs.x * obsRoadW * 0.5;

            // Obstacle sprite size (matches render)
            let ow, oh;
            if (obs.type.id === 'bus') { ow = obsProjScale * 3; oh = obsProjScale * 1.7; }
            else if (obs.type.id === 'cow') { ow = obsProjScale * 1.8; oh = obsProjScale * 1.3; }
            else if (obs.type.id === 'sheep') { ow = obsProjScale * 1.2; oh = obsProjScale * 1; }
            else { ow = obsProjScale * 1.2; oh = obsProjScale * 1.8; }

            const obsL = obsScreenCenterX - ow/2;
            const obsR = obsScreenCenterX + ow/2;
            const obsT = obsScreenY - oh;
            const obsB = obsScreenY;

            // Pixel-perfect AABB overlap check
            const xOverlap = pHitR > obsL && pHitL < obsR;
            const yOverlap = pHitB > obsT && pHitT < obsB;

            if (xOverlap && yOverlap && gs.invincible <= 0) {
              // BUCKFAST: special - speed boost + drunk!
              if (obs.type.id === 'buckfast') {
                gs.drunkLevel = Math.min(5, gs.drunkLevel + 1);
                gs.drunkTimer = 400 + gs.drunkLevel * 100;
                gs.speed = Math.min(gs.maxSpeed * 1.5, gs.speed + 2);
                gs.score += 100 * gs.combo;
                gs.combo = Math.min(10, gs.combo + 1);
                gs.comboTimer = 200;
                gs.flashMsg = gs.drunkLevel >= 4 ? 'BUCKFAST! YER LANGERS!' :
                              gs.drunkLevel >= 2 ? 'BUCKFAST! FEELIN IT NOW!' : 'BUCKFAST! SPEED BOOST!';
                gs.flashTimer = 60;
                gs.shake = 3;
                gs.obstacles.splice(i, 1);
                continue;
              }
              gs.lives--;
              gs.invincible = 90;
              gs.speed *= 0.3;
              gs.combo = 1;
              gs.shake = 8;
              gs.flashMsg = `HIT ${obs.type.name}!`;
              gs.flashTimer = 50;
              if (gs.lives <= 0) {
                gs.gameOver = true;
                gs.running = false;
                gs.flashMsg = 'GAME OVER';
                gs.flashTimer = 999;
              }
              gs.obstacles.splice(i, 1);
              continue;
            }

            // Near miss — screen-space: slightly wider than collision box
            const nearMargin = ow * 0.4;
            const nearL = obsL - nearMargin;
            const nearR = obsR + nearMargin;
            const nearXOverlap = pHitR > nearL && pHitL < nearR;
            if (nearXOverlap && yOverlap && !xOverlap && !obs.nearMissed) {
              obs.nearMissed = true;
              gs.score += 30 * gs.combo;
              gs.combo = Math.min(8, gs.combo + 1);
              gs.comboTimer = 200;
              gs.nearMissMsg = `NEAR MISS! +${30 * gs.combo}`;
              gs.nearMissTimer = 50;
            }
          } // end if relZ 0..15

          if (relZ < -40) { gs.obstacles.splice(i, 1); }
        }
        // Oncoming car collisions — screen-space (only on narrow roads)
        for (let i = gs.oncomingCars.length - 1; i >= 0; i--) {
          const car = gs.oncomingCars[i];
          const relZ = car.z - gs.position;
          if (relZ > 0.5 && relZ < 15) {
            const cSegN = Math.floor(car.z) % TOTAL_SEGMENTS;
            const cProj = camH / relZ;
            const cRoadW = cProj * 7 * (ROAD_SEGMENTS[cSegN] ? ROAD_SEGMENTS[cSegN].narrow : 1);
            const cScreenY = horizon + roadHeight * (1 / relZ) * (numLines / 4.5);
            const cScreenX = W/2 + car.x * cRoadW * 0.5;
            const cw = cProj * 1.3;
            const ch = cProj * 1.8;
            const cL = cScreenX - cw/2;
            const cR = cScreenX + cw/2;
            const cT = cScreenY - ch;
            const cB = cScreenY;

            const xHit = pHitR > cL && pHitL < cR;
            const yHit = pHitB > cT && pHitT < cB;

            if (xHit && yHit && gs.invincible <= 0) {
              gs.lives--;
              gs.invincible = 90;
              gs.speed = 0;
              gs.combo = 1;
              gs.shake = 8;
              gs.flashMsg = 'HEAD ON! PULL IN NEXT TIME!';
              gs.flashTimer = 70;
              if (gs.lives <= 0) {
                gs.gameOver = true;
                gs.running = false;
                gs.flashMsg = 'GAME OVER';
                gs.flashTimer = 999;
              }
              gs.oncomingCars.splice(i, 1);
              continue;
            }
            // Near miss
            const nearM = cw * 0.4;
            const nxHit = pHitR > (cL - nearM) && pHitL < (cR + nearM);
            if (nxHit && yHit && !xHit && !car.nearMissed) {
              car.nearMissed = true;
              gs.score += 75 * gs.combo;
              gs.combo = Math.min(10, gs.combo + 1);
              gs.comboTimer = 240;
              gs.nearMissMsg = `TIGHT SQUEEZE! +${75 * gs.combo}`;
              gs.nearMissTimer = 60;
            }
          }
        }
        gs.oncomingCars = gs.oncomingCars.filter(c => (c.z - gs.position) > -15);

        if (gs.comboTimer > 0) { gs.comboTimer--; if (gs.comboTimer <= 0) gs.combo = 1; }
        if (gs.flashTimer > 0) gs.flashTimer--;
        if (gs.nearMissTimer > 0) gs.nearMissTimer--;
        if (gs.shake > 0) gs.shake--;

        if (gs.frameCount % 8 === 0 && gs.speed > 0) gs.score += Math.floor(gs.speed);
      }

      // ====== RENDER ======
      const sx = gs.shake > 0 ? (Math.random()-0.5)*gs.shake : 0;
      const sy = gs.shake > 0 ? (Math.random()-0.5)*gs.shake : 0;
      ctx.save();
      ctx.translate(sx, sy);

      // Sky - dark moody Donegal dusk (matching retro gritty aesthetic)
      const skyG = ctx.createLinearGradient(0, 0, 0, H * 0.42);
      skyG.addColorStop(0, '#1a2a35');   // deep dark blue-black
      skyG.addColorStop(0.3, '#2a3a45');
      skyG.addColorStop(0.6, '#354a55');
      skyG.addColorStop(1, '#3a5560');   // dark teal at horizon
      ctx.fillStyle = skyG;
      ctx.fillRect(0, 0, W, H * 0.45);

      // Rain effect (heavier, moodier)
      ctx.strokeStyle = 'rgba(120,140,160,0.12)';
      ctx.lineWidth = 1;
      for (let r = 0; r < 25; r++) {
        const rx = ((r * 97 + gs.frameCount * 4) % W);
        const ry = ((r * 53 + gs.frameCount * 7) % (H * 0.45));
        ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - 3, ry + 12); ctx.stroke();
      }

      // Dark brooding clouds
      ctx.fillStyle = 'rgba(30,40,50,0.6)';
      for (let i = 0; i < 8; i++) {
        const cx = ((i * 183 + gs.position * 0.06) % (W + 300)) - 150;
        const cy = 10 + i * 20;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 100 + i*14, 25 + i*4, 0, 0, Math.PI*2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(cx + 55, cy - 5, 60, 18, 0, 0, Math.PI*2);
        ctx.fill();
      }

      // Atlantic Ocean on left side — dark moody water
      const oceanY = H * 0.36;
      ctx.fillStyle = '#1a3040';
      ctx.fillRect(0, oceanY, W * 0.3, H * 0.06);
      // Dark waves
      ctx.strokeStyle = '#2a4a5a';
      ctx.lineWidth = 1;
      for (let wv = 0; wv < 5; wv++) {
        const wy = oceanY + 2 + wv * 4;
        ctx.beginPath();
        for (let wx = 0; wx < W * 0.3; wx += 4) {
          ctx.lineTo(wx, wy + Math.sin(wx * 0.05 + gs.frameCount * 0.03 + wv) * 2);
        }
        ctx.stroke();
      }

      // Mountains - dark silhouettes (Derryveagh / Blue Stacks)
      const mtnY = H * 0.40;
      ctx.fillStyle = '#1a2a1a';
      ctx.beginPath();
      ctx.moveTo(0, mtnY + 8);
      for (let mx = 0; mx <= W; mx += 3) {
        const mh = Math.sin(mx*0.003+1)*55 + Math.sin(mx*0.007+3)*30 + Math.sin(mx*0.015)*15;
        ctx.lineTo(mx, mtnY - mh - 20);
      }
      ctx.lineTo(W, mtnY + 8);
      ctx.closePath();
      ctx.fill();

      // Mist on mountains - darker
      ctx.fillStyle = 'rgba(40,55,50,0.35)';
      ctx.beginPath();
      ctx.moveTo(0, mtnY - 20);
      for (let mx = 0; mx <= W; mx += 5) {
        ctx.lineTo(mx, mtnY - 20 + Math.sin(mx*0.008 + gs.frameCount*0.005)*8);
      }
      ctx.lineTo(W, mtnY + 5);
      ctx.lineTo(0, mtnY + 5);
      ctx.closePath();
      ctx.fill();

      // Errigal - dark silhouette
      const eX = W*0.4 + ((gs.position*0.012) % 60) - 30;
      ctx.fillStyle = '#253525';
      ctx.beginPath();
      ctx.moveTo(eX, mtnY - 100);
      ctx.lineTo(eX - 65, mtnY + 5);
      ctx.lineTo(eX + 65, mtnY + 5);
      ctx.closePath();
      ctx.fill();
      // Faint white cap
      ctx.fillStyle = '#556a60';
      ctx.beginPath();
      ctx.moveTo(eX, mtnY - 100);
      ctx.lineTo(eX - 22, mtnY - 65);
      ctx.lineTo(eX + 22, mtnY - 65);
      ctx.closePath();
      ctx.fill();

      // Slieve League on right - dark
      const slX = W*0.78;
      ctx.fillStyle = '#1a3a1a';
      ctx.beginPath();
      ctx.moveTo(slX - 80, mtnY + 5);
      ctx.lineTo(slX, mtnY - 70);
      ctx.lineTo(slX + 90, mtnY + 5);
      ctx.closePath();
      ctx.fill();

      // Dense dark treeline/hedgerow (like the image)
      ctx.fillStyle = '#1a3518';
      ctx.beginPath();
      ctx.moveTo(0, mtnY + 15);
      for (let mx = 0; mx <= W; mx += 3) {
        const mh = Math.sin(mx*0.005 + gs.position*0.0008)*18 + Math.sin(mx*0.013)*8;
        ctx.lineTo(mx, mtnY - mh + 18);
      }
      ctx.lineTo(W, mtnY + 15);
      ctx.closePath();
      ctx.fill();

      // Dense tree silhouettes on top of treeline
      ctx.fillStyle = '#0d2a0d';
      for (let tx = 0; tx < W; tx += 18) {
        const th = 12 + Math.sin(tx * 0.04 + gs.position * 0.001) * 6;
        const treeY = mtnY + 5 + Math.sin(tx * 0.005) * 3;
        ctx.beginPath();
        ctx.arc(tx, treeY, th, Math.PI, 0);
        ctx.fill();
      }

      // Darker heather patches
      ctx.fillStyle = 'rgba(60,40,70,0.3)';
      for (let hx = 0; hx < W; hx += 40) {
        const hy = mtnY + 8 + Math.sin(hx * 0.02) * 5;
        ctx.fillRect(hx, hy, 25, 4);
      }

      // Dark bog
      ctx.fillStyle = 'rgba(40,30,15,0.25)';
      for (let bx = 20; bx < W; bx += 60) {
        const by = mtnY + 10 + Math.sin(bx * 0.03 + 1) * 3;
        ctx.fillRect(bx, by, 35, 3);
      }

      // ====== ROAD ======
      let cCurve = 0;

      // Build scanlines
      const lines = [];
      for (let n = 0; n < numLines; n++) {
        const segN = (Math.floor(gs.position) + n) % TOTAL_SEGMENTS;
        const s = ROAD_SEGMENTS[segN] || { curve: 0 };
        cCurve += s.curve;

        // z = distance ahead; screenY maps z to screen via perspective
        const z = n + 1;
        const projScale = camH / z; // bigger when closer
        const screenY = horizon + roadHeight * (1 / z) * (numLines / 4.5);
        const screenX = W/2 + cCurve * projScale * 0.6 - gs.playerX * projScale * 4;
        const segNarrow = ROAD_SEGMENTS[segN] ? ROAD_SEGMENTS[segN].narrow : 1;
        const roadW = projScale * 7 * segNarrow;

        if (screenY < horizon) continue;
        if (screenY > H + 20) continue;

        lines.push({ n, segN, screenX, screenY, projScale, roadW, z });
      }

      // Sort by screenY ascending (top first = far first)
      lines.sort((a, b) => a.screenY - b.screenY);

      // Draw back to front
      for (let i = 0; i < lines.length; i++) {
        const L = lines[i];
        const nextL = (i + 1 < lines.length) ? lines[i + 1] : null;
        const { screenX, screenY, projScale, roadW, segN } = L;

        const stripH = nextL ? Math.max(1, nextL.screenY - screenY) : (H - screenY);

        // Grass - dark moody green (like the image)
        ctx.fillStyle = ((segN + (gs.position*0.12|0)) % 6) < 3 ? '#1a3a12' : '#163214';
        ctx.fillRect(0, screenY, W, stripH + 1);

        // Road - very dark tarmac
        ctx.fillStyle = (segN % 8) < 4 ? '#2a2a2a' : '#252525';
        ctx.fillRect(screenX - roadW/2, screenY, roadW, stripH + 1);

        // Center dashes
        if ((segN % 10) < 5) {
          ctx.fillStyle = '#ffcc00';
          const lw = Math.max(1, projScale * 0.08);
          ctx.fillRect(screenX - lw/2, screenY, lw, stripH + 1);
        }

        // Edge lines
        const ew = Math.max(1, projScale * 0.06);
        ctx.fillStyle = '#fff';
        ctx.fillRect(screenX - roadW/2, screenY, ew, stripH + 1);
        ctx.fillRect(screenX + roadW/2 - ew, screenY, ew, stripH + 1);

        // Rumble strips
        const rw = Math.max(1, projScale * 0.15);
        ctx.fillStyle = (segN % 6) < 3 ? '#cc2222' : '#fff';
        ctx.fillRect(screenX - roadW/2 - rw, screenY, rw, stripH + 1);
        ctx.fillRect(screenX + roadW/2, screenY, rw, stripH + 1);

        // Stone walls
        if ((segN % 250) < 120 && projScale > 3) {
          const wh = projScale * 0.3;
          const ww = projScale * 1;
          drawStoneWall(ctx, screenX - roadW/2 - rw - ww - projScale*0.2, screenY - wh, ww, wh);
          drawStoneWall(ctx, screenX + roadW/2 + rw + projScale*0.2, screenY - wh, ww, wh);
        }

        // Trees
        if ((segN % 35) < 2 && projScale > 3) {
          const tw = projScale * 0.8;
          const th = projScale * 1.3;
          drawTree(ctx, screenX - roadW/2 - tw - projScale*1.2, screenY - th, tw, th);
          if ((segN % 70) < 2) {
            drawTree(ctx, screenX + roadW/2 + projScale*0.6, screenY - th, tw, th);
          }
        }

        // Landmarks from pre-built map - LARGE and visible
        const lms = LANDMARK_MAP.get(segN);
        if (lms && projScale > 2.5) {
          for (const lm of lms) {
            const bw = projScale * 4;    // much bigger buildings
            const bh = projScale * 3;
            if (bw < 15) continue;
            const bx = lm.side < 0
              ? screenX - roadW/2 - bw - projScale*0.5
              : screenX + roadW/2 + projScale*0.5;
            if (lm.type === 'pub') drawPub(ctx, bx, screenY - bh, bw, bh, lm.name, lm.color);
            else drawShop(ctx, bx, screenY - bh, bw, bh, lm.name, lm.color);
          }
        }

        // Obstacles - BIGGER so they're recognizable
        for (const obs of gs.obstacles) {
          const relZ = obs.z - gs.position;
          if (Math.abs(relZ - L.n) < 1.5 && relZ > 0 && projScale > 1.5) {
            let ow, oh;
            if (obs.type.id === 'bus') { ow = projScale * 3; oh = projScale * 1.7; }
            else if (obs.type.id === 'cow') { ow = projScale * 1.8; oh = projScale * 1.3; }
            else if (obs.type.id === 'sheep') { ow = projScale * 1.2; oh = projScale * 1; }
            else { ow = projScale * 1.2; oh = projScale * 1.8; }
            if (ow < 5) continue;
            const ox = screenX + obs.x * roadW * 0.5 - ow/2;
            const oy = screenY - oh;
            const drawFn = obs.type.id === 'cow' ? drawCow :
                           obs.type.id === 'bus' ? drawBus :
                           obs.type.id === 'buckfast' ? drawBuckfast :
                           obs.type.id === 'baileys' ? drawBaileys : drawSheep;
            drawFn(ctx, ox, oy, ow, oh);
          }
        }

        // Oncoming cars - realistic facing-toward-you car
        for (const car of gs.oncomingCars) {
          const relZ = car.z - gs.position;
          if (Math.abs(relZ - L.n) < 1.5 && relZ > 0 && projScale > 1.5) {
            const cw = projScale * 1.3;
            const ch = projScale * 1.8;
            if (cw < 4) continue;
            const cx2 = screenX + car.x * roadW * 0.5 - cw/2;
            const cy2 = screenY - ch;
            // Vary car colors per car instance
            const carColors = ['#cc3333','#336699','#888888','#444444','#996633','#557755'];
            const cIdx = Math.abs(Math.floor(car.z * 7)) % carColors.length;
            const mainColor = carColors[cIdx];
            // Body
            ctx.fillStyle = mainColor;
            ctx.fillRect(cx2 + cw*0.08, cy2 + ch*0.28, cw*0.84, ch*0.6);
            // Roof / cabin
            ctx.fillStyle = mainColor;
            ctx.fillRect(cx2 + cw*0.15, cy2 + ch*0.08, cw*0.7, ch*0.22);
            // Windshield (facing us)
            ctx.fillStyle = '#aaddff';
            ctx.fillRect(cx2 + cw*0.18, cy2 + ch*0.12, cw*0.64, ch*0.16);
            // Windshield glare
            ctx.fillStyle = 'rgba(200,230,255,0.4)';
            ctx.fillRect(cx2 + cw*0.18, cy2 + ch*0.12, cw*0.3, ch*0.08);
            // Bonnet/hood
            ctx.fillStyle = mainColor;
            ctx.fillRect(cx2 + cw*0.1, cy2 + ch*0.28, cw*0.8, ch*0.15);
            // Headlights (on, facing us)
            ctx.fillStyle = '#ffff88';
            ctx.fillRect(cx2 + cw*0.1, cy2 + ch*0.32, cw*0.15, ch*0.08);
            ctx.fillRect(cx2 + cw*0.75, cy2 + ch*0.32, cw*0.15, ch*0.08);
            // Headlight glow
            ctx.fillStyle = 'rgba(255,255,150,0.2)';
            ctx.beginPath();
            ctx.arc(cx2 + cw*0.175, cy2 + ch*0.36, cw*0.12, 0, Math.PI*2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(cx2 + cw*0.825, cy2 + ch*0.36, cw*0.12, 0, Math.PI*2);
            ctx.fill();
            // Grille
            ctx.fillStyle = '#222';
            ctx.fillRect(cx2 + cw*0.28, cy2 + ch*0.33, cw*0.44, ch*0.07);
            // Number plate
            ctx.fillStyle = '#fff';
            ctx.fillRect(cx2 + cw*0.32, cy2 + ch*0.41, cw*0.36, ch*0.05);
            // Bumper
            ctx.fillStyle = '#333';
            ctx.fillRect(cx2 + cw*0.06, cy2 + ch*0.44, cw*0.88, ch*0.04);
            // Wheels
            ctx.fillStyle = '#111';
            ctx.fillRect(cx2, cy2 + ch*0.5, cw*0.12, ch*0.22);
            ctx.fillRect(cx2 + cw*0.88, cy2 + ch*0.5, cw*0.12, ch*0.22);
            // Hubcaps
            ctx.fillStyle = '#666';
            ctx.fillRect(cx2 + cw*0.02, cy2 + ch*0.55, cw*0.08, ch*0.1);
            ctx.fillRect(cx2 + cw*0.9, cy2 + ch*0.55, cw*0.08, ch*0.1);
            // Side mirrors
            ctx.fillStyle = mainColor;
            ctx.fillRect(cx2 - cw*0.03, cy2 + ch*0.2, cw*0.08, ch*0.06);
            ctx.fillRect(cx2 + cw*0.95, cy2 + ch*0.2, cw*0.08, ch*0.06);
          }
        }
      }

      // Player car
      const carW = 80;
      const carH = 110;
      const carX = W/2 - carW/2 + gs.playerX * W * 0.15;
      const carY = H - carH - 15;
      drawPlayerCar(ctx, carX, carY, carW, carH);

      // Speed lines
      if (gs.speed > 3.5) {
        ctx.strokeStyle = `rgba(255,255,255,${(gs.speed-3.5)*0.12})`;
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
          const lx = carX - 40 + Math.random()*(carW+80);
          const ly = carY + Math.random()*carH;
          ctx.beginPath(); ctx.moveTo(lx, ly);
          ctx.lineTo(lx, ly + 12 + gs.speed*3); ctx.stroke();
        }
      }

      // ====== HUD ======
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.fillRect(0, 0, W, 52);

      ctx.fillStyle = '#ffcc00';
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`SCORE: ${gs.score}`, 15, 22);

      ctx.fillStyle = '#88ff88';
      ctx.font = 'bold 16px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(gs.currentLocation || 'Co. Donegal', W/2, 18);

      const kmh = Math.floor(gs.speed * 20);
      ctx.fillStyle = kmh > gs.speedZone ? '#ff4444' : '#fff';
      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${kmh} km/h`, W - 80, 22);

      // Speed sign
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(W - 35, 25, 18, 0, Math.PI*2);
      ctx.fill();
      ctx.strokeStyle = '#cc0000';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = '#000';
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(gs.speedZone, W - 35, 30);

      // Lives
      ctx.fillStyle = '#ff4444';
      ctx.font = '18px monospace';
      ctx.textAlign = 'left';
      for (let i = 0; i < gs.lives; i++) ctx.fillText('\u2665', 15 + i*22, 44);

      // Combo
      if (gs.combo > 1) {
        ctx.fillStyle = '#ffaa00';
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`x${gs.combo} COMBO`, 90, 44);
      }

      // Level & distance
      ctx.fillStyle = '#aaaaff';
      ctx.font = '13px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`Lvl ${gs.diffLevel}`, W - 15, 46);
      ctx.fillStyle = '#aaddff';
      ctx.font = '13px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${(gs.distanceTraveled*0.01).toFixed(1)} km`, W/2, 38);

      // Next town indicator
      if (!gs.inTown) {
        let nextTown = null;
        let nextDist = Infinity;
        for (const loc of LOCATIONS) {
          const d = loc.distance - gs.position;
          if (d > 0 && d < nextDist) { nextDist = d; nextTown = loc.name; }
        }
        if (nextTown) {
          ctx.fillStyle = 'rgba(0,0,0,0.5)';
          ctx.fillRect(0, 52, W, 18);
          ctx.fillStyle = '#aaddaa';
          ctx.font = '12px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`Next: ${nextTown} - ${(nextDist*0.01).toFixed(1)}km`, W/2, 64);
        }
      }

      // Landmark banner — shows once per town for 120 frames then gone
      if (gs.inTown && gs.nearbyLandmarks.length > 0) {
        // Track which town we entered so we only show banner once per town
        const townKey = gs.currentLocation;
        if (gs._lastBannerTown !== townKey) {
          gs._lastBannerTown = townKey;
          gs._bannerFramesLeft = 120; // ~2 seconds
        }
        if (gs._bannerFramesLeft > 0) {
          gs._bannerFramesLeft--;
          const alpha = Math.min(1, gs._bannerFramesLeft / 30); // fade out in last 0.5s
          const banY = 54;
          const maxShow = Math.min(gs.nearbyLandmarks.length, 4);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = 'rgba(0,0,0,0.55)';
          ctx.fillRect(0, banY, W, maxShow * 20 + 8);
          ctx.font = '13px monospace';
          ctx.textAlign = 'center';
          for (let li = 0; li < maxShow; li++) {
            const lm = gs.nearbyLandmarks[li];
            ctx.fillStyle = lm.type === 'pub' ? '#ffdd88' : '#88ddff';
            const icon = lm.type === 'pub' ? '\uD83C\uDF7A' : '\uD83C\uDFEA';
            ctx.fillText(`${icon} ${lm.name}`, W/2, banY + 17 + li*20);
          }
          ctx.globalAlpha = 1;
        }
      }

      // NARROW ROAD warning
      if (gs.isNarrow && gs.started && !gs.gameOver) {
        // Narrow road indicator
        ctx.fillStyle = 'rgba(255,165,0,0.15)';
        ctx.fillRect(0, H*0.4, W, H*0.1);

        ctx.fillStyle = '#ffaa00';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('\u26a0 NARROW ROAD - SINGLE TRACK', W/2, H*0.47);

        // Hedgerow/ditch visual on edges
        ctx.fillStyle = '#2a5a1a';
        ctx.fillRect(0, H*0.75, W*0.08, H*0.25);
        ctx.fillRect(W*0.92, H*0.75, W*0.08, H*0.25);
      }

      // PULL IN! warning - flashing
      if (gs.pullInWarning && gs.started && !gs.gameOver) {
        const flash = gs.frameCount % 20 < 10;
        ctx.fillStyle = flash ? 'rgba(255,0,0,0.25)' : 'rgba(255,100,0,0.15)';
        ctx.fillRect(0, H*0.28, W, H*0.08);
        ctx.fillStyle = flash ? '#ff2222' : '#ff8800';
        ctx.font = 'bold 22px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('\u26a0 PULL IN! CAR COMING! (Hold \u2193 to reverse)', W/2, H*0.34);
      }

      // Reverse indicator
      if (gs.speed < 0) {
        ctx.fillStyle = '#ffaa00';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('REVERSING', W/2, H*0.88);
      }

      // Flash
      if (gs.flashTimer > 0) {
        ctx.fillStyle = gs.gameOver ? '#ff2222' : '#ff6644';
        ctx.font = `bold ${gs.gameOver ? 36 : 22}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(gs.flashMsg, W/2, H*0.35);
      }
      if (gs.nearMissTimer > 0) {
        ctx.fillStyle = '#44ff44';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(gs.nearMissMsg, W/2, H*0.42);
      }
      // Invincibility flash
      if (gs.invincible > 0 && gs.invincible % 8 < 4) {
        ctx.fillStyle = 'rgba(255,0,0,0.12)';
        ctx.fillRect(0, 0, W, H);
      }

      // ====== START SCREEN ======
      if (!gs.started) {
        ctx.fillStyle = 'rgba(10,15,10,0.92)';
        ctx.fillRect(0, 0, W, H);

        // Retro glow title
        ctx.fillStyle = '#c8a832';
        ctx.font = 'bold 44px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('DONEGAL RALLY', W/2, H*0.13);

        ctx.fillStyle = '#5a8a4a';
        ctx.font = '20px monospace';
        ctx.fillText('The Wild Atlantic Way', W/2, H*0.19);

        ctx.fillStyle = '#6a8a9a';
        ctx.font = '15px monospace';
        ctx.fillText('Letterkenny \u2192 Bundoran via the N56 & N15', W/2, H*0.24);

        // Subtitle quote
        ctx.fillStyle = '#887744';
        ctx.font = 'italic 13px monospace';
        ctx.fillText('"If the crossroad\'s empty, give her plenty"', W/2, H*0.275);

        // Controls
        ctx.fillStyle = '#fff';
        ctx.font = '13px monospace';
        const lines2 = [
          'AUTO-DRIVE \u2022 \u2190/A Left  \u2192/D Right  \u2193/S Brake',
          '',
          'Dodge: Cows, Sheep, McGinley Bus & Baileys',
          'BUCKFAST = Speed Boost + Drunk Mode!',
          'Near misses = bonus + combo multiplier!',
          'NARROW ROADS: Pull in to let cars pass!',
          'Drive on the LEFT - this is Ireland!',
        ];
        lines2.forEach((l, i) => ctx.fillText(l, W/2, H*0.30 + i*20));

        // Route preview - pubs column and shops column
        ctx.fillStyle = '#ffdd88';
        ctx.font = 'bold 14px monospace';
        ctx.fillText('FAMOUS PUBS:', W*0.3, H*0.48);
        ctx.fillStyle = '#88ddff';
        ctx.fillText('LOCAL SHOPS:', W*0.7, H*0.48);

        const famousPubs = [
          "The Brewery Bar, Letterkenny",
          "The Bridge Bar, Ramelton",
          "Patsy Dan's, Dunfanaghy",
          "Teach Jack, Gortahork",
          "Leo's Tavern, Bunbeg",
          "Hi\u00fada\u00ed Beag's, Gaoth Dobhair",
          "Nancy's Bar, Ardara",
          "The Reel Inn, Donegal Town",
          "The Old Castle Bar, Donegal Town",
          "Kitty Kelly's, Killybegs",
          "Sean \u00d3g's, Ballyshannon",
          "Brennan's Bar, Bundoran",
        ];
        const famousShops = [
          "McGinley's, Letterkenny",
          "An Grian\u00e1n Theatre",
          "Cope Stores, Milford",
          "McNutt's Tweed, Creeslough",
          "Muck & Muffins, Dunfanaghy",
          "Crolly Dolls Factory",
          "Kennedy's of Ardara",
          "Eddie Doherty Tweed",
          "Magee's 1866, Donegal",
          "Simple Simon's, Donegal",
          "Donegal Parian China",
          "Waterworld, Bundoran",
        ];

        ctx.font = '11px monospace';
        famousPubs.forEach((p, i) => {
          ctx.fillStyle = '#ffcc66';
          ctx.fillText(p, W*0.3, H*0.52 + i*16);
        });
        famousShops.forEach((s, i) => {
          ctx.fillStyle = '#88ccee';
          ctx.fillText(s, W*0.7, H*0.52 + i*16);
        });

        ctx.fillStyle = gs.frameCount % 50 < 25 ? '#ffcc00' : '#ff8800';
        ctx.font = 'bold 22px monospace';
        ctx.fillText('PRESS SPACE OR ENTER TO START', W/2, H*0.94);
      }

      // ====== GAME OVER ======
      if (gs.gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.85)';
        ctx.fillRect(0, 0, W, H);

        // Draw a pixel art train (Irish Rail green/grey)
        const trainX = W*0.15;
        const trainY = H*0.08;
        const trainW = W*0.7;
        const trainH = H*0.18;
        // Track
        ctx.fillStyle = '#555';
        ctx.fillRect(trainX - 20, trainY + trainH, trainW + 40, 6);
        ctx.fillStyle = '#888';
        for (let ti = 0; ti < 15; ti++) {
          ctx.fillRect(trainX - 10 + ti * (trainW/14), trainY + trainH + 4, 12, 4);
        }
        // Train body - Irish Rail green
        ctx.fillStyle = '#2a6a3a';
        ctx.fillRect(trainX, trainY + trainH*0.3, trainW*0.7, trainH*0.6);
        // Engine
        ctx.fillStyle = '#1a4a2a';
        ctx.fillRect(trainX + trainW*0.7, trainY + trainH*0.2, trainW*0.3, trainH*0.7);
        // Yellow stripe (Iarnród Éireann)
        ctx.fillStyle = '#ffaa00';
        ctx.fillRect(trainX, trainY + trainH*0.55, trainW, trainH*0.08);
        // Windows
        ctx.fillStyle = '#aaddff';
        for (let tw = 0; tw < 8; tw++) {
          ctx.fillRect(trainX + 15 + tw * (trainW*0.65/8), trainY + trainH*0.35, trainW*0.06, trainH*0.18);
        }
        // Wheels
        ctx.fillStyle = '#333';
        for (let twh = 0; twh < 6; twh++) {
          ctx.beginPath();
          ctx.arc(trainX + 30 + twh * (trainW/6), trainY + trainH, 8, 0, Math.PI*2);
          ctx.fill();
        }
        // "IARNRÓD ÉIREANN" on side
        ctx.fillStyle = '#ffcc00';
        ctx.font = `bold ${Math.max(10, trainW*0.03)|0}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('IARNRÓD ÉIREANN / IRISH RAIL', trainX + trainW*0.35, trainY + trainH*0.52);
        // Big red X over the train
        ctx.strokeStyle = '#ff2222';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(trainX - 10, trainY); ctx.lineTo(trainX + trainW + 10, trainY + trainH + 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(trainX + trainW + 10, trainY); ctx.lineTo(trainX - 10, trainY + trainH + 10);
        ctx.stroke();

        // The joke
        ctx.fillStyle = '#ff4444';
        ctx.font = `bold ${Math.max(28, W*0.035)|0}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', W/2, H*0.35);

        ctx.fillStyle = '#fff';
        ctx.font = `bold ${Math.max(20, W*0.025)|0}px monospace`;
        ctx.fillText('"YOU WILL NEVER GET A TRAIN"', W/2, H*0.42);

        ctx.fillStyle = '#aabbcc';
        ctx.font = `${Math.max(13, W*0.016)|0}px monospace`;
        ctx.fillText('- Every Taoiseach to Donegal, forever', W/2, H*0.47);

        ctx.fillStyle = '#ffaa44';
        ctx.font = `${Math.max(12, W*0.014)|0}px monospace`;
        ctx.fillText('The Donegal railway closed in 1960. Still waiting...', W/2, H*0.52);

        // Score
        ctx.fillStyle = '#ffcc00';
        ctx.font = `bold ${Math.max(22, W*0.025)|0}px monospace`;
        ctx.fillText(`SCORE: ${gs.score}`, W/2, H*0.62);
        ctx.fillStyle = '#aaddff';
        ctx.font = `${Math.max(14, W*0.016)|0}px monospace`;
        ctx.fillText(`Distance: ${(gs.distanceTraveled*0.01).toFixed(1)} km  |  Level: ${gs.diffLevel}`, W/2, H*0.68);
        ctx.fillStyle = '#88ff88';
        ctx.font = `${Math.max(13, W*0.015)|0}px monospace`;
        ctx.fillText(`Last seen near: ${gs.currentLocation}`, W/2, H*0.73);
        ctx.fillText('Sure you could always take the McGinley Bus...', W/2, H*0.78);

        ctx.fillStyle = gs.frameCount % 50 < 25 ? '#ffcc00' : '#ff8800';
        ctx.font = `bold ${Math.max(18, W*0.02)|0}px monospace`;
        ctx.fillText('PRESS R TO RESTART', W/2, H*0.88);
      }

      // Pause
      if (gs.paused && gs.started && !gs.gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 36px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', W/2, H/2);
        ctx.font = '16px monospace';
        ctx.fillText('Press P to resume', W/2, H/2 + 30);
      }

      // DRUNK MODE visual effects (GTA-style)
      if (gs.drunkLevel > 0 && gs.drunkTimer > 0 && gs.started && !gs.gameOver) {
        // Green/amber tint overlay
        const drunkAlpha = Math.min(0.3, gs.drunkLevel * 0.06);
        ctx.fillStyle = `rgba(100,180,50,${drunkAlpha})`;
        ctx.fillRect(0, 0, W, H);

        // Wobbling double vision effect
        if (gs.drunkLevel >= 2) {
          ctx.globalAlpha = 0.12 * gs.drunkLevel;
          ctx.drawImage(canvas,
            Math.sin(gs.frameCount * 0.06) * gs.drunkLevel * 3,
            Math.cos(gs.frameCount * 0.04) * gs.drunkLevel * 2,
            W, H);
          ctx.globalAlpha = 1;
        }

        // Blur/vignette at higher levels
        if (gs.drunkLevel >= 3) {
          const vg = ctx.createRadialGradient(W/2, H/2, W*0.2, W/2, H/2, W*0.7);
          vg.addColorStop(0, 'rgba(0,0,0,0)');
          vg.addColorStop(1, `rgba(0,0,0,${gs.drunkLevel * 0.08})`);
          ctx.fillStyle = vg;
          ctx.fillRect(0, 0, W, H);
        }

        // Drunk meter
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(W - 120, H - 30, 110, 22);
        ctx.fillStyle = gs.drunkLevel >= 4 ? '#ff3333' : gs.drunkLevel >= 2 ? '#ffaa00' : '#88ff44';
        ctx.fillRect(W - 115, H - 26, (gs.drunkLevel / 5) * 100, 14);
        ctx.fillStyle = '#fff';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`BUCKFAST: ${gs.drunkLevel}/5`, W - 65, H - 15);
      }

      ctx.restore();
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div style={{ width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#000', overflow:'hidden' }}>
      <canvas ref={canvasRef} style={{ display:'block', imageRendering:'pixelated', cursor:'none', maxWidth:'100vw', maxHeight:'100vh' }} tabIndex={0} />
    </div>
  );
}

export default Game;
