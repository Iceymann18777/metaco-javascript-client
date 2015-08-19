var TestUtils = require("../helpers/TestUtils");

describe('BitcoinAddressUtils', function () {

    var REGULAR_ADDRESS = "16UwLL9Risc3QfPqBUvKofHmBQ7wMtjvM";
    var COLORED_ADDRESS = "akB4NBW9UuCmHuepksob6yfZs6naHtRCPNy";

    var REGULAR_TESTNET_ADDRESS = "n2eMqTT929pb1RDNuqEnxdaLau1rxy3efi";
    var COLORED_TESTNET_ADDRESS = "bXCcF5dGUVdiGsfNjxTLycVUuvWC2skdeyK";

    beforeEach(function() {
        this.bitcoinAddressUtils = TestUtils.getMetacoModule().BitcoinAddressUtils;
    });

    it("should convert to regular address", function () {
        var regular = this.bitcoinAddressUtils.toRegularAddress(COLORED_ADDRESS);
        expect(regular).toBe(REGULAR_ADDRESS);

        regular = this.bitcoinAddressUtils.toRegularAddress(COLORED_TESTNET_ADDRESS);
        expect(regular).toBe(REGULAR_TESTNET_ADDRESS);
    });

    it("should convert to colored address", function () {
        var regular = this.bitcoinAddressUtils.toColoredAddress(REGULAR_ADDRESS);
        expect(regular).toBe(COLORED_ADDRESS);

        regular = this.bitcoinAddressUtils.toColoredAddress(REGULAR_TESTNET_ADDRESS);
        expect(regular).toBe(COLORED_TESTNET_ADDRESS);
    });

    it("should detect invalid colored address", function () {
        var _this = this;
        expect(function() {
            _this.bitcoinAddressUtils.toRegularAddress("azerty")
        }).toThrow(new Error('Invalid checksum'));
        expect(function() {
            _this.bitcoinAddressUtils.toRegularAddress(REGULAR_ADDRESS)
        }).toThrow(new TypeError("address isn't a valid colored address : invalid length"));
    });

    it("should detect invalid regular address", function () {
        var _this = this;
        expect(function() {
            _this.bitcoinAddressUtils.toColoredAddress("azerty")
        }).toThrow(new TypeError("Invalid checksum"));
        expect(function() {
            _this.bitcoinAddressUtils.toColoredAddress(COLORED_ADDRESS)
        }).toThrow(new TypeError("address isn't a valid regular address : invalid length"));
    });

    it("should detect a colored address", function () {
        expect(this.bitcoinAddressUtils.isColoredAddress(COLORED_ADDRESS)).toBe(true);
        expect(this.bitcoinAddressUtils.isColoredAddress(REGULAR_ADDRESS)).toBe(false);

        expect(this.bitcoinAddressUtils.isColoredAddress(COLORED_TESTNET_ADDRESS)).toBe(true);
        expect(this.bitcoinAddressUtils.isColoredAddress(REGULAR_TESTNET_ADDRESS)).toBe(false);
    });

    it("should detect a regular address", function () {
        expect(this.bitcoinAddressUtils.isRegularAddress(REGULAR_ADDRESS)).toBe(true);
        expect(this.bitcoinAddressUtils.isRegularAddress(COLORED_ADDRESS)).toBe(false);

        expect(this.bitcoinAddressUtils.isRegularAddress(REGULAR_TESTNET_ADDRESS)).toBe(true);
        expect(this.bitcoinAddressUtils.isRegularAddress(COLORED_TESTNET_ADDRESS)).toBe(false);
    });
});