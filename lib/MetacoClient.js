(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "./http/HttpClient"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("./http/HttpClient"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.HttpClient);
        global.MetacoClient = mod.exports;
    }
})(this, function (exports, _httpHttpClient) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var MetacoClient = (function () {
        function MetacoClient(metacoApiUrl, metacoApiId, metacoApiKey, metacoTestingMode) {
            _classCallCheck(this, MetacoClient);

            this.metacoApiId = metacoApiId;
            this.metacoApiKey = metacoApiKey;
            this.metacoApiUrl = metacoApiUrl;
            this.metacoTestingMode = metacoTestingMode;

            this.httpClient = new _httpHttpClient.HttpClient(this.metacoApiUrl, this.metacoApiId, this.metacoApiKey, this.metacoTestingMode);
        }

        _createClass(MetacoClient, [{
            key: "registerAccount",
            value: function registerAccount(request) {}
        }, {
            key: "getAccountStatus",
            value: function getAccountStatus() {}
        }, {
            key: "confirmPhoneNumber",
            value: function confirmPhoneNumber(request) {}
        }, {
            key: "getAssets",
            value: function getAssets() {
                return this.httpClient.doGet("assets");
            }
        }, {
            key: "getAsset",
            value: function getAsset(ticker) {
                return this.httpClient.doGet("assets/" + ticker);
            }
        }, {
            key: "getAssetsHistory",
            value: function getAssetsHistory(criteria, tickers) {}
        }, {
            key: "createOrder",
            value: function createOrder(_createOrder) {}
        }, {
            key: "getOrders",
            value: function getOrders() {}
        }, {
            key: "getOrder",
            value: function getOrder(id) {}
        }, {
            key: "submitSignedOrder",
            value: function submitSignedOrder(id, rawTransaction) {}
        }, {
            key: "cancelOrder",
            value: function cancelOrder(id) {}
        }, {
            key: "createTransaction",
            value: function createTransaction(newTransaction) {}
        }, {
            key: "broadcastTransaction",
            value: function broadcastTransaction(rawTransaction) {}
        }, {
            key: "getWalletDetails",
            value: function getWalletDetails(address) {}
        }, {
            key: "getLatestDebugData",
            value: function getLatestDebugData() {}
        }]);

        return MetacoClient;
    })();

    exports.MetacoClient = MetacoClient;
});
//# sourceMappingURL=MetacoClient.js.map