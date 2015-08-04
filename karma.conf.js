module.exports = function(config) {
    config.set({

        basePath: '',
        frameworks: ['browserify', 'source-map-support', 'jasmine'],

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

        browsers: ['PhantomJS'],
        singleRun: false
    });
};