var base58check = require('bs58check');

var OPEN_ASSETS_NAMESPACE = 19;
var P2PKH_MAIN_NET = 0;
var P2SH_MAIN_NET = 5;
var P2PKH_TEST_NET = 111;
var P2SH_TEST_NET = 196;
var VALID_VERSIONS = [P2PKH_MAIN_NET, P2SH_MAIN_NET, P2PKH_TEST_NET, P2SH_TEST_NET];

var bitcoinAddressUtils = {};

function validateRegularAddress(address) {
    var decoded = base58check.decode(address);
    if (decoded.length != 21) {
        throw new TypeError("address isn't a valid regular address : invalid length");
    }

    var versionValidated = false;
    for (var b in VALID_VERSIONS){
        if (VALID_VERSIONS.hasOwnProperty(b)) {
            if(decoded[0] == VALID_VERSIONS[b]) {
                versionValidated = true;
            }
        }
    }
    if (!versionValidated) {
        throw new TypeError("address isn't a valid regular address : version byte invalid");
    }
}

function validateColoredAddress(address) {
    var decoded = base58check.decode(address);
    if (decoded.length != 22) {
        throw new TypeError("address isn't a valid colored address : invalid length");
    }

    var versionValidated = false;
    for (var b in VALID_VERSIONS){
        if (VALID_VERSIONS.hasOwnProperty(b)) {
            if(decoded[1] == VALID_VERSIONS[b]) {
                versionValidated = true;
            }
        }
    }
    if (!versionValidated) {
        throw new TypeError("address isn't a valid colored address : version byte invalid");
    }

    if (decoded[0] != OPEN_ASSETS_NAMESPACE) {
        throw new TypeError("address isn't a valid colored address : namespace byte invalid");
    }
}

bitcoinAddressUtils.toColoredAddress = function(regularAddress) {
    validateRegularAddress(regularAddress);

    var decoded = base58check.decode(regularAddress);

    var newByteArr = new Uint8Array(decoded.length + 1);
    newByteArr[0] = OPEN_ASSETS_NAMESPACE;

    for (var i = 0; i < decoded.length; i++) {
        newByteArr[i + 1] = decoded[i];
    }

    return base58check.encode(new Buffer(newByteArr));
};

bitcoinAddressUtils.toRegularAddress = function(coloredAddress) {
    validateColoredAddress(coloredAddress);

    var decoded = base58check.decode(coloredAddress);

    var newByteArr = new Uint8Array(decoded.length - 1);

    for (var i = 1; i < decoded.length; i++) {
        newByteArr[i - 1] = decoded[i];
    }

    return base58check.encode(new Buffer(newByteArr));
};

bitcoinAddressUtils.isColoredAddress = function(address) {
    try {
        validateColoredAddress(address);
        return true;
    } catch (e) {
        return false;
    }
};

bitcoinAddressUtils.isRegularAddress = function(address) {
    try {
        validateRegularAddress(address);
        return true;
    } catch (e) {
        return false;
    }
};

module.exports = bitcoinAddressUtils;