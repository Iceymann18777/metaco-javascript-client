var ErrorHandler = require("../errors/ErrorHandler");
var request = require('request');

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

        var headers = this.getHeaders();
        var absoluteUri = this.getAbsoluteUri(relativeUrl);
        var jsonData = JSON.stringify(dataObject);

        var options = {
            url: absoluteUri,
            method: type,
            headers: {},
            body: jsonData
        };

        for(var header in headers) {
            if (headers.hasOwnProperty(header)) {
                options.headers[header.name] = header.value;
            }
        }

        function requestCallback(error, response, body) {

            var metacoError = null;

            if (error) {
                metacoError = ErrorHandler.handleError(0, error.toString());
                return callback(metacoError, null);
            }

            metacoError = ErrorHandler.handleError(response.statusCode, body);

            if (error) {
                return callback(metacoError, null);
            } else {
                return callback(metacoError, JSON.parse(body));
            }
        }

        request(options, requestCallback);
    }
}

NodeHttpClient.prototype.doGet = function (relativeUrl, callback) {
    return this.doHttpRequest("GET", relativeUrl, callback, null);
};

NodeHttpClient.prototype.doPost = function (relativeUrl, dataObject, callback) {
    return this.doHttpRequest("POST", relativeUrl, callback, dataObject);
};

NodeHttpClient.prototype.doDelete = function (relativeUrl, callback) {
    return this.doHttpRequest("DELETE", relativeUrl, callback, null);
};

module.exports = NodeHttpClient;