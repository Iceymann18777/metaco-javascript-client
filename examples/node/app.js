var metaco = require("../../lib");
var http = require('http');

var assetsList = [];

var builder = new metaco.Builder();

var client = builder.withApiUrl("http://api.testnet.metaco.com/v1/").makeClient();

client.getAssets().then(function (assets) {
    console.log("assets fetched");
    assetsList = assets;
}).catch(function (err) {
    console.log(err);
});

var requestListener = function (req, res) {
    res.writeHead(200);
    res.writeHead("Content-Type", "application/json")
    res.end(JSON.stringify(assetsList));
};

var server = http.createServer(requestListener);
server.listen(8080);
