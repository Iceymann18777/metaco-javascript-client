var ErrorHandler = require("../errors/ErrorHandler");

function NodeHttpClient(metacoApiUrl, metacoApiId, metacoApiKey, metacoTestingMode) {
    this.metacoApiId = metacoApiId;
    this.metacoApiKey = metacoApiKey;
    this.metacoApiUrl = metacoApiUrl;
    this.metacoTestingMode = metacoTestingMode;

    this.getAbsoluteUri = function (relativeUri) {
        return this.metacoApiUrl + relativeUri;
    };

    this.getHeaders = function () {
        var headers = [];

        headers.push({name: "Content-type", value: "application/json"});

        if (this.metacoApiId && this.metacoApiId !== "" &&
            this.metacoApiKey && this.metacoApiKey !== "") {
            headers.push({name: "X-Metaco-Id", value: this.metacoApiId});
            headers.push({name: "X-Metaco-Key", value: this.metacoApiKey});
        }

        if (this.metacoTestingMode) {
            headers.push({name: "X-Metaco-Debug", value: true});
        }

        return headers;
    };

    this.doHttpRequest = function (type, relativeUrl, callback, dataObject) {

    }
}

NodeHttpClient.prototype.doGet = function (relativeUrl, callback) {
    return this.doAjaxRequest("GET", relativeUrl, callback, null);
};

NodeHttpClient.prototype.doPost = function (relativeUrl, dataObject, callback) {
    return this.doAjaxRequest("POST", relativeUrl, callback, dataObject);
};

NodeHttpClient.prototype.doDelete = function (relativeUrl, callback) {
    return this.doAjaxRequest("DELETE", relativeUrl, callback, null);
};

module.exports = NodeHttpClient;