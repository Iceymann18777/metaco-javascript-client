(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./client/MetacoClient":3}],2:[function(require,module,exports){
var MetacoClientBuilder = require("./MetacoClientBuilder");

function MetacoClientBuilderFactory() {}

MetacoClientBuilderFactory.prototype.makeClientBuilderWithHttpClient = function(httpClient) {
    return new MetacoClientBuilder(httpClient);
};

module.exports = MetacoClientBuilderFactory;
},{"./MetacoClientBuilder":1}],3:[function(require,module,exports){
var extensions = require("../utils/Extensions");

function MetacoClient(HttpClient, metacoApiUrl, metacoApiId, metacoApiKey, metacoTestingMode) {
    this.metacoApiId = metacoApiId;
    this.metacoApiKey = metacoApiKey;
    this.metacoApiUrl = metacoApiUrl;
    this.metacoTestingMode = metacoTestingMode;

    this.httpClient = new HttpClient(this.metacoApiUrl, this.metacoApiId, this.metacoApiKey, this.metacoTestingMode);
}

MetacoClient.prototype.registerAccount = function(request, callback) {

};
MetacoClient.prototype.getAccountStatus = function(callback) {

};
MetacoClient.prototype.confirmPhoneNumber = function(request, callback) {

};

MetacoClient.prototype.getAssets = function(callback) {
    this.httpClient.doGet("assets", callback);
};

MetacoClient.prototype.getAsset = function(ticker, callback) {
    this.httpClient.doGet(extensions.formatString("assets/{0}", ticker), callback);
};

MetacoClient.prototype.getAssetsHistory = function(from, to, freq, asc, tickers, callback) {
    var tickerStr = "";
    if (tickers == null) {
        tickerStr = "all";
    } else if (typeof(tickers) !== "string") {
        for (var i = 0; i < tickers.length; i++) {
            tickerStr += tickers[i];
            if (i < tickers.length - 1) {
                tickerStr += ",";
            }
        }
    } else {
        tickerStr = tickers;
    }

    var url = extensions.formatString("assets/history?underlyings={0}&from={1}&to={2}&freq={3}&orderAsc={4}", tickerStr, from, to, freq, asc);

    this.httpClient.doGet(url, callback);

};
MetacoClient.prototype.getAssetHistory = function(from, to, freq, asc, tickers, callback) {
    this.getAssetsHistory(from, to, freq, asc, tickers, callback);
};
MetacoClient.prototype.createOrder = function(createOrder, callback) {

};
MetacoClient.prototype.getOrders = function(callback) {

};
MetacoClient.prototype.getOrder = function(id, callback) {

};
MetacoClient.prototype.submitSignedOrder = function(id, rawTransaction, callback) {

};
MetacoClient.prototype.cancelOrder = function(id, callback) {

};
MetacoClient.prototype.createTransaction = function(newTransaction, callback) {

};
MetacoClient.prototype.broadcastTransaction = function(rawTransaction, callback) {

};
MetacoClient.prototype.getWalletDetails = function(address, callback) {

};
MetacoClient.prototype.getLatestDebugData = function(callback) {

};

module.exports = MetacoClient;
},{"../utils/Extensions":8}],4:[function(require,module,exports){
var MetacoErrors = require ("./MetacoErrors");

var ErrorHandler = {};

var httpOkRegex = /^2[0-9]{2}/;
var httpServerErrorRegex = /^2[0-9]{2}/;

function hasError(httpCode, jsonContent) {
    return !httpOkRegex.test(httpCode.toString());
}

function makeError(statusCode, content, originalError, errorType) {
    return {
        statusCode: statusCode,
        content: content,
        originalError: originalError,
        errorType: errorType
    }
}

ErrorHandler.handleError = function (httpCode, textContent) {

    var jsonContent = null;
    var metacoErrorType = null;

    try {
        jsonContent = JSON.parse(textContent);
    } catch (e) {
        jsonContent = null;
    }

    if (!hasError(httpCode, jsonContent)) {
        return null;
    }

    if (MetacoErrors.values.hasOwnProperty(jsonContent.metaco_error)) {
        metacoErrorType = MetacoErrors.keys[MetacoErrors.values[jsonContent.metaco_error]];
    } else {
        if (httpCode == 404) {
            type = MetacoErrors.keys.NOT_FOUND;
        } else if (httpCode == 401) {
            type = MetacoErrors.keys.UNAUTHORIZED;
        } else if (!httpServerErrorRegex.test(httpCode.toString())) {
            type = MetacoErrors.keys.SERVER_ERROR;
        } else {
            type = MetacoErrors.keys.UNKNOWN_ERROR;
        }
    }

    return makeError(httpCode, textContent, jsonContent, metacoErrorType);
};

module.exports = ErrorHandler;
},{"./MetacoErrors":5}],5:[function(require,module,exports){
var keys = {

    INVALID_INPUT: "invalid_input",
    API_CALLS_QUOTA_EXCEEDED: "api_calls_quota_exceeded",
    SMS_SENDING_FAILED: "sms_sending_failed",
    PHONE_CONFIRMATION_NOT_FOUND: "phone_confirmation_not_found",
    INVALID_CONFIRMATION_CODE: "invalid_confirmation_code",
    ORDER_NOT_FOUND: "order_not_found",
    NOT_ENOUGH_FUNDS: "not_enough_funds",
    ORDER_TOO_SMALL: "order_too_small",
    ORDER_COUNT_LIMIT_EXCEEDED: "order_count_limit_exceeded",
    YEARLY_TRANSACTION_QUOTA_EXCEEDED: "yearly_transaction_quota_exceeded",
    MAXIMUM_TRANSACTION_AMOUNT_EXCEEDED: "maximum_transaction_amount_exceeded",
    ORDER_NOT_CANCELLABLE: "order_not_cancellable",
    UNAUTHORIZED: "unauthorized",
    NOT_FOUND: "notfound",
    SERVER_ERROR: "servererror",
    UNKNOWN_ERROR: "unknownerror"
};

function reverseKeys(original) {
    var values = {};

    for (var key in keys) {
        if (keys.hasOwnProperty(key)) {
            values[original[key]] = key;
        }
    }

    return values;
}

var values = reverseKeys(keys);

module.exports = {
    keys: keys,
    values: values
};
},{}],6:[function(require,module,exports){
var ErrorHandler = require("../errors/ErrorHandler");

function BrowserHttpClient(metacoApiUrl, metacoApiId, metacoApiKey, metacoTestingMode) {
    this.metacoApiId = metacoApiId;
    this.metacoApiKey = metacoApiKey;
    this.metacoApiUrl = metacoApiUrl;
    this.metacoTestingMode = metacoTestingMode;

    this.getAbsoluteUri = function (relativeUri) {
        return this.metacoApiUrl + relativeUri;
    };

    this.getHeaders = function () {
        var headers = [];

        headers.push({name: "X-Requested-With", value: "XMLHttpRequest"});
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

    this.doAjaxRequest = function (type, relativeUrl, callback, dataObject) {
        try {

            var headers = this.getHeaders();
            var absoluteUrl = this.getAbsoluteUri(relativeUrl);
            var jsonData = JSON.stringify(dataObject);

            var x = new(window.XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');

            x.open(type, absoluteUrl, 1);

            for(var header in headers) {
                if (headers.hasOwnProperty(header)) {
                    x.setRequestHeader(header.name, header.value);
                }
            }

            x.onreadystatechange = function () {
                if (x.readyState > 3) {
                    var text = x.responseText;

                    var error = ErrorHandler.handleError(x.status, text);

                    if (error) {
                        callback(error, null);
                    } else {
                        callback(error, JSON.parse(text));
                    }
                }
            };

            x.send(jsonData)

        } catch (e) {
            var error = ErrorHandler.handleError(null, e.toString());
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

module.exports = BrowserHttpClient;
},{"../errors/ErrorHandler":4}],7:[function(require,module,exports){
var MetacoClientBuilderFactory = require ("./MetacoClientBuilderFactory");
var HttpClient = require("./http/BrowserHttpClient");
var MetacoErrors = require("./errors/MetacoErrors");


function GetClientBuilder() {
    return new MetacoClientBuilderFactory().makeClientBuilderWithHttpClient(HttpClient);
}

(function (__window__) {
    __window__.metaco = __window__.metaco || {};
    __window__.metaco.GetClientBuilder = GetClientBuilder;
    __window__.metaco.MetacoErrors = MetacoErrors.keys;
}(window));
},{"./MetacoClientBuilderFactory":2,"./errors/MetacoErrors":5,"./http/BrowserHttpClient":6}],8:[function(require,module,exports){
var extensions = {};

extensions.formatString = function(template) {
    for (var i = 0; i < arguments.length - 1; i++) {
        var regexp = new RegExp('\\{'+i+'\\}', 'gi');
        template = template.replace(regexp, arguments[i + 1]);
    }
    return template;
};

module.exports = extensions;
},{}]},{},[7])


//# sourceMappingURL=metaco.api.client.js.map