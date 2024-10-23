const httpProxy = require('http-proxy');

class ProxyServer {
    constructor(target) {
        this.proxy = httpProxy.createProxyServer({
            target: target,
            changeOrigin: true,
        });

        // Error handling
        this.proxy.on('error', (err, req, res) => {
            console.error('Proxy error:', err);
            if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Something went wrong.');
            }
        });
    }

    proxyRequest(req, res) {
        // Forward the Authorization header if it exists
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            req.headers['authorization'] = authHeader; // Forward the JWT token
        }

        // Forward the request to the target server
        this.proxy.web(req, res);
    }
}

module.exports = ProxyServer;
