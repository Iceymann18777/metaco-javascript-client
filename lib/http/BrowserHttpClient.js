var ErrorHandler = require("../errors/ErrorHandler");

function BrowserHttpClient(metacoApiUrl, metacoApiId, metacoApiKey, metacoTestingMode) {
    this.metacoApiId = metacoApiId;
    this.metacoApiKey = metacoApiKey;
    this.metacoApiUrl = metacoApiUrl;
    this.metacoTestingMode = metacoTestingMode;
    this.latestDebugData = null;

    this.handleDebugData = function(xhr) {
        this.latestDebugData = null;
        this.latestDebugData = xhr.getResponseHeader('X-Metaco-DebugData');
    };

    this.getAbsoluteUri = function (relativeUri) {
        return this.metacoApiUrl + relativeUri;
    };

    this.getHeaders = function () {
        var headers = [];

        headers.push({name: "X-Requested-With", value: "XMLHttpRequest"});
        headers.push({name: "Content-type", value: "application/json"});
        headers.push({name: "Accept", value: "application/json"});

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

    this.doAjaxRequest = function (type, relativeUrl, callback, dataObject) {
        try {

            var _this = this;

            var headers = this.getHeaders();
            var absoluteUrl = this.getAbsoluteUri(relativeUrl);
            var jsonData = JSON.stringify(dataObject);

            var x = new(window.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');

            x.open(type, absoluteUrl, 1);

            for(var header in headers) {
                if (headers.hasOwnProperty(header)) {
                    x.setRequestHeader(headers[header].name, headers[header].value);
                }
            }

            x.onreadystatechange = function () {
                if (x.readyState > 3) {
                    var text = x.responseText;

                    var error = ErrorHandler.handleError(x.status, text);

                    _this.handleDebugData(x);

                    if (error) {
                        callback(error, null);
                    } else {
                        var json = true;

                        try {
                            json = JSON.parse(text);
                        } catch(e) {}

                        callback(error, json);
                    }
                }
            };

            x.send(jsonData)

        } catch (e) {
            var error = ErrorHandler.handleError(0, e.toString());
            callback(error, null);
        }
    }
}

BrowserHttpClient.prototype.doGet = function (relativeUrl, callback) {
    return this.doAjaxRequest("GET", relativeUrl, callback, null);
};

BrowserHttpClient.prototype.doPost = function (relativeUrl, dataObject, callback) {
    return this.doAjaxRequest("POST", relativeUrl, callback, dataObject);
};

BrowserHttpClient.prototype.doDelete = function (relativeUrl, callback) {
    return this.doAjaxRequest("DELETE", relativeUrl, callback, null);
};

BrowserHttpClient.prototype.getLatestDebugData = function () {
    return this.latestDebugData;
};

module.exports = BrowserHttpClient;