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