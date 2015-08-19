var MetacoClientBuilderFactory = require ("./MetacoClientBuilderFactory");
var HttpClient = require("./http/BrowserHttpClient");
var MetacoErrors = require("./errors/MetacoErrors");
var BitcoinAddressUtils = require("./utils/BitcoinAddressUtils");


function GetClientBuilder() {
    return new MetacoClientBuilderFactory().makeClientBuilderWithHttpClient(HttpClient);
}

(function (__window__) {
    __window__.metaco = __window__.metaco || {};
    __window__.metaco.GetClientBuilder = GetClientBuilder;
    __window__.metaco.MetacoErrors = MetacoErrors.keys;
    __window__.metaco.BitcoinAddressUtils = BitcoinAddressUtils;
}(window));