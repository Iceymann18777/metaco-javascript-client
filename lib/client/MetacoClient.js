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
 * @param {string} ticker - Timestamp to used for history end date.
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
 * This order will be created using the asset amount of the specified asset, this means that amountAsset an integer based on the divisibility of the asset as specified by v1/assets. (for example, USD divisibility is 2, if you want to buy 5 USD, then amount_asset should be equal to 500). If you want to buy 5 USD then amount_asset is 500.
 * This order will be processed in our system
 * It will require your signature later when the trade state will be Signing
 *
 * @see {@link http://docs.metaco.apiary.io/#reference/orders/orders-management/request-an-order} our online documentation.
 * @param {string} type - Type of the order buy/sell or ask/bid
 * @param {string} ticker - Timestamp to used for history end date.
 * @param {number} amountAsset - Amount of the order in asset value.
 * @param {string} recipientAddress - This address will receive the order, it will be used as default for the funding and change if they are not provided.
 * @param {string|string[]} fundingAddresses - (Optional, use null if you don't want to use it) This address will be used to set the order's funds if provided (Can be a string or a string array).
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

MetacoClient.prototype.createTransaction = function(newTransaction, callback) {

};
MetacoClient.prototype.broadcastTransaction = function(rawTransaction, callback) {

};
MetacoClient.prototype.getWalletDetails = function(address, callback) {

};
MetacoClient.prototype.getLatestDebugData = function() {
    return this.httpClient.getLatestDebugData();
};

module.exports = MetacoClient;