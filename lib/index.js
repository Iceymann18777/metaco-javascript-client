var MetacoClientBuilderFactory = require ("./MetacoClientBuilderFactory");
var HttpClient = require("./http/NodeHttpClient");

function GetClientBuilder() {
    return new MetacoClientBuilderFactory().makeClientBuilderWithHttpClient(HttpClient);
}

module.exports = {
    GetClientBuilder: GetClientBuilder
};