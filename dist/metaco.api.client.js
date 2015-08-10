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

/**
 * The general request callback for our methods
 *
 * @callback requestCallback
 * @param {object} errorDetails - Contains all the error details
 * @param {object} responseObject - The data object returned from the API
 */

/**
 * Register an account on Metaco
 * Sends an SMS to the provided phone number
 * Returns the API ID and API Keys
 *
 * If you are in debug mode, this request will return a HTTP header X-Metaco-DebugData with the validation code, it won't be send by SMS
 *
 * @see {@link http://docs.metaco.apiary.io/#reference/account/account-management/register-an-account} our online documentation.
 * @param {string} phoneNumber - The account phone number (E164 format)
 * @param {requestCallback} callback - The callback that handles the response
 */
MetacoClient.prototype.registerAccount = function(phoneNumber, callback) {
    var registerRequest = {
        phone: phoneNumber
    };
    this.httpClient.doPost("account", registerRequest, callback);
};

/**
 * Requires Authentication
 * Returns the details of an account (API Id, KYC Status and remaining trading amount)
 *
 * @see {@link http://docs.metaco.apiary.io/#reference/account/account-management/get-account-status} our online documentation.
 * @param {requestCallback} callback - The callback that handles the response
 */
MetacoClient.prototype.getAccountStatus = function(callback) {
    this.httpClient.doGet("account", callback);
};

/**
 * Requires Authentication
 * Validate the authenticated account, returns an error if there is a problem
 *
 * @see {@link http://docs.metaco.apiary.io/#reference/account/account-management/confirm-a-phone-number} our online documentation.
 * @param {string} code - The validation code sent by SMS (returned as header in debug mode)
 * @param {requestCallback} callback - The callback that handles the response
 */
MetacoClient.prototype.confirmPhoneNumber = function(code, callback) {
    var confirmRequest = {
        code: code
    };
    this.httpClient.doPost("account/confirmation", confirmRequest, callback);
};

/**
 * Returns all the available Assets and their details
 *
 * @see {@link http://docs.metaco.apiary.io/#reference/assets/assets-list/list-all-assets} our online documentation.
 * @param {requestCallback} callback - The callback that handles the response
 */
MetacoClient.prototype.getAssets = function(callback) {
    this.httpClient.doGet("assets", callback);
};

/**
 * Returns the selected Asset if it exists and its details
 *
 * @see {@link http://docs.metaco.apiary.io/#reference/assets/asset-information/retrieve-an-asset} our online documentation.
 * @param {string} ticker - The full ticker identifier (MTC:USD) of the requested asset
 * @param {requestCallback} callback - The callback that handles the response
 */
MetacoClient.prototype.getAsset = function(ticker, callback) {
    this.httpClient.doGet(extensions.formatString("assets/{0}", ticker), callback);
};

/**
 * Returns the history for the provided assets according to the given criteria
 * Assets must be given using this format : USD,XAU,etc..
 *
 * @see {@link http://docs.metaco.apiary.io/#reference/assets/assets-history/retrieve-history-of-all-assets} our online documentation.
 * @param {number} from - Timestamp from used for history start date.
 * @param {number} to - Timestamp to used for history end date.
 * @param {string} freq - Frequency freq of the history (for instance, 1m or 1d).
 * @param {boolean} asc - Ordering of the values.
 * @param {string|string[]} underlyings - The list of the required assets (comma separated string or array), identified by their underlyings (ex : MTC:USD -> USD)
 * @param {requestCallback} callback - The callback that handles the response
 */
MetacoClient.prototype.getAssetsHistory = function(from, to, freq, asc, underlyings, callback) {
    var tickerStr = "";
    if (underlyings == null) {
        tickerStr = "all";
    } else if (typeof(underlyings) !== "string") {
        for (var i = 0; i < underlyings.length; i++) {
            tickerStr += underlyings[i];
            if (i < underlyings.length - 1) {
                tickerStr += ",";
            }
        }
    } else {
        tickerStr = underlyings;
    }

    var url = extensions.formatString("assets/history?underlyings={0}&from={1}&to={2}&freq={3}&orderAsc={4}", tickerStr, from, to, freq, asc);

    this.httpClient.doGet(url, callback);

};

/**
 * Returns the history for the provided asset according to the given criteria
 * Assets must be given using this format : USD,XAU,etc..
 *
 * @see {@link http://docs.metaco.apiary.io/#reference/assets/assets-history/retrieve-history-of-all-assets} our online documentation.
 * @param {number} from - Timestamp from used for history start date.
 * @param {number} to - Timestamp to used for history end date.
 * @param {string} freq - Frequency freq of the history (for instance, 1m or 1d).
 * @param {boolean} asc - Ordering of the values.
 * @param {string|string[]} underlying - The required asset, identified by its underlying (ex : MTC:USD -> USD)
 * @param {requestCallback} callback - The callback that handles the response
 */
MetacoClient.prototype.getAssetHistory = function(from, to, freq, asc, underlying, callback) {
    this.getAssetsHistory(from, to, freq, asc, underlying, callback);
};

/**
 * Requires Authentication
 * Create an order using the provided parameters
 * This order will be created using the satoshi amount of the specified asset, this means that amountSatoshi is always satoshi-denominated. If you want 199000000 satoshi of USD then amountSatoshi is 199000000.
 * This order will be processed in our system
 * It will require your signature later when the trade state will be Signing
 *
 * @see {@link http://docs.metaco.apiary.io/#reference/orders/orders-management/request-an-order} our online documentation.
 * @param {string} type - Type of the order buy/sell or ask/bid
 * @param {string} ticker - The full ticker identifier (MTC:USD) of the requested asset
 * @param {number} amountSatoshi - Amount of the order in satoshi.
 * @param {string} recipientAddress - This address will receive the order, it will be used as default for the funding and change if they are not provided.
 * @param {string|string[]} fundingAddresses - (Optional, use null if you don't want to use it) This address will be used to set the order's funds if provided (Can be a string or a string array).
 * @param {string} changeAddress - (Optional, use null if you don't want to use it) This address will receive the change of the order if provided.
 * @param {string} webhookUrl - (Optional, use null if you don't want to use it) The webhook is an url called when the order's state is changing. (for example, { "apiId" : "...", "orderId" : "id", "state" : "Signing" }).
 * @param {requestCallback} callback - The callback that handles the response
 */
MetacoClient.prototype.createOrderFromSatoshiAmount = function(type, ticker, amountSatoshi, recipientAddress, fundingAddresses, changeAddress, webhookUrl, callback) {
    var fundingAddressesArray = [];
    if (typeof(fundingAddresses) === "string") {
        fundingAddressesArray.push(fundingAddresses);
    } else {
        fundingAddressesArray = fundingAddresses;
    }

    var order = {
        "ticker": ticker,
        "amount_satoshi": amountSatoshi,
        "recipient": recipientAddress,
        "funding": fundingAddressesArray,
        "change": changeAddress,
        "type": type,
        "webhook": webhookUrl
    };

    this.httpClient.doPost("orders", order, callback);
};

/**
 * Requires Authentication
 * Create an order using the provided parameters
 * This order will be created using the asset amount of the specified asset, this means that amountAsset an integer based on the divisibility of the asset as specified by v1/assets. (for example, USD divisibility is 2, if you want to buy 5 USD, then amountAsset should be equal to 500). If you want to buy 5 USD then amountAsset is 500.
 * This order will be processed in our system
 * It will require your signature later when the trade state will be Signing
 *
 * @see {@link http://docs.metaco.apiary.io/#reference/orders/orders-management/request-an-order} our online documentation.
 * @param {string} type - Type of the order buy/sell or ask/bid
 * @param {string} ticker - The full ticker identifier (MTC:USD) of the requested asset
 * @param {number} amountAsset - Amount of the order in asset value.
 * @param {string} recipientAddress - This address will receive the order, it will be used as default for the funding and change if they are not provided.
 * @param {string|string[]} fundingAddresses - (Optional, use null if you don't want to use it) This(those) address(addresses) will be used to set the order's funds if provided (Can be a string or a string array).
 * @param {string} changeAddress - (Optional, use null if you don't want to use it) This address will receive the change of the order if provided.
 * @param {string} webhookUrl - (Optional, use null if you don't want to use it) The webhook is an url called when the order's state is changing. (for example, { "apiId" : "...", "orderId" : "id", "state" : "Signing" }).
 * @param {requestCallback} callback - The callback that handles the response
 */
MetacoClient.prototype.createOrderFromAssetAmount = function(type, ticker, amountAsset, recipientAddress, fundingAddresses, changeAddress, webhookUrl, callback) {
    var fundingAddressesArray = [];
    if (typeof(fundingAddresses) === "string") {
        fundingAddressesArray.push(fundingAddresses);
    } else {
        fundingAddressesArray = fundingAddresses;
    }

    var order = {
        "ticker": ticker,
        "amount_asset": amountAsset,
        "recipient": recipientAddress,
        "funding": fundingAddressesArray,
        "change": changeAddress,
        "type": type,
        "webhook": webhookUrl
    };

    this.httpClient.doPost("orders", order, callback);
};

/**
 * Requires Authentication
 * Returns the user's orders
 *
 * @see {@link http://docs.metaco.apiary.io/#reference/orders/orders-management/list-all-orders} our online documentation.
 * @param {requestCallback} callback - The callback that handles the response
 */
MetacoClient.prototype.getOrders = function(callback) {
    this.httpClient.doGet("orders", callback);
};

/**
 * Requires Authentication
 * Returns the requested order object
 *
 * @see {@link http://docs.metaco.apiary.io/#reference/orders/order-information/retreive-an-order} our online documentation.
 * @param {string} id - The order id
 * @param {requestCallback} callback - The callback that handles the response
 */
MetacoClient.prototype.getOrder = function(id, callback) {
    var url = extensions.formatString("orders/{0}", id);
    this.httpClient.doGet(url, callback);
};

/**
 * Requires Authentication
 * Submit a signed order
 * You have to sign each of your inputs of the selected order (you will get those details by fetching the orders)
 * Then encode the transaction in hexadecimal and send it here
 *
 * @see {@link http://docs.metaco.apiary.io/#reference/orders/order-information/submit-a-signed-order} our online documentation.
 * @param {string} id - The order id
 * @param {string} rawTransaction - The signed raw transaction encoded in hexadecimal
 * @param {requestCallback} callback - The callback that handles the response
 */
MetacoClient.prototype.submitSignedOrder = function(id, rawTransaction, callback) {
    var url = extensions.formatString("orders/{0}", id);

    var signedOrderToSubmit = {
        raw: rawTransaction
    };

    this.httpClient.doPost(url, signedOrderToSubmit, callback);
};

/**
 * Requires Authentication
 * Cancel the specified order
 *
 * @see {@link http://docs.metaco.apiary.io/#reference/orders/order-information/cancel-an-order} our online documentation.
 * @param {string} id - The order id
 * @param {requestCallback} callback - The callback that handles the response
 */
MetacoClient.prototype.cancelOrder = function(id, callback) {
    var url = extensions.formatString("orders/{0}", id);
    this.httpClient.doDelete(url, callback);
};

/**
 * Requires Authentication
 * Create a Transaction using the provided parameters
 * This transaction will be created using the asset amount of the specified asset, this means that amountAsset an integer based on the divisibility of the asset as specified by v1/assets. (for example, USD divisibility is 2, if you want to transfer 5 USD, then amountAsset should be equal to 500). If you want to transfer 5 USD then amountAsset is 500.
 *
 * @param {number} amountAsset - Amount of the order in asset value.
 * @param {string} ticker - The full ticker identifier (MTC:USD) of the requested asset
 * @param {string} from - The address where the funds will be taken for the transaction
 * @param {string} to - The address which will receive the funds of the transaction
 * @param {string} change - (Optional, use null if you don't want to use it) This address will receive the change of the order if provided
 * @param {number} feePerKB - (Optional, use null if you don't want to use it) This will set the amount of fees per KB of the transaction
 * @param {requestCallback} callback - The callback that handles the response
 * @see {@link http://docs.metaco.apiary.io/#reference/transactions/raw-transaction/get-a-raw-transaction} our online documentation.
 */
MetacoClient.prototype.createTransactionFromAssetAmount = function(amountAsset, ticker, from, to, change, feePerKB, callback) {

    var url = "transactions/raw?";

    if (amountAsset != null) {
        url += extensions.formatString("amount_asset={0}&", amountAsset);
    }
    if (ticker != null) {
        url += extensions.formatString("ticker={0}&", ticker);
    }
    if (from != null) {
        url += extensions.formatString("from={0}&", from);
    }
    if (to != null) {
        url += extensions.formatString("to={0}&", to);
    }
    if (change != null) {
        url += extensions.formatString("change={0}&", change);
    }
    if (feePerKB != null) {
        url += extensions.formatString("feePerKB={0}&", feePerKB);
    }

    url = url.slice(0, url.length - 1);

    this.httpClient.doGet(url, callback);
};

/**
 * Requires Authentication
 * Create a Transaction using the provided parameters
 * This transaction will be created using the satoshi amount of the specified asset, this means that amountSatoshi is always satoshi-denominated. If you want to transfer 199000000 satoshi of USD then amountSatoshi is 199000000.
 *
 * @param {number} amountSatoshi - Amount of the order in satoshi value.
 * @param {string} ticker - The full ticker identifier (MTC:USD) of the requested asset
 * @param {string} from - The address where the funds will be taken for the transaction
 * @param {string} to - The address which will receive the funds of the transaction
 * @param {string} change - (Optional, use null if you don't want to use it) This address will receive the change of the order if provided
 * @param {number} feePerKB - (Optional, use null if you don't want to use it) This will set the amount of fees per KB of the transaction
 * @param {requestCallback} callback - The callback that handles the response
 * @see {@link http://docs.metaco.apiary.io/#reference/transactions/raw-transaction/get-a-raw-transaction} our online documentation.
 */
MetacoClient.prototype.createTransactionFromSatoshiAmount = function(amountSatoshi, ticker, from, to, change, feePerKB, callback) {

    var url = "transactions/raw?";

    if (amountSatoshi != null) {
        url += extensions.formatString("amount_satoshi={0}&", amountSatoshi);
    }
    if (ticker != null) {
        url += extensions.formatString("ticker={0}&", ticker);
    }
    if (from != null) {
        url += extensions.formatString("from={0}&", from);
    }
    if (to != null) {
        url += extensions.formatString("to={0}&", to);
    }
    if (change != null) {
        url += extensions.formatString("change={0}&", change);
    }
    if (feePerKB != null) {
        url += extensions.formatString("feePerKB={0}&", feePerKB);
    }

    url = url.slice(0, url.length - 1);

    this.httpClient.doGet(url, callback);
};

/**
 * Requires Authentication
 * Submit a signed transaction
 * You have to sign each of your inputs of the selected transaction (you will get those details when creating the transaction through Metaco)
 * Then encode the transaction in hexadecimal and send it here
 *

 * @param {string} rawTransaction - The signed raw transaction encoded in hexadecimal
 * @param {requestCallback} callback - The callback that handles the response
 * @see {@link http://docs.metaco.apiary.io/#reference/transactions/transaction-broadcast/broadcast-a-transaction} our online documentation.
 */
MetacoClient.prototype.broadcastTransaction = function(rawTransaction, callback) {
    var signedTransactionToSubmit = {
        raw: rawTransaction
    };

    this.httpClient.doPost("transactions", signedTransactionToSubmit, callback);
};

/**
 * Requires Authentication
 * Returns the current wallet state
 * Contains the current balances, the values and the transaction history
 *
 * @param {string} address - The wallet's address
 * @param {requestCallback} callback - The callback that handles the response
 * @see {@link http://docs.metaco.apiary.io/#reference/transactions/transaction-broadcast/fetch-wallet-information} our online documentation.
 */
MetacoClient.prototype.getWalletDetails = function(address, callback) {
    var url = extensions.formatString("transactions/{0}", address);
    this.httpClient.doGet(url, callback);
};

/**
 * For testing purposes only
 * On some requests, when you use the TestingMode of the client, you will get a DebugData, which will simplify the testing of the API and the client
 * As an example, a debugData could be the fake validationCode when your register an account.
 */
MetacoClient.prototype.getLatestDebugData = function() {
    return this.httpClient.getLatestDebugData();
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

    if (MetacoErrors.values.hasOwnProperty(jsonContent && jsonContent !== null && jsonContent.metaco_error)) {
        metacoErrorType = MetacoErrors.keys[MetacoErrors.values[jsonContent.metaco_error]];
    } else {
        if (httpCode == 404) {
            metacoErrorType = MetacoErrors.keys.NOT_FOUND;
        } else if (httpCode == 401) {
            metacoErrorType = MetacoErrors.keys.UNAUTHORIZED;
        } else if (!httpServerErrorRegex.test(httpCode.toString())) {
            metacoErrorType = MetacoErrors.keys.SERVER_ERROR;
        } else {
            metacoErrorType = MetacoErrors.keys.UNKNOWN_ERROR;
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