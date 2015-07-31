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
//# sourceMappingURL=MetacoClientBuilder.js.map