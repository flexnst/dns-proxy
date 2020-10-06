const fs = require('fs');

const DOMAINS_FILE = './config/domains.json';

function Module() {
    this.domains = {};

    async function load() {
        return new Promise((resolve, reject)=>{
            fs.readFile(DOMAINS_FILE, { encoding: 'utf8', flag: 'r' }, (err, fileContents) => {
                if (err) {
                    console.log('Init resolver error.');
                    reject(err);
                }
                resolve(JSON.parse(fileContents));
            });
        });
    }

    this.init = async function() {
        this.domains = await load();
    };

    this.save = async function () {
        let storageJson = JSON.stringify(this.domains, null, 2);
        return new Promise((resolve, reject)=>{
            fs.writeFile(DOMAINS_FILE, storageJson, (err)=>{
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    this.add = function (clientIp, domain, targetIp) {
        if (!this.domains.hasOwnProperty(clientIp)) {
            this.domains[clientIp] = {};
        }

        this.domains[clientIp][domain] = targetIp;
    }

    this.remove = function (clientIp, domain) {
        delete this.domains[clientIp][domain];
    }

    this.removeForClient = function(clientIp) {
        delete this.domains[clientIp];
    }

    this.resolve = function(clientIp, domain) {
        try {
            return this.domains[clientIp][domain];
        } catch (err) {
            return null;
        }
    }

    this.getForClient = function (clientIp) {



        if ( !this.domains.hasOwnProperty(clientIp) ) {
            return [];
        }

        let domains = [];

        try{
            domains = Object.keys(this.domains[clientIp]).reduce((curr, domain, i)=>{
                curr.push({
                    name: domain,
                    ip: this.domains[clientIp][domain],
                })
                return curr;
            }, domains);
        } catch (err) {
            console.error(err);
        }
        return domains;
    }

    return this;
}

let instance;

async function getInstance() {
    if(!instance) {
        instance = new Module();
        await instance.init();
    }
    return instance;
}

module.exports = getInstance;