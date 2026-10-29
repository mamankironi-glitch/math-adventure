const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
// Emoji regex matching various unicode ranges including misc symbols, pictographs, transport, emoticons, dingbats, flags, etc.
const emojiRegex = /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F780}-\u{1F7FF}\u{1FA70}-\u{1FAFF}]/u;

let found = 0;

function walk(dir) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (item === '.git' || item === '.vercel' || item === 'node_modules') continue;
      walk(fullPath);
    } else {
      if (!/\.(html|js|css)$/.test(item)) continue;
      if (item.startsWith('test_') || item.startsWith('check_')) continue;
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (emojiRegex.test(line)) {
          console.log(`EMOJI at ${path.relative(rootDir, fullPath)}:${idx + 1} -> ${line.trim()}`);
          found++;
        }
      });
    }
  }
}

walk(rootDir);
console.log(`\nScan finished. Total emojis found: ${found}`);
if (found === 0) {
  console.log('SUCCESS: ZERO EMOJIS CONFIRMED!');
} else {
  process.exit(1);
}
