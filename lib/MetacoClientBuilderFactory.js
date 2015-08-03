var MetacoClientBuilder = require("./MetacoClientBuilder");

function MetacoClientBuilderFactory() {}

MetacoClientBuilderFactory.prototype.makeClientBuilderWithHttpClient = function(httpClient) {
    return new MetacoClientBuilder(httpClient);
};

module.exports = MetacoClientBuilderFactory;