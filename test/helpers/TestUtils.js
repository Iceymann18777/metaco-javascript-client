const METACO_ENV_API_URL_NAME = "METACO_ENV_API_URL";
const METACO_ENV_API_ID_NAME = "METACO_ENV_API_ID";
const METACO_ENV_API_KEY_NAME = "METACO_ENV_API_KEY";
const METACO_ENV_WALLET_PRIVATE_KEY_HEX_NAME = "METACO_ENV_WALLET_PRIVATE_KEY_HEX";
const DEFAULT_API_URL = "http://api.testnet.metaco.com/v1/";

var TestUtils = {};

TestUtils.getMetacoModule = function () {
    if (process && process.title !== "browser") {
        return require("../../lib/index");
    } else {
        return window.metaco;
    }
};

TestUtils.getEnvironmentVariable = function (variable) {
    if (process && process.title !== "browser") {
        return process.env[variable];
    } else {
        return window.__env__[variable];
    }
};

TestUtils.getMetacoAnonymousClient = function() {

    var apiUrl = TestUtils.getEnvironmentVariable(METACO_ENV_API_URL_NAME);

    var builder = TestUtils.getMetacoModule().GetClientBuilder();

    return builder
        .withApiUrl(apiUrl)
        .withTestingMode(true);
};

TestUtils.getMetacoAuthenticatedClient = function() {
    var apiUrl = window.__env__[METACO_ENV_API_URL_NAME];
    var apiId = window.__env__[METACO_ENV_API_ID_NAME];
    var apiKey = window.__env__[METACO_ENV_API_KEY_NAME];

    var builder = new MetacoClientBuilder();

    return builder
        .withApiId(apiId)
        .withApiKey(apiKey)
        .withApiUrl(apiUrl)
        .withTestingMode(true);
};

TestUtils.getBitcoinAddress = function() {

};

TestUtils.GetHexSignedTransaction = function() {

};

module.exports = TestUtils;