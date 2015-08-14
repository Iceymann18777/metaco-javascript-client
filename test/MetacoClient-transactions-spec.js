var TestUtils = require("./helpers/TestUtils");

describe('MetacoClient (Orders)', function () {

    beforeEach(function() {
        this.client = TestUtils.getMetacoAuthenticatedClient()
            .makeClient();
    });

    it("should process an asset transaction", function (done) {
        var _this = this;
        this.client.createTransactionFromAssetAmount(
            1,
            "MTC:USD",
            TestUtils.getBitcoinAddress(),
            TestUtils.getBitcoinAddress(),
            TestUtils.getBitcoinAddress(),
            12345,
            function (err, transactionToSign) {
                if (err) {
                    fail("Failed to get an asset transaction : " + JSON.stringify(err) );
                    return done();
                }

                var hexSignedtransaction = TestUtils.getHexSignedTransaction(transactionToSign);

                _this.client.broadcastTransaction(hexSignedtransaction, function (err, result) {

                    if (err) {
                        fail("Failed to submit a raw transaction : " + JSON.stringify(err) );
                        return done();
                    }

                    expect(result.success).toBe(true);

                    return done();
                })
        });

    }, 60000);

    it("should process a BTC transaction", function (done) {
        var _this = this;
        this.client.createTransactionFromSatoshiAmount(
            100000,
            "XBT",
            TestUtils.getBitcoinAddress(),
            TestUtils.getBitcoinAddress(),
            TestUtils.getBitcoinAddress(),
            12345,
            function (err, transactionToSign) {
                if (err) {
                    fail("Failed to get a satoshi transaction : " + JSON.stringify(err) );
                    return done();
                }

                var hexSignedtransaction = TestUtils.getHexSignedTransaction(transactionToSign);

                _this.client.broadcastTransaction(hexSignedtransaction, function (err, result) {

                    if (err) {
                        fail("Failed to submit a raw transaction : " + JSON.stringify(err) );
                        return done();
                    }

                    expect(result.success).toBe(true);

                    return done();
                })
            });
    }, 60000);

    it("shouldn't be able to broadcast a fake transaction", function (done) {
        this.client.broadcastTransaction("fakerawtx", function (err, result) {
            if (err) {
                expect(err.errorType).toBe(window.metaco.MetacoErrors.INVALID_INPUT);
                return done();
            } else {
                fail("Fake transaction was broadcasted : " + JSON.stringify(result));
                return done();
            }
        });
    }, 60000);

    it("should get the wallet details", function (done) {
        this.client.getWalletDetails(TestUtils.getBitcoinAddress(), null, null, function (err, wallet) {
            if (err) {
                fail("Failed to get the wallet details : " + err );
                return done();
            }

            expect(wallet).not.toBe(null);
            expect(wallet.addresses[0]).toBe(TestUtils.getBitcoinAddress());
            return done();
        })
    }, 60000);

    it("should get the paginated wallet details", function (done) {
        this.client.getWalletDetails(TestUtils.getBitcoinAddress(), 0, 1, function (err, wallet) {
            if (err) {
                fail("Failed to get the wallet details : " + err );
                return done();
            }

            expect(wallet).not.toBe(null);
            expect(wallet.addresses[0]).toBe(TestUtils.getBitcoinAddress());
            expect(wallet.transactions.length).toBe(1);
            return done();
        })
    }, 60000);
});