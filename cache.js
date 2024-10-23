const NodeCache = require('node-cache');

// Initialize node-cache with a standard TTL (e.g., 1 hour)
const cache = new NodeCache({ stdTTL: 3600 }); // 3600 seconds = 1 hour

const Cache = {
    get: (key) => cache.get(key),
    set: (key, value) => cache.set(key, value),
};

module.exports = Cache;
