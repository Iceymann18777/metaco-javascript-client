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
//# sourceMappingURL=../http/HttpClient.js.map