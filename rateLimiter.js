
const Blacklist = require('./blacklist');

const RATE_LIMIT_WINDOW_MS = 10000; // 10 seconds for testing
const MAX_REQUESTS_PER_WINDOW = 5; // Maximum requests allowed per window

class RateLimiter {
    constructor() {
        this.rateLimitStore = {};
    }

    middleware(req, res, next) {
        const ip = req.connection.remoteAddress; // Get client IP address
        const now = Date.now();

        // Check if the IP is blacklisted
        if (Blacklist.has(ip)) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            return res.end('Access denied: Your IP has been blacklisted.');
        }

        // Initialize rate limiting entry for the IP if it doesn't exist
        if (!this.rateLimitStore[ip]) {
            this.rateLimitStore[ip] = { count: 0, startTime: now };
        }

        const { count, startTime } = this.rateLimitStore[ip];

        // Check if the current time exceeds the window
        if (now - startTime < RATE_LIMIT_WINDOW_MS) {
            // Within the same window
            if (count >= MAX_REQUESTS_PER_WINDOW) {
                console.log(`Rate limit exceeded for IP: ${ip}. Blacklisting...`);
                Blacklist.add(ip);

                // Optionally, set a timeout to remove from the blacklist after a certain time
                setTimeout(() => {
                    Blacklist.remove(ip);
                    console.log(`IP: ${ip} has been removed from the blacklist. Please Wait for 2 hours`);
                }, 3600000); // 1 hour in milliseconds

                res.writeHead(429, { 'Content-Type': 'text/plain' });
                return res.end('Too many requests. Please try again later.');
            }

            // Increment the count
            this.rateLimitStore[ip].count += 1;
        } else {
            // New window
            this.rateLimitStore[ip] = { count: 1, startTime: now };
        }

        next(); // Allow the request to continue
    }
}

module.exports = new RateLimiter();
