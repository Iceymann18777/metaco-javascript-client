// Karma configuration
// Generated on Tue Mar 24 2015 10:32:50 GMT+0100 (Romance Standard Time)

module.exports = function(config) {
    config.set({

        basePath: "",
        frameworks: ['phantomjs-shim', 'browserify', 'source-map-support', 'jasmine'],
        files: [
            'lib/**/*.js',
            'test/**/*.js'
        ],

        exclude: [
        ],

        preprocessors: {
            'lib/**/*.js': ['browserify'],
            'test/**/*.js': ['browserify', 'env']
        },

        envPreprocessor: [
            'METACO_ENV_API_URL',
            'METACO_ENV_API_ID',
            'METACO_ENV_API_KEY',
            'METACO_ENV_WALLET_PRIVATE_KEY_HEX'
        ],

        browserify: {
            debug: true
        },

        browserDisconnectTimeout : 10000, // default 2000
        browserDisconnectTolerance : 1, // default 0
        browserNoActivityTimeout : 60000, //default 10000

        customLaunchers: {
            'PhantomJS_withoutCORS': {
                base: 'PhantomJS',
                options: {
                    settings: {
                        webSecurityEnabled: false
                    }
                }
            }
        },

        browsers: ['PhantomJS_withoutCORS'],
        singleRun: true,
        reporters: ["teamcity"],
        logLevel: config.LOG_INFO
    });
};