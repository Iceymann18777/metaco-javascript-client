(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'module', './MetacoClient', './MetacoClientBuilder'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module, require('./MetacoClient'), require('./MetacoClientBuilder'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, mod, global.MetacoClient, global.MetacoClientBuilder);
        global.index = mod.exports;
    }
})(this, function (exports, module, _MetacoClient, _MetacoClientBuilder) {
    'use strict';

    module.exports = {
        Builder: _MetacoClientBuilder.MetacoClientBuilder,
        Client: _MetacoClient.MetacoClient
    };
});
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
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', './MetacoClient'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('./MetacoClient'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.MetacoClient);
        global.MetacoClientBuilder = mod.exports;
    }
})(this, function (exports, _MetacoClient) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var MetacoClientBuilder = (function () {
        function MetacoClientBuilder() {
            _classCallCheck(this, MetacoClientBuilder);

            this.metacoApiId = null;
            this.metacoApiKey = null;
            this.metacoApiUrl = null;
            this.metacoTestingMode = null;
        }

        _createClass(MetacoClientBuilder, [{
            key: 'makeClient',
            value: function makeClient() {
                return new _MetacoClient.MetacoClient(this.metacoApiUrl, this.metacoApiId, this.metacoApiKey, this.metacoTestingMode);
            }
        }, {
            key: 'withApiId',
            value: function withApiId(apiId) {
                this.metacoApiId = apiId;
                return this;
            }
        }, {
            key: 'withApiKey',
            value: function withApiKey(apiKey) {
                this.metacoApiKey = apiKey;
                return this;
            }
        }, {
            key: 'withApiUrl',
            value: function withApiUrl(apiUrl) {
                this.metacoApiUrl = apiUrl;
                return this;
            }
        }, {
            key: 'withTestingMode',
            value: function withTestingMode(testingMode) {
                this.metacoTestingMode = testingMode;
                return this;
            }
        }]);

        return MetacoClientBuilder;
    })();

    exports.MetacoClientBuilder = MetacoClientBuilder;
});
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.ErrorHandler = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var ErrorHandler = (function () {
        function ErrorHandler() {
            _classCallCheck(this, ErrorHandler);
        }

        _createClass(ErrorHandler, null, [{
            key: "HandleError",
            value: function HandleError() {}
        }]);

        return ErrorHandler;
    })();

    exports.ErrorHandler = ErrorHandler;
});
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports', 'superagent', 'es6-promise'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('superagent'), require('es6-promise'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Request, global.es6Promise);
        global.HttpClient = mod.exports;
    }
})(this, function (exports, _superagent, _es6Promise) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var _Request = _interopRequireDefault(_superagent);

    var HttpClient = (function () {
        function HttpClient(metacoApiUrl, metacoApiId, metacoApiKey, metacoTestingMode) {
            _classCallCheck(this, HttpClient);

            this.metacoApiId = metacoApiId;
            this.metacoApiKey = metacoApiKey;
            this.metacoApiUrl = metacoApiUrl;
            this.metacoTestingMode = metacoTestingMode;
        }

        _createClass(HttpClient, [{
            key: 'doGet',
            value: function doGet(url) {

                var self = this;

                return new _es6Promise.Promise(function (resolve, reject) {
                    _Request['default'].get(self.getUrl(url)).set(self.getHeaders()).end(function (err, res) {
                        if (res.status === 404) {
                            reject();
                        } else {
                            resolve(JSON.parse(res.text));
                        }
                    });
                });
            }
        }, {
            key: 'doPost',
            value: function doPost(url, data) {
                return new _es6Promise.Promise(function (resolve, reject) {
                    _Request['default'].post(this.getUrl(url)).send(data).set(this.getHeaders()).end(function (err, res) {
                        if (res.status === 404) {
                            reject();
                        } else {
                            resolve(JSON.parse(res.text));
                        }
                    });
                });
            }
        }, {
            key: 'doDelete',
            value: function doDelete(url) {
                return new _es6Promise.Promise(function (resolve, reject) {
                    _Request['default']['delete'](getUrl(url)).set(getHeaders()).end(function (err, res) {
                        if (res.status === 404) {
                            reject();
                        } else {
                            resolve(JSON.parse(res.text));
                        }
                    });
                });
            }
        }, {
            key: 'getUrl',
            value: function getUrl(relativePart) {
                return this.metacoApiUrl + relativePart;
            }
        }, {
            key: 'getHeaders',
            value: function getHeaders() {
                var headers = {};
                if (this.metacoApiId && this.metacoApiId !== "" && this.metacoApiKey && this.metacoApiKey !== "") {
                    headers["X-Metaco-Id"] = this.metacoApiId;
                    headers["X-Metaco-Key"] = this.metacoApiKey;
                }

                if (this.metacoTestingMode) {
                    headers["X-Metaco-Debug"] = true;
                }

                return headers;
            }
        }]);

        return HttpClient;
    })();

    exports.HttpClient = HttpClient;
});
//# sourceMappingURL=new.js.map