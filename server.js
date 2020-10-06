if (process.getuid() !== 0) {
    console.error(`Error: Root privileges required.`);
    process.exit(1);
}

const ip = require('ip').address();
const dnsServer = require('./dns/dns-server');
const webServer = require('./web/web-server');

async function init() {
    const resolver = require('./dns/resolver.js');
    let resolverInstance = await resolver();
    dnsServer(ip, resolverInstance);
    webServer(ip, resolverInstance);
}

init();