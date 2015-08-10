var bitcoinjs = require("bitcoinjs-lib");
var BigInteger = require("bigi");

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
    var apiUrl = TestUtils.getEnvironmentVariable(METACO_ENV_API_URL_NAME);
    var apiId = TestUtils.getEnvironmentVariable(METACO_ENV_API_ID_NAME);
    var apiKey = TestUtils.getEnvironmentVariable(METACO_ENV_API_KEY_NAME);

    var builder = TestUtils.getMetacoModule().GetClientBuilder();

    return builder
        .withApiId(apiId)
        .withApiKey(apiKey)
        .withApiUrl(apiUrl)
        .withTestingMode(true);
};

TestUtils.getBitcoinAddress = function() {
    var hexPrivateKey = TestUtils.getEnvironmentVariable(METACO_ENV_WALLET_PRIVATE_KEY_HEX_NAME);
    var D = BigInteger.fromHex(hexPrivateKey);
    var privateKey = new bitcoinjs.ECKey(D);
    return privateKey.pub.getAddress(bitcoinjs.networks.testnet).toBase58Check();
};

TestUtils.getHexSignedTransaction = function(txToSign) {
    var hexPrivateKey = TestUtils.getEnvironmentVariable(METACO_ENV_WALLET_PRIVATE_KEY_HEX_NAME);
    var D = BigInteger.fromHex(hexPrivateKey);
    var privateKey = new bitcoinjs.ECKey(D);

    var transaction = bitcoinjs.Transaction.fromHex(txToSign.raw);
    var txb = bitcoinjs.TransactionBuilder.fromTransaction(transaction);

    txToSign.inputs_to_sign.forEach(function (input, i) {
       txb.sign(i, privateKey);
    });

    return txb.buildIncomplete().toHex();
};

module.exports = TestUtils;