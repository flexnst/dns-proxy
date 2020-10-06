const express = require('express');
const config = require('../config/web.json');
const app = express();
const initHooks = require('./hooks');

initHooks(app);

module.exports = async function (ipAddress, resolver){

    app.get('/config', (req, res) => {
        res.json({
            server_ip: ipAddress,
            client_ip: req.ip_v4,
            domains: resolver.getForClient(req.ip_v4)
        });
    });

    app.post('/save', (req, res)=>{
        let domains = req.body;
        resolver.removeForClient(req.ip_v4);
        domains.forEach((domain) => {
            resolver.add(req.ip_v4, domain.name, domain.ip);
        });
        resolver.save();
        res.send('ok');
    });

    app.listen(config.port, () => {
        console.log(`Web: http://${ipAddress}:${config.port}`);
    });
};