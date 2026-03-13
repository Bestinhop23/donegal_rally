const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const musicDir = path.join(rootDir, 'music');
const publicDir = path.join(rootDir, 'public');
const publicMusicDir = path.join(publicDir, 'music');
const manifestPath = path.join(publicDir, 'music-manifest.json');

function cleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function toTitle(folderName) {
  return folderName
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function encodeSegments(parts) {
  return parts.map((part) => encodeURIComponent(part)).join('/');
}

function trackTitle(fileName) {
  return path.basename(fileName, path.extname(fileName))
    .replace(/\[[^\]]+\]\s*$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildManifest() {
  if (!fs.existsSync(musicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    fs.writeFileSync(manifestPath, JSON.stringify({ generatedAt: new Date().toISOString(), stations: [] }, null, 2));
    return;
  }

  cleanDir(publicMusicDir);

  const stationDirs = fs.readdirSync(musicDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name));

  const stations = stationDirs.map((entry) => {
    const sourceStationDir = path.join(musicDir, entry.name);
    const targetStationDir = path.join(publicMusicDir, entry.name);
    fs.mkdirSync(targetStationDir, { recursive: true });

    const tracks = fs.readdirSync(sourceStationDir, { withFileTypes: true })
      .filter((file) => file.isFile() && path.extname(file.name).toLowerCase() === '.mp3')
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((file) => {
        fs.copyFileSync(path.join(sourceStationDir, file.name), path.join(targetStationDir, file.name));
        return {
          title: trackTitle(file.name),
          fileName: file.name,
          url: encodeSegments(['music', entry.name, file.name]),
        };
      });

    return {
      id: entry.name.toLowerCase(),
      folder: entry.name,
      label: toTitle(entry.name),
      trackCount: tracks.length,
      tracks,
    };
  });

  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(
    manifestPath,
    JSON.stringify({ generatedAt: new Date().toISOString(), stations }, null, 2)
  );
}

buildManifest();
