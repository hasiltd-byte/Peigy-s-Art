// Local preview of the production export. No dependencies, no writes.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const compressed = new Map();
const root = path.resolve('out');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
http.createServer((request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    if (file !== root && !file.startsWith(root + path.sep)) { response.writeHead(403); response.end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { response.writeHead(404); response.end('Not found'); return; }
    const extension = path.extname(file);
    const headers = { 'Content-Type': types[extension] || 'application/octet-stream', 'Vary': 'Accept-Encoding' };
    headers['Cache-Control'] = file.includes(path.join('_next', 'static')) ? 'public, max-age=31536000, immutable' : /\.(webp|jpg|png|woff2)$/.test(file) ? 'public, max-age=604800, stale-while-revalidate=86400' : 'public, max-age=0, must-revalidate';
    if (/\.(html|js|css|svg|xml|txt)$/.test(file) && request.headers['accept-encoding']?.includes('gzip')) {
      const modified = fs.statSync(file).mtimeMs;
      let cached = compressed.get(file);
      if (!cached || cached.modified !== modified) { cached = { modified, data: zlib.gzipSync(fs.readFileSync(file)) }; compressed.set(file, cached); }
      response.writeHead(200, { ...headers, 'Content-Encoding': 'gzip', 'Content-Length': cached.data.length });
      response.end(cached.data);
      return;
    }
    response.writeHead(200, headers);
    fs.createReadStream(file).pipe(response);
  } catch { response.writeHead(400); response.end('Bad request'); }
}).listen(Number(process.env.PORT || 3015), '127.0.0.1', () => console.log(`Production preview: http://127.0.0.1:${process.env.PORT || 3015}`));
