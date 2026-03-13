import React, { useRef, useEffect, useCallback, useState } from 'react';

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
    { name: "An GrianÃƒÂ¡n Theatre", type: 'shop', color: '#ccbbaa', side: 1 },
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
    { name: "An CrannÃƒÂ³g", type: 'shop', color: '#bbccbb', side: 1 },
  ]},
  { name: "Bloody Foreland", distance: 7000, type: 'scenic', speedLimit: 80, landmarks: [
    { name: "Foreland Heights B&B", type: 'shop', color: '#ccddff', side: 1 },
  ]},
  { name: "Bunbeg", distance: 7600, type: 'village', speedLimit: 50, landmarks: [
    { name: "Leo's Tavern", type: 'pub', color: '#cc4444', side: 1 },
    { name: "Cope Superstore", type: 'shop', color: '#ddddee', side: -1 },
    { name: "Bunbeg House", type: 'pub', color: '#887766', side: 1 },
    { name: "Teach HiÃƒÂºdaÃƒÂ­ Beag", type: 'pub', color: '#775544', side: -1 },
  ]},
  { name: "Gaoth Dobhair", distance: 8200, type: 'town', speedLimit: 50, landmarks: [
    { name: "HiÃƒÂºdaÃƒÂ­ Beag's", type: 'pub', color: '#5a3322', side: -1 },
    { name: "Ionad Cois Locha", type: 'shop', color: '#ccddcc', side: 1 },
    { name: "Teach MhicÃƒÂ­", type: 'pub', color: '#6a4433', side: -1 },
    { name: "Scoil NÃƒÂ¡isiÃƒÂºnta", type: 'shop', color: '#ddccbb', side: 1 },
    { name: "Rann na Feirste", type: 'shop', color: '#aabbaa', side: -1 },
  ]},
  { name: "Anagaire", distance: 8800, type: 'village', speedLimit: 60, landmarks: [
    { name: "Danny Minnies", type: 'pub', color: '#993322', side: 1 },
  ]},
  { name: "Crolly", distance: 9200, type: 'village', speedLimit: 50, landmarks: [
    { name: "LÃƒÂ³istÃƒÂ­n UÃƒÂ­ DhÃƒÂ³naill", type: 'pub', color: '#776655', side: -1 },
    { name: "Crolly Dolls Factory", type: 'shop', color: '#ffccdd', side: 1 },
  ]},
  { name: "Dunglow / An ClochÃƒÂ¡n Liath", distance: 9800, type: 'town', speedLimit: 50, landmarks: [
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
    { name: "Cup & Kettle CafÃƒÂ©", type: 'shop', color: '#ffeedd', side: 1 },
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
    { name: "Ti Linn CafÃƒÂ©", type: 'shop', color: '#ffeedd', side: -1 },
  ]},
  { name: "Ballyshannon", distance: 17400, type: 'town', speedLimit: 50, landmarks: [
    { name: "Sean Ãƒâ€œg's", type: 'pub', color: '#553322', side: -1 },
    { name: "Dicey Reilly's", type: 'pub', color: '#664433', side: 1 },
    { name: "Donegal Parian China", type: 'shop', color: '#eeeeff', side: -1 },
    { name: "Niall MÃƒÂ³r's", type: 'pub', color: '#443322', side: 1 },
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

// Pre-build a lookup: segIdx Ã¢â€ â€™ landmarks to render (avoid scanning all locations each frame)
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
  // MOSTLY STRAIGHT roads with gentle bends Ã¢â‚¬â€ true Donegal N56/N15 feel
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

function wrapRoadDelta(targetZ, playerZ) {
  let d = targetZ - playerZ;
  const half = TOTAL_SEGMENTS / 2;
  if (d > half) d -= TOTAL_SEGMENTS;
  if (d < -half) d += TOTAL_SEGMENTS;
  return d;
}

function hasRoadMarkings(segN) {
  const seg = ROAD_SEGMENTS[segN];
  if (!seg) return true;
  if (seg.narrow < 0.7) return false;
  return (Math.floor(segN / 220) % 5) !== 2;
}

// Obstacle types
const OBS_TYPES = [
  { id: 'cow', name: 'COW', points: 50, moveSpeed: 0.2 },
  { id: 'bus', name: 'McGINLEY BUS', points: 100, moveSpeed: 0 },
  { id: 'buckfast', name: 'BUCKFAST', points: 75, moveSpeed: 0 },
  { id: 'baileys', name: 'BAILEYS', points: 75, moveSpeed: 0 },
  { id: 'sheep', name: 'SHEEP', points: 30, moveSpeed: 0.15 },
];

const RADIO_STATIONS = [
  {
    id: 'country',
    folder: 'country',
    label: 'Country',
    badge: 'CTR',
    accent: '#d7a25b',
    glow: 'rgba(215, 162, 91, 0.28)',
    blurb: 'Back-road singalongs',
  },
  {
    id: 'power hour',
    folder: 'power hour',
    label: 'Power Hour',
    badge: 'PWR',
    accent: '#59d7ff',
    glow: 'rgba(89, 215, 255, 0.3)',
    blurb: 'Donk, trance and late-pub chaos',
  },
];

const RADIO_OFF_STATION = {
  id: 'off',
  folder: '',
  label: 'Radio Off',
  badge: 'OFF',
  accent: '#b7c1ca',
  glow: 'rgba(183, 193, 202, 0.25)',
  blurb: 'Just the Atlantic wind and the tyres',
  tracks: [],
};

const RADIO_DIAL_ORDER = [RADIO_OFF_STATION.id, ...RADIO_STATIONS.map((station) => station.id)];

function toPublicUrl(relativePath) {
  const base = process.env.PUBLIC_URL || '';
  const cleanPath = `${relativePath || ''}`.replace(/^\/+/, '');
  if (!base) return `/${cleanPath}`;
  return `${base.replace(/\/+$/, '')}/${cleanPath}`;
}

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

function buildSignLines(name, maxChars = 14) {
  const words = `${name || ''}`.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];

  const lines = [];
  let current = words[0];

  for (let i = 1; i < words.length; i++) {
    const next = `${current} ${words[i]}`;
    if (next.length <= maxChars || lines.length >= 1) current = next;
    else {
      lines.push(current);
      current = words[i];
    }
  }

  lines.push(current);
  if (lines.length <= 2) return lines;
  return [lines[0], lines.slice(1).join(' ')];
}

function drawSignText(ctx, name, x, y, w, h, fillStyle) {
  const lines = buildSignLines(name, 15);
  if (!lines.length) return;

  const longest = lines.reduce((max, line) => Math.max(max, line.length), 1);
  const fontSize = Math.max(
    7,
    Math.min(
      20,
      Math.floor((w * 1.75) / Math.max(6, longest)),
      Math.floor(h / (lines.length === 1 ? 1.35 : 2.35))
    )
  );

  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = 'rgba(8, 8, 8, 0.82)';
  ctx.lineWidth = Math.max(1, fontSize * 0.18);
  ctx.lineJoin = 'round';
  ctx.font = `bold ${fontSize}px "Trebuchet MS", "Arial Narrow", sans-serif`;

  const totalHeight = lines.length * fontSize + (lines.length - 1) * 2;
  const startY = y + h / 2 - totalHeight / 2 + fontSize * 0.8;

  lines.forEach((line, index) => {
    const textY = startY + index * (fontSize + 2);
    ctx.strokeText(line, x + w / 2, textY);
    ctx.fillText(line, x + w / 2, textY);
  });

  ctx.restore();
}

function drawSeagull(ctx, x, y, size) {
  ctx.save();
  ctx.strokeStyle = 'rgba(228,236,242,0.72)';
  ctx.lineWidth = Math.max(1, size * 0.12);
  ctx.beginPath();
  ctx.arc(x - size * 0.44, y, size * 0.44, Math.PI, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + size * 0.44, y, size * 0.44, Math.PI, 0);
  ctx.stroke();
  ctx.restore();
}

function drawLighthouse(ctx, x, y, w, h) {
  ctx.save();

  const beam = ctx.createLinearGradient(x + w * 0.62, y + h * 0.18, x + w * 2.4, y - h * 0.05);
  beam.addColorStop(0, 'rgba(255,244,200,0.38)');
  beam.addColorStop(1, 'rgba(255,244,200,0)');
  ctx.fillStyle = beam;
  ctx.beginPath();
  ctx.moveTo(x + w * 0.58, y + h * 0.18);
  ctx.lineTo(x + w * 2.5, y - h * 0.06);
  ctx.lineTo(x + w * 2.45, y + h * 0.12);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#dcd7ca';
  ctx.fillRect(x + w * 0.28, y + h * 0.22, w * 0.34, h * 0.7);
  ctx.fillStyle = '#c7423b';
  ctx.fillRect(x + w * 0.28, y + h * 0.38, w * 0.34, h * 0.11);
  ctx.fillRect(x + w * 0.28, y + h * 0.62, w * 0.34, h * 0.11);
  ctx.fillStyle = '#1f2e3f';
  ctx.fillRect(x + w * 0.22, y + h * 0.15, w * 0.46, h * 0.1);
  ctx.fillRect(x + w * 0.36, y + h * 0.07, w * 0.18, h * 0.08);
  ctx.fillStyle = '#9ad9ff';
  ctx.fillRect(x + w * 0.33, y + h * 0.17, w * 0.24, h * 0.06);
  ctx.fillStyle = '#1a2319';
  ctx.fillRect(x + w * 0.12, y + h * 0.9, w * 0.64, h * 0.08);

  ctx.restore();
}

function drawPostcard(ctx, x, y, w, h, theme) {
  ctx.save();

  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.fillRect(x - 5, y - 5, w + 10, h + 10);
  ctx.fillStyle = '#efe1bf';
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = '#f8f0da';
  ctx.fillRect(x + 6, y + 6, w - 12, h - 12);

  if (theme === 'atlantic') {
    const sky = ctx.createLinearGradient(0, y + 8, 0, y + h * 0.52);
    sky.addColorStop(0, '#5f8192');
    sky.addColorStop(1, '#bcd2d7');
    ctx.fillStyle = sky;
    ctx.fillRect(x + 8, y + 8, w - 16, h - 16);
    ctx.fillStyle = '#234a64';
    ctx.fillRect(x + 8, y + h * 0.54, w - 16, h * 0.23);
    ctx.fillStyle = '#284020';
    ctx.beginPath();
    ctx.moveTo(x + 8, y + h * 0.62);
    ctx.lineTo(x + w * 0.28, y + h * 0.45);
    ctx.lineTo(x + w * 0.46, y + h * 0.64);
    ctx.lineTo(x + w - 8, y + h * 0.56);
    ctx.lineTo(x + w - 8, y + h - 8);
    ctx.lineTo(x + 8, y + h - 8);
    ctx.closePath();
    ctx.fill();
    drawLighthouse(ctx, x + w * 0.16, y + h * 0.26, w * 0.18, h * 0.42);
    ctx.fillStyle = '#14242d';
    ctx.fillRect(x + w * 0.56, y + h * 0.62, w * 0.16, h * 0.03);
    ctx.beginPath();
    ctx.moveTo(x + w * 0.6, y + h * 0.62);
    ctx.lineTo(x + w * 0.67, y + h * 0.54);
    ctx.lineTo(x + w * 0.7, y + h * 0.62);
    ctx.closePath();
    ctx.fill();
  } else if (theme === 'pub') {
    const wall = ctx.createLinearGradient(0, y + 8, 0, y + h - 8);
    wall.addColorStop(0, '#5a3424');
    wall.addColorStop(1, '#2e1a12');
    ctx.fillStyle = wall;
    ctx.fillRect(x + 8, y + 8, w - 16, h - 16);
    ctx.fillStyle = '#191919';
    ctx.fillRect(x + w * 0.15, y + h * 0.22, w * 0.7, h * 0.16);
    drawSignText(ctx, "DONEGAL PUB", x + w * 0.15, y + h * 0.22, w * 0.7, h * 0.16, '#f2d78e');
    ctx.fillStyle = '#ffdb70';
    ctx.fillRect(x + w * 0.18, y + h * 0.42, w * 0.18, h * 0.19);
    ctx.fillRect(x + w * 0.64, y + h * 0.42, w * 0.18, h * 0.19);
    ctx.fillStyle = '#2a1a12';
    ctx.fillRect(x + w * 0.42, y + h * 0.44, w * 0.16, h * 0.4);
    ctx.fillStyle = '#f7d887';
    ctx.fillRect(x + w * 0.66, y + h * 0.5, w * 0.08, h * 0.18);
    ctx.fillStyle = '#fff5de';
    ctx.fillRect(x + w * 0.69, y + h * 0.44, w * 0.1, h * 0.07);
  } else {
    const sky = ctx.createLinearGradient(0, y + 8, 0, y + h * 0.45);
    sky.addColorStop(0, '#6b8391');
    sky.addColorStop(1, '#b0c3ca');
    ctx.fillStyle = sky;
    ctx.fillRect(x + 8, y + 8, w - 16, h - 16);
    ctx.fillStyle = '#2f4b1c';
    ctx.fillRect(x + 8, y + h * 0.5, w - 16, h * 0.34);
    ctx.fillStyle = '#2a2a2a';
    ctx.beginPath();
    ctx.moveTo(x + w * 0.48, y + h * 0.28);
    ctx.lineTo(x + w * 0.72, y + h * 0.82);
    ctx.lineTo(x + w * 0.56, y + h * 0.82);
    ctx.lineTo(x + w * 0.4, y + h * 0.28);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(x + w * 0.53, y + h * 0.44, w * 0.04, h * 0.2);
    ctx.fillStyle = '#2565d2';
    ctx.fillRect(x + w * 0.34, y + h * 0.52, w * 0.2, h * 0.14);
    ctx.fillRect(x + w * 0.39, y + h * 0.46, w * 0.1, h * 0.08);
    ctx.fillStyle = '#111';
    ctx.fillRect(x + w * 0.34, y + h * 0.63, w * 0.04, h * 0.07);
    ctx.fillRect(x + w * 0.5, y + h * 0.63, w * 0.04, h * 0.07);
  }

  ctx.fillStyle = '#1c1b16';
  ctx.font = `bold ${Math.max(11, w * 0.08) | 0}px "Trebuchet MS", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(theme === 'atlantic' ? 'WILD ATLANTIC' : theme === 'pub' ? 'PUB STOPS' : 'RALLY ROADS', x + w / 2, y + h - 12);

  ctx.restore();
}

function drawMichaelMartinPortrait(ctx, x, y, w, h) {
  ctx.save();

  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.fillRect(x - 6, y - 6, w + 12, h + 12);
  ctx.fillStyle = '#efe3c4';
  ctx.fillRect(x, y, w, h);

  ctx.fillStyle = '#1f8a4c';
  ctx.fillRect(x + 8, y + 8, (w - 16) / 3, h - 16);
  ctx.fillStyle = '#f4f0e7';
  ctx.fillRect(x + 8 + (w - 16) / 3, y + 8, (w - 16) / 3, h - 16);
  ctx.fillStyle = '#e2704d';
  ctx.fillRect(x + 8 + ((w - 16) / 3) * 2, y + 8, (w - 16) / 3, h - 16);

  ctx.fillStyle = 'rgba(8,12,16,0.55)';
  ctx.fillRect(x + w * 0.1, y + h * 0.64, w * 0.8, h * 0.22);

  ctx.fillStyle = '#23374e';
  ctx.beginPath();
  ctx.moveTo(x + w * 0.22, y + h * 0.88);
  ctx.lineTo(x + w * 0.5, y + h * 0.54);
  ctx.lineTo(x + w * 0.78, y + h * 0.88);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f0c4a0';
  ctx.beginPath();
  ctx.ellipse(x + w * 0.5, y + h * 0.42, w * 0.18, h * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#d8b292';
  ctx.fillRect(x + w * 0.44, y + h * 0.54, w * 0.12, h * 0.08);

  ctx.fillStyle = '#cfd8df';
  ctx.beginPath();
  ctx.moveTo(x + w * 0.42, y + h * 0.62);
  ctx.lineTo(x + w * 0.5, y + h * 0.7);
  ctx.lineTo(x + w * 0.58, y + h * 0.62);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#1d3552';
  ctx.fillRect(x + w * 0.47, y + h * 0.62, w * 0.06, h * 0.18);
  ctx.fillStyle = '#f2b749';
  ctx.fillRect(x + w * 0.49, y + h * 0.64, w * 0.02, h * 0.14);

  ctx.fillStyle = '#6b6e72';
  ctx.beginPath();
  ctx.ellipse(x + w * 0.5, y + h * 0.3, w * 0.18, h * 0.13, 0, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(x + w * 0.32, y + h * 0.29, w * 0.36, h * 0.08);

  ctx.fillStyle = '#2a211c';
  ctx.fillRect(x + w * 0.41, y + h * 0.42, w * 0.04, h * 0.02);
  ctx.fillRect(x + w * 0.55, y + h * 0.42, w * 0.04, h * 0.02);
  ctx.fillRect(x + w * 0.47, y + h * 0.5, w * 0.06, h * 0.02);
  ctx.fillRect(x + w * 0.44, y + h * 0.56, w * 0.12, h * 0.02);

  ctx.fillStyle = 'rgba(16,16,16,0.72)';
  ctx.fillRect(x + 10, y + h - 36, w - 20, 26);
  ctx.fillStyle = '#f6e0a0';
  ctx.font = `bold ${Math.max(11, w * 0.085) | 0}px "Trebuchet MS", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('TAOISEACH MICHEAL MARTIN', x + w / 2, y + h - 18);

  ctx.restore();
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
  ctx.fillRect(x + w*0.05, y + h*0.2, w*0.9, h*0.18);
  ctx.strokeStyle = '#c8a84e';
  ctx.lineWidth = Math.max(1, w * 0.025);
  ctx.strokeRect(x + w*0.05, y + h*0.2, w*0.9, h*0.18);
  // Pub name
  if (w > 25) {
    drawSignText(ctx, name, x + w*0.05, y + h*0.2, w*0.9, h*0.18, '#f3d890');
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
  ctx.fillRect(x + w*0.05, y + h*0.15, w*0.9, h*0.24);
  ctx.strokeStyle = '#c8a84e';
  ctx.lineWidth = Math.max(1, w * 0.025);
  ctx.strokeRect(x + w*0.05, y + h*0.15, w*0.9, h*0.24);
  if (w > 25) {
    drawSignText(ctx, name, x + w*0.05, y + h*0.15, w*0.9, h*0.24, '#f7fafc');
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
  const audioRef = useRef(null);
  const radioPopupTimerRef = useRef(null);
  const activeStationRef = useRef(RADIO_OFF_STATION.id);
  const trackCursorRef = useRef({});
  const [musicStations, setMusicStations] = useState([]);
  const [activeStation, setActiveStation] = useState(RADIO_OFF_STATION.id);
  const [radioTrack, setRadioTrack] = useState('');
  const [radioError, setRadioError] = useState('');
  const [radioPlaying, setRadioPlaying] = useState(false);
  const [radioPopup, setRadioPopup] = useState(null);
  const gsRef = useRef({
    running: false,
    started: false,
    gameOver: false,
    paused: false,
    score: 0,
    speed: 0,
    maxSpeed: 5,
    position: 0,
    previousPosition: 0,
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
    townPopupTimer: 0,
    townPopupName: '',
    townPopupLandmarks: [],
    activeTown: '',
    requiresKeyboard: false,
    keyboardDetected: true,
    inputBlocked: false,
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
      previousPosition: 0,
      lives: 3, invincible: 0, combo: 1, comboTimer: 0,
      distanceTraveled: 0, obstacles: [], oncomingCars: [],
      lastObstSpawn: 0, lastCarSpawn: 0, frameCount: 0,
      shake: 0, flashMsg: '', flashTimer: 0,
      nearMissMsg: '', nearMissTimer: 0, diffLevel: 1,
      gameOver: false, started: true, running: true,
      drunkLevel: 0, drunkTimer: 0,
      townPopupTimer: 0, townPopupName: '', townPopupLandmarks: [], activeTown: '',
    });
  }, []);

  // Require a hardware keyboard for likely phone/tablet devices.
  const isLikelyTouchDevice = useCallback(() => {
    const ua = navigator.userAgent || '';
    const uaMobile = /Android|iPhone|iPad|iPod|Mobile|Tablet|Silk|Kindle/i.test(ua);
    const hasTouch = (navigator.maxTouchPoints || 0) > 0;
    const coarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    return uaMobile || (hasTouch && coarsePointer);
  }, []);

  useEffect(() => {
    const gs = gsRef.current;
    const blocked = isLikelyTouchDevice();
    gs.requiresKeyboard = blocked;
    gs.keyboardDetected = !blocked;
    gs.inputBlocked = blocked;
  }, [isLikelyTouchDevice]);

  const getStationById = useCallback((stationId) => {
    if (stationId === RADIO_OFF_STATION.id) return RADIO_OFF_STATION;

    const meta = RADIO_STATIONS.find((station) => station.id === stationId);
    if (!meta) return null;

    const manifestStation = musicStations.find(
      (station) => station.id === stationId || station.folder?.toLowerCase() === stationId
    );

    return {
      ...meta,
      tracks: Array.isArray(manifestStation?.tracks) ? manifestStation.tracks : [],
    };
  }, [musicStations]);

  const showRadioPopup = useCallback((stationId, headline, subline = '') => {
    const station = getStationById(stationId) || RADIO_OFF_STATION;
    setRadioPopup({
      stationId: station.id,
      label: station.label,
      badge: station.badge,
      accent: station.accent,
      glow: station.glow,
      headline,
      subline,
    });

    if (radioPopupTimerRef.current) clearTimeout(radioPopupTimerRef.current);
    radioPopupTimerRef.current = setTimeout(() => {
      setRadioPopup(null);
      radioPopupTimerRef.current = null;
    }, 4000);
  }, [getStationById]);

  const stopRadio = useCallback((showPopup = false) => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    }

    activeStationRef.current = RADIO_OFF_STATION.id;
    setActiveStation(RADIO_OFF_STATION.id);
    setRadioPlaying(false);
    setRadioTrack('');
    setRadioError('');

    if (showPopup) {
      showRadioPopup(RADIO_OFF_STATION.id, 'Radio Off', 'Press Tab to switch station');
    }
  }, [showRadioPopup]);

  const tuneStation = useCallback((stationId, advance = false, popup = true) => {
    if (stationId === RADIO_OFF_STATION.id) {
      stopRadio(popup);
      return;
    }

    const station = getStationById(stationId);
    activeStationRef.current = stationId;
    setActiveStation(stationId);

    if (!station || station.tracks.length === 0) {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
      }
      setRadioPlaying(false);
      setRadioTrack('');
      setRadioError(`Drop MP3s into /music/${station?.folder || stationId} to tune this station.`);
      if (popup) showRadioPopup(stationId, station?.label || 'No Signal', 'No tracks found on this station');
      return;
    }

    const audio = audioRef.current || new Audio();
    audioRef.current = audio;

    const previousIndex = trackCursorRef.current[stationId] ?? -1;
    const nextIndex = advance
      ? (previousIndex + 1 + station.tracks.length) % station.tracks.length
      : previousIndex >= 0
        ? previousIndex
        : Math.floor(Math.random() * station.tracks.length);

    const track = station.tracks[nextIndex];
    trackCursorRef.current[stationId] = nextIndex;
    setRadioTrack(track.title);
    setRadioError('');

    audio.volume = 0.48;
    audio.src = toPublicUrl(track.url);
    audio.currentTime = 0;

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(() => {
          setRadioPlaying(true);
          if (popup) showRadioPopup(stationId, station.label, track.title);
        })
        .catch(() => {
          setRadioPlaying(false);
          setRadioError('Press Tab again to retry playback.');
          if (popup) showRadioPopup(stationId, station.label, 'Press Tab again to retry playback');
        });
    } else {
      setRadioPlaying(true);
      if (popup) showRadioPopup(stationId, station.label, track.title);
    }
  }, [getStationById, showRadioPopup, stopRadio]);

  const cycleRadioStation = useCallback(() => {
    const currentIndex = RADIO_DIAL_ORDER.indexOf(activeStationRef.current);
    const nextIndex = (currentIndex + 1 + RADIO_DIAL_ORDER.length) % RADIO_DIAL_ORDER.length;
    tuneStation(RADIO_DIAL_ORDER[nextIndex], false, true);
  }, [tuneStation]);

  useEffect(() => {
    let cancelled = false;

    fetch(toPublicUrl('music-manifest.json'), { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('manifest'))))
      .then((data) => {
        if (cancelled) return;
        setMusicStations(Array.isArray(data?.stations) ? data.stations : []);
        setRadioError('');
      })
      .catch(() => {
        if (cancelled) return;
        setMusicStations([]);
        setRadioError('Music manifest not found yet. Run start/build after adding MP3s to /music.');
      });

    return () => { cancelled = true; };
  }, []);

  useEffect(() => () => {
    if (radioPopupTimerRef.current) clearTimeout(radioPopupTimerRef.current);
  }, []);

  useEffect(() => {
    const audio = audioRef.current || new Audio();
    audioRef.current = audio;

    const handlePlay = () => setRadioPlaying(true);
    const handlePause = () => setRadioPlaying(false);
    const handleEnded = () => {
      if (activeStationRef.current !== RADIO_OFF_STATION.id) {
        tuneStation(activeStationRef.current, true, false);
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, [tuneStation]);

  // Input
  useEffect(() => {
    const down = (e) => {
      const gs = gsRef.current;
      if (gs.requiresKeyboard && !gs.keyboardDetected) {
        gs.keyboardDetected = true;
        gs.inputBlocked = false;
        gs.flashMsg = 'KEYBOARD DETECTED';
        gs.flashTimer = 45;
      }
      if (gs.inputBlocked) {
        e.preventDefault();
        return;
      }
      if (e.code === 'Tab') {
        cycleRadioStation();
        e.preventDefault();
        return;
      }
      keysRef.current[e.code] = true;
      if (!gs.started && (e.code === 'Space' || e.code === 'Enter')) {
        gs.started = true; gs.running = true;
      }
      if (gs.gameOver && (e.code === 'KeyR')) resetGame();
      if (e.code === 'KeyP') gs.paused = !gs.paused;
      e.preventDefault();
    };
    const up = (e) => {
      const gs = gsRef.current;
      if (gs.inputBlocked) {
        e.preventDefault();
        return;
      }
      keysRef.current[e.code] = false;
      e.preventDefault();
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, [cycleRadioStation, resetGame]);

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

      if (gs.started && gs.running && !gs.paused && !gs.gameOver && !gs.inputBlocked) {
        const prevPosition = gs.position;
        gs.previousPosition = prevPosition;

        // Difficulty - slower progression
        gs.diffLevel = 1 + Math.floor(gs.distanceTraveled / 4000);
        gs.obstFreq = Math.max(60, 160 - gs.diffLevel * 8);
        gs.maxSpeed = Math.min(5, 2.5 + gs.diffLevel * 0.2);

        // Location zone check
        const prevTown = gs.activeTown || '';
        gs.inTown = false;
        gs.activeTown = '';
        gs.speedZone = 100;
        gs.nearbyLandmarks = [];
        for (const z of LOCATION_ZONES) {
          if (gs.position >= z.zoneStart && gs.position <= z.zoneEnd) {
            gs.inTown = true;
            gs.speedZone = z.speedLimit || 50;
            gs.currentLocation = z.name;
            gs.nearbyLandmarks = z.landmarks;
            gs.activeTown = z.name;
            break;
          } else if (gs.position >= z.approachStart && gs.position <= z.approachEnd) {
            gs.speedZone = 80;
            gs.currentLocation = z.name;
            // DON'T set nearbyLandmarks here Ã¢â‚¬â€ banner only shows inside town
            break;
          }
        }
        if (gs.inTown && gs.activeTown && gs.activeTown !== prevTown) {
          gs.townPopupName = gs.activeTown;
          gs.townPopupLandmarks = gs.nearbyLandmarks.slice(0, 6);
          gs.townPopupTimer = 220;
        }

        // Road segment lookup (needed for edge proximity + curvature)
        const segIdx = ((Math.floor(gs.position) % TOTAL_SEGMENTS) + TOTAL_SEGMENTS) % TOTAL_SEGMENTS;
        const seg = ROAD_SEGMENTS[segIdx];

        // Full manual speed control.
        const forwardCap = gs.maxSpeed;
        const reverseCap = -2;
        if (accel) gs.speed += 0.075;
        if (brake) gs.speed -= (gs.speed > 0 ? 0.1 : 0.06);
        if (!accel && !brake) {
          gs.speed *= 0.985;
          if (Math.abs(gs.speed) < 0.015) gs.speed = 0;
        }
        gs.speed = Math.max(reverseCap, Math.min(forwardCap, gs.speed));

        // Steering is user-only.
        const steerAmt = 0.038 * (Math.max(0.6, Math.abs(gs.speed)) / Math.max(1, gs.maxSpeed));
        if (left) gs.playerX -= steerAmt;
        if (right) gs.playerX += steerAmt;

        // Hard road boundary on all roads.
        const roadNarrow = seg ? seg.narrow : 1;
        const roadEdge = 0.85 * roadNarrow;
        gs.isNarrow = roadNarrow < 0.7;
        if (gs.playerX > roadEdge) {
          gs.playerX = roadEdge - 0.001;
          gs.speed *= 0.8;
          gs.shake = Math.max(gs.shake, 4);
        } else if (gs.playerX < -roadEdge) {
          gs.playerX = -roadEdge + 0.001;
          gs.speed *= 0.8;
          gs.shake = Math.max(gs.shake, 4);
        }

        gs.position += gs.speed;
        gs.distanceTraveled = Math.max(0, gs.distanceTraveled + gs.speed);
        if (gs.position >= TOTAL_SEGMENTS) gs.position -= TOTAL_SEGMENTS;
        if (gs.position < 0) gs.position += TOTAL_SEGMENTS;

        // "PULL IN!" warning when narrow + oncoming car nearby
        gs.pullInWarning = false;
        if (gs.isNarrow) {
          for (const car of gs.oncomingCars) {
            const dist = wrapRoadDelta(car.z, gs.position);
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
            dodged: false, nearMissed: false, prevZ: gs.position + 300,
          });
          gs.lastObstSpawn = 0;
          if (gs.diffLevel > 3 && Math.random() < 0.3) {
            const t2 = OBS_TYPES[Math.floor(Math.random() * OBS_TYPES.length)];
            gs.obstacles.push({
              type: t2, z: gs.position + 320 + Math.random() * 80,
              x: (Math.random() - 0.5) * laneRange, wobble: Math.random() * 6.28,
              dodged: false, nearMissed: false, prevZ: gs.position + 320,
            });
          }
        }

        // Spawn oncoming - ONLY on narrow roads (the Donegal boreen experience!)
        // Ireland drives on the LEFT Ã¢â‚¬â€ oncoming cars come on the RIGHT side
        gs.lastCarSpawn++;
        if (gs.isNarrow && gs.lastCarSpawn > 160 && Math.abs(seg?.curve || 0) < 0.5) {
          const carX = 0.1 + Math.random() * 0.2; // right side of road (oncoming on right in Ireland)
          gs.oncomingCars.push({
            z: gs.position + 350, x: carX,
            speed: 0.3 + Math.random() * 0.2, // very slow
            isNarrowCar: true,
            prevZ: gs.position + 350,
          });
          gs.lastCarSpawn = 0;
        }

        // Update obstacles
        for (const obs of gs.obstacles) {
          obs.prevZ = obs.z;
          if (obs.type.id === 'cow' || obs.type.id === 'sheep') {
            obs.wobble += 0.03;
            obs.x += Math.sin(obs.wobble) * obs.type.moveSpeed * 0.05;
          }
          if (obs.type.id === 'bus') obs.z += 0.5;
        }

        // Update oncoming
        for (const c of gs.oncomingCars) {
          c.prevZ = c.z;
          c.z -= c.speed + gs.speed;
        }

        // Drunk mode update
        if (gs.drunkTimer > 0) {
          gs.drunkTimer--;
          if (gs.drunkTimer <= 0) {
            gs.drunkLevel = Math.max(0, gs.drunkLevel - 1);
            if (gs.drunkLevel > 0) gs.drunkTimer = 300; // keep decaying
          }
          // Keep steering deterministic; no automatic lateral drift here.
        }

        // Swept collision checks to catch true direct impacts without false positives.
        if (gs.invincible > 0) gs.invincible--;
        const playerHalfX = 0.11;
        const obsHalfX = (obsType) => {
          if (obsType === 'bus') return 0.2;
          if (obsType === 'cow') return 0.15;
          if (obsType === 'sheep') return 0.11;
          return 0.1;
        };
        const hitDepthFront = 2.9;
        const hitDepthBack = -0.9;
        const crossedDepth = (before, after) =>
          (before > hitDepthFront && after < hitDepthBack) ||
          (after <= hitDepthFront && after >= hitDepthBack);

        for (let i = gs.obstacles.length - 1; i >= 0; i--) {
          const obs = gs.obstacles[i];
          const relBefore = wrapRoadDelta(obs.prevZ ?? obs.z, prevPosition);
          const relAfter = wrapRoadDelta(obs.z, gs.position);

          if (relAfter < -3 && !obs.dodged) {
            obs.dodged = true;
            gs.score += obs.type.points * gs.combo;
          }
          if (relAfter < -60 || relAfter > 700) {
            gs.obstacles.splice(i, 1);
            continue;
          }
          if (!crossedDepth(relBefore, relAfter)) continue;

          const xDist = Math.abs(gs.playerX - obs.x);
          const hitX = playerHalfX + obsHalfX(obs.type.id);
          const isHit = xDist <= hitX;

          if (isHit && gs.invincible <= 0) {
            if (obs.type.id === 'buckfast') {
              gs.drunkLevel = Math.min(5, gs.drunkLevel + 1);
              gs.drunkTimer = 400 + gs.drunkLevel * 100;
              gs.speed = Math.min(gs.maxSpeed * 1.5, gs.speed + 1.5);
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
            gs.speed *= 0.25;
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

          const nearX = hitX + 0.06;
          if (!obs.nearMissed && xDist <= nearX && xDist > hitX) {
            obs.nearMissed = true;
            const nearPts = 30 * gs.combo;
            gs.score += nearPts;
            gs.combo = Math.min(8, gs.combo + 1);
            gs.comboTimer = 200;
            gs.nearMissMsg = `NEAR MISS! +${nearPts}`;
            gs.nearMissTimer = 50;
          }
        }

        for (let i = gs.oncomingCars.length - 1; i >= 0; i--) {
          const car = gs.oncomingCars[i];
          const relBefore = wrapRoadDelta(car.prevZ ?? car.z, prevPosition);
          const relAfter = wrapRoadDelta(car.z, gs.position);
          if (relAfter < -30 || relAfter > 500) {
            gs.oncomingCars.splice(i, 1);
            continue;
          }
          if (!crossedDepth(relBefore, relAfter)) continue;

          const xDist = Math.abs(gs.playerX - car.x);
          const hitX = playerHalfX + 0.16;
          if (xDist <= hitX && gs.invincible <= 0) {
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

          const nearX = hitX + 0.06;
          if (!car.nearMissed && xDist <= nearX && xDist > hitX) {
            car.nearMissed = true;
            const nearPts = 75 * gs.combo;
            gs.score += nearPts;
            gs.combo = Math.min(10, gs.combo + 1);
            gs.comboTimer = 240;
            gs.nearMissMsg = `TIGHT SQUEEZE! +${nearPts}`;
            gs.nearMissTimer = 60;
          }
        }

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
      const oceanY = H * 0.36;

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

      for (let g = 0; g < 5; g++) {
        const gx = ((g * 170) + gs.frameCount * 1.7) % (W + 80) - 40;
        const gy = 72 + (g % 2) * 20 + Math.sin(gs.frameCount * 0.02 + g) * 5;
        drawSeagull(ctx, gx, gy, 11 + (g % 3) * 4);
      }

      // Atlantic Ocean on left side Ã¢â‚¬â€ dark moody water
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

      drawLighthouse(ctx, W * 0.09 + Math.sin(gs.position * 0.002) * 10, oceanY - H * 0.16, W * 0.06, H * 0.17);
      ctx.fillStyle = '#111d28';
      ctx.fillRect(W * 0.18, oceanY + H * 0.015, W * 0.09, H * 0.008);
      ctx.beginPath();
      ctx.moveTo(W * 0.205, oceanY + H * 0.015);
      ctx.lineTo(W * 0.242, oceanY - H * 0.018);
      ctx.lineTo(W * 0.26, oceanY + H * 0.015);
      ctx.closePath();
      ctx.fill();

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

        const roadMarked = hasRoadMarkings(segN);

        // Center dashes
        if (roadMarked && (segN % 10) < 5) {
          ctx.fillStyle = '#ffcc00';
          const lw = Math.max(1, projScale * 0.08);
          ctx.fillRect(screenX - lw/2, screenY, lw, stripH + 1);
        }

        let rw = 0;
        if (roadMarked) {
          // Edge lines
          const ew = Math.max(1, projScale * 0.06);
          ctx.fillStyle = '#fff';
          ctx.fillRect(screenX - roadW/2, screenY, ew, stripH + 1);
          ctx.fillRect(screenX + roadW/2 - ew, screenY, ew, stripH + 1);

          // Rumble strips
          rw = Math.max(1, projScale * 0.15);
          ctx.fillStyle = (segN % 6) < 3 ? '#cc2222' : '#fff';
          ctx.fillRect(screenX - roadW/2 - rw, screenY, rw, stripH + 1);
          ctx.fillRect(screenX + roadW/2, screenY, rw, stripH + 1);
        }

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
          const relZ = wrapRoadDelta(obs.z, gs.position);
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
          const relZ = wrapRoadDelta(car.z, gs.position);
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

      // Town popup: only on town entry, auto-hide after a few seconds.
      if (gs.townPopupTimer > 0 && gs.townPopupLandmarks.length > 0) {
        gs.townPopupTimer--;
        const alpha = Math.min(1, gs.townPopupTimer / 40);
        const pubs = gs.townPopupLandmarks.filter(l => l.type === 'pub').slice(0, 2);
        const shops = gs.townPopupLandmarks.filter(l => l.type === 'shop').slice(0, 2);
        const popupY = 54;
        const popupH = 78;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = 'rgba(0,0,0,0.65)';
        ctx.fillRect(0, popupY, W, popupH);

        ctx.textAlign = 'center';
        ctx.fillStyle = '#aaddaa';
        ctx.font = 'bold 14px monospace';
        ctx.fillText(`ENTERING ${gs.townPopupName.toUpperCase()}`, W / 2, popupY + 16);

        ctx.fillStyle = '#ffdd88';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('FAMOUS PUBS', W * 0.28, popupY + 34);
        ctx.fillStyle = '#88ddff';
        ctx.fillText('LOCAL SHOPS', W * 0.72, popupY + 34);

        ctx.font = '12px monospace';
        pubs.forEach((p, i) => {
          ctx.fillStyle = '#ffcc66';
          ctx.fillText(p.name, W * 0.28, popupY + 52 + i * 16);
        });
        shops.forEach((s, i) => {
          ctx.fillStyle = '#88ccee';
          ctx.fillText(s.name, W * 0.72, popupY + 52 + i * 16);
        });

        ctx.globalAlpha = 1;
      }

      // NARROW ROAD warning
      if (gs.isNarrow && gs.started && !gs.gameOver) {
        ctx.fillStyle = '#ffaa00';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'left';
        ctx.fillText('\u26a0 NARROW ROAD', 14, H - 14);
      }

      // PULL IN! warning - text only, no tinted background
      if (gs.pullInWarning && gs.started && !gs.gameOver) {
        const flash = gs.frameCount % 20 < 10;
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
          'MANUAL DRIVE \u2022 \u2191/W Accelerate  \u2193/S Brake/Reverse',
          'TAB \u2022 Cycle Radio Off / Country / Power Hour',
          '',
          'Dodge: Cows, Sheep, McGinley Bus & Baileys',
          'BUCKFAST = Speed Boost + Drunk Mode!',
          'Near misses = bonus + combo multiplier!',
          'NARROW ROADS: Pull in to let cars pass!',
          'Drive on the LEFT - this is Ireland!',
        ];
        lines2.forEach((l, i) => ctx.fillText(l, W/2, H*0.30 + i*20));

        const cardW = Math.min(190, W * 0.22);
        const cardGap = Math.min(18, W * 0.018);
        const cardH = Math.min(145, H * 0.17);
        const cardsWidth = cardW * 3 + cardGap * 2;
        const cardsX = W / 2 - cardsWidth / 2;
        const cardsY = H * 0.55;

        drawPostcard(ctx, cardsX, cardsY, cardW, cardH, 'atlantic');
        drawPostcard(ctx, cardsX + cardW + cardGap, cardsY, cardW, cardH, 'pub');
        drawPostcard(ctx, cardsX + (cardW + cardGap) * 2, cardsY, cardW, cardH, 'rally');

        ctx.fillStyle = '#88ccff';
        ctx.font = '12px monospace';
        ctx.fillText('Town landmark popups appear briefly when you enter each town.', W/2, H*0.79);

        ctx.fillStyle = '#ffdd88';
        ctx.font = '12px monospace';
        ctx.fillText('Press TAB to cycle radio stations GTA-style.', W/2, H*0.83);

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
        // Yellow stripe (IarnrÃƒÂ³d Ãƒâ€°ireann)
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
        // "IARNRÃƒâ€œD Ãƒâ€°IREANN" on side
        ctx.fillStyle = '#ffcc00';
        ctx.font = `bold ${Math.max(10, trainW*0.03)|0}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('IARNRÃƒâ€œD Ãƒâ€°IREANN / IRISH RAIL', trainX + trainW*0.35, trainY + trainH*0.52);
        // Big red X over the train
        ctx.strokeStyle = '#ff2222';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(trainX - 10, trainY); ctx.lineTo(trainX + trainW + 10, trainY + trainH + 10);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(trainX + trainW + 10, trainY); ctx.lineTo(trainX - 10, trainY + trainH + 10);
        ctx.stroke();

        const portraitW = Math.min(170, W * 0.18);
        const portraitH = portraitW * 1.24;
        const portraitX = Math.max(24, W - portraitW - 34);
        const portraitY = H * 0.4;
        drawMichaelMartinPortrait(ctx, portraitX, portraitY, portraitW, portraitH);

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

      // Hard lock for touch devices until a hardware keyboard is detected.
      if (gs.inputBlocked) {
        ctx.fillStyle = 'rgba(0,0,0,0.88)';
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#ffcc66';
        ctx.font = `bold ${Math.max(22, W*0.035)|0}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('KEYBOARD REQUIRED', W/2, H*0.38);

        ctx.fillStyle = '#ffffff';
        ctx.font = `${Math.max(13, W*0.015)|0}px monospace`;
        ctx.fillText('This game is locked on touch-only devices.', W/2, H*0.45);
        ctx.fillText('Use a computer, or connect a hardware keyboard.', W/2, H*0.50);

        ctx.fillStyle = '#88ccff';
        ctx.font = `${Math.max(12, W*0.014)|0}px monospace`;
        ctx.fillText('Once a keyboard is connected, press any key to continue.', W/2, H*0.57);
      }

      ctx.restore();
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const stationLibrary = RADIO_DIAL_ORDER.map((stationId) => getStationById(stationId)).filter(Boolean);
  const radioWheelStations = [...RADIO_STATIONS.map((station) => station.id), RADIO_OFF_STATION.id]
    .map((stationId) => getStationById(stationId))
    .filter(Boolean);
  const currentStation = stationLibrary.find((station) => station.id === activeStation) || RADIO_OFF_STATION;
  const radioHint = activeStation === RADIO_OFF_STATION.id
    ? 'TAB: Radio Off'
    : `TAB: ${currentStation.label}${radioPlaying ? ' On Air' : ''}`;
  const radioHintDetail = activeStation === RADIO_OFF_STATION.id
    ? 'Cycle stations'
    : radioError || radioTrack || currentStation.blurb;

  return (
    <div style={{ width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#000', overflow:'hidden', position:'relative' }}>
      <canvas ref={canvasRef} style={{ display:'block', imageRendering:'pixelated', cursor:'none', maxWidth:'100vw', maxHeight:'100vh' }} tabIndex={0} />
      <div style={{
        position:'absolute',
        left:16,
        bottom:16,
        pointerEvents:'none',
        borderRadius:999,
        border:'1px solid rgba(255,255,255,0.12)',
        background:'rgba(10,14,18,0.72)',
        boxShadow:'0 12px 28px rgba(0,0,0,0.35)',
        padding:'10px 14px',
        color:'#f1ead9',
        backdropFilter:'blur(10px)',
      }}>
        <div style={{ fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', color:'#96a8b2' }}>{radioHint}</div>
        <div style={{ fontSize:12, color:'#fff7e3', marginTop:3, maxWidth:260, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{radioHintDetail}</div>
      </div>

      {radioPopup && (
        <div style={{
          position:'absolute',
          inset:0,
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          pointerEvents:'none',
        }}>
          <div style={{ position:'relative', width:'min(72vw, 520px)', aspectRatio:'1 / 1' }}>
            <div style={{
              position:'absolute',
              left:'50%',
              top:'50%',
              width:'42%',
              height:'42%',
              transform:'translate(-50%, -50%)',
              borderRadius:'50%',
              background:'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, rgba(20,24,28,0.95) 55%, rgba(6,8,10,0.97) 100%)',
              border:`2px solid ${radioPopup.accent}`,
              boxShadow:`0 0 40px ${radioPopup.glow}, 0 20px 50px rgba(0,0,0,0.45)`,
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              textAlign:'center',
              padding:'18px 20px',
              color:'#f5efe2',
            }}>
              <div>
                <div style={{ fontSize:12, letterSpacing:'0.24em', textTransform:'uppercase', color:radioPopup.accent, marginBottom:8 }}>Wild Atlantic Radio</div>
                <div style={{ fontSize:26, fontWeight:900, lineHeight:1.05 }}>{radioPopup.headline}</div>
                <div style={{ fontSize:13, color:'#d4dde2', marginTop:10, lineHeight:1.3 }}>{radioPopup.subline || 'Tab to switch station'}</div>
              </div>
            </div>

            {radioWheelStations.map((station, index) => {
              const wheelAngles = [220, 320, 90];
              const angle = ((wheelAngles[index] ?? (-90 + (360 / radioWheelStations.length) * index)) * Math.PI) / 180;
              const orbit = 34;
              const isActive = station.id === radioPopup.stationId;
              return (
                <div
                  key={station.id}
                  style={{
                    position:'absolute',
                    left:`calc(50% + ${Math.cos(angle) * orbit}%)`,
                    top:`calc(50% + ${Math.sin(angle) * orbit}%)`,
                    width:isActive ? '22%' : '18%',
                    height:isActive ? '22%' : '18%',
                    transform:'translate(-50%, -50%)',
                    borderRadius:'50%',
                    background:isActive
                      ? `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18) 0%, ${station.glow} 24%, rgba(8,10,14,0.94) 100%)`
                      : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, rgba(12,14,18,0.92) 100%)',
                    border:`2px solid ${isActive ? station.accent : 'rgba(255,255,255,0.16)'}`,
                    boxShadow:isActive ? `0 0 32px ${station.glow}` : '0 12px 24px rgba(0,0,0,0.25)',
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center',
                    color:'#f7f1e5',
                    textAlign:'center',
                    padding:'8px',
                    opacity:isActive ? 1 : 0.74,
                  }}
                >
                  <div style={{ fontSize:isActive ? 18 : 14, fontWeight:900, letterSpacing:'0.12em', color:isActive ? station.accent : '#dde6eb' }}>{station.badge}</div>
                  <div style={{ fontSize:isActive ? 11 : 10, marginTop:4, textTransform:'uppercase', letterSpacing:'0.08em' }}>{station.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;


