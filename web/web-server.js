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

    app.post('/save', (req, res) => {
        let domain = req.body;
        if (domain.old_name) {
            resolver.remove(req.ip_v4, domain.old_name);
        }
        resolver.add(req.ip_v4, domain.name, domain.ip);
        resolver.save();
        res.send('ok');
    });

    app.post('/delete', (req, res) => {
        let domain = req.body;
        resolver.remove(req.ip_v4, domain.name);
        resolver.save();
        res.send('ok');
    });

    app.listen(config.port, () => {
        console.log(`Web: http://${ipAddress}:${config.port}`);
    });
};