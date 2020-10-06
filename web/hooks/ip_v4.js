module.exports = function(req, res, next){
    req.ip_v4 = req.ip.match(/(\d+\.\d+\.\d+\.\d+)/im)[1];
    next();
}