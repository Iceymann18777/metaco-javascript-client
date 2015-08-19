var metaco = require("../../lib");
var http = require('http');

var assetsList = [];

var builder = metaco.GetClientBuilder();

var client = builder.withApiUrl("https://api.testnet.metaco.com/v1/").makeClient();

client.getAssets(function(err, assets) {
    if (err) {
        console.log(err);
        return;
    }

    console.log("assets fetched");
    assetsList = assets;
});

var requestListener = function (req, res) {
    res.writeHead(200);
    res.writeHead("Content-Type", "application/json")
    res.end(JSON.stringify(assetsList));
};

var server = http.createServer(requestListener);
server.listen(8080);
