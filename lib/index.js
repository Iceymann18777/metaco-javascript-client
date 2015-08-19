var MetacoClientBuilderFactory = require ("./MetacoClientBuilderFactory");
var HttpClient = require("./http/NodeHttpClient");
var BitcoinAddressUtils = require("./utils/BitcoinAddressUtils");

function GetClientBuilder() {
    return new MetacoClientBuilderFactory().makeClientBuilderWithHttpClient(HttpClient);
}

module.exports = {
    GetClientBuilder: GetClientBuilder,
    BitcoinAddressUtils: BitcoinAddressUtils
};