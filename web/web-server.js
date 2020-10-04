const express = require('express');
const config = require('../config/web.json');
const app = express();

module.exports = async function (ipAddress){
    app.get('/', (req, res) => {
        res.send('Hello World!');
    })

    app.on('error', ()=>{
        console.error(`Web-server must started with root-privileges!`);
    });

    app.listen(config.port, () => {
        console.log(`Web: http://${ipAddress}:${config.port}`);
    });
};