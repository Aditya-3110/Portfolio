const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 8000;
const publicDir = __dirname;

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const server = http.createServer((req, res) => {
  const requestedPath = req.url === "/" ? "/index.html" : req.url;
  const filePath = path.join(publicDir, requestedPath);
  const ext = path.extname(filePath);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 - File not found");
      return;
    }

    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "text/plain" });
    res.end(content);
  });
});

server.listen(port, () => {
  console.log(`Portfolio running at http://localhost:${port}`);
});
