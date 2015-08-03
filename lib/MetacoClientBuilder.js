var MetacoClient = require("./client/MetacoClient");

function MetacoClientBuilder(HttpClient) {
    this.HttpClient = HttpClient;
}

MetacoClientBuilder.prototype.withApiUrl = function(apiUrl) {
    this.metacoApiUrl = apiUrl;
    return this;
};

MetacoClientBuilder.prototype.withApiId = function(apiId) {
    this.metacoApiId = apiId;
    return this;
};

MetacoClientBuilder.prototype.withApiKey = function(apiKey) {
    this.metacoApiKey = apiKey;
    return this;
};

MetacoClientBuilder.prototype.withTestingMode = function(testingMode) {
    this.metacoTestingMode = testingMode;
    return this;
};

MetacoClientBuilder.prototype.makeClient = function() {
    return new MetacoClient(this.HttpClient, this.metacoApiUrl, this.metacoApiId, this.metacoApiKey, this.metacoTestingMode);
};

module.exports = MetacoClientBuilder;