const http = require('http');
const RateLimiter = require('./rateLimiter');
const ProxyServer = require('./proxy');

const targetServerUrl = 'http://localhost:8080'; // The Express server
const proxyServer = new ProxyServer(targetServerUrl);

// Create an HTTP server to listen for incoming requests
const server = http.createServer((req, res) => {
    // Apply rate limiting
    RateLimiter.middleware(req, res, () => {
        // Proxy the request to the backend server without any caching
        proxyServer.proxyRequest(req, res);
    });
});

// Start the proxy server on port 9010
server.listen(9010, () => {
    console.log('Proxy server with IP blacklisting and JWT authorization is running on http://localhost:9010');
});
