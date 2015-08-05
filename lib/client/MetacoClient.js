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
MetacoClient.prototype.getLatestDebugData = function() {
    return this.httpClient.getLatestDebugData();
};

module.exports = MetacoClient;