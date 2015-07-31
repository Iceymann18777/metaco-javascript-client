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
//# sourceMappingURL=index.js.map