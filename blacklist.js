class Blacklist {
    constructor() {
        this.blacklist = new Set(); // Use a Set for unique blacklisted IPs
    }

    add(ip) {
        this.blacklist.add(ip);
    }

    has(ip) {
        return this.blacklist.has(ip);
    }

    remove(ip) {
        this.blacklist.delete(ip);
    }
}

module.exports = new Blacklist();
