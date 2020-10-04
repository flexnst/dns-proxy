const ip = require('ip').address();
const dnsServer = require('./dns/dns-server');
const webServer = require('./web/web-server');

if (process.getuid() !== 0) {
    console.error(`Error: Root privileges required.`);
    process.exit(1);
}

dnsServer(ip);
webServer(ip);