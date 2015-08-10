var TestUtils = require("./helpers/TestUtils");

describe('MetacoClient (Orders)', function () {

    beforeEach(function() {
        this.client = TestUtils.getMetacoAuthenticatedClient()
            .makeClient();
    });
    it("should process an asset order (Asset - Created)", function (done) {
        var _this = this;

        this.client.createOrderFromAssetAmount(
            "bid",
            "MTC:USD",
            100,
            TestUtils.getBitcoinAddress(),
            TestUtils.getBitcoinAddress(),
            null,
            null,
            function (err, order) {
                if (err) {
                    fail("Failed to create order : " + err );
                    return done();
                }
                expect(order.amount_asset).toBe(100);
                expect(order.ticker).toBe("MTC:USD");

                waitForOrderState(_this.client, order.id, "Signing", function (signingOrder) {
                    if (signingOrder === null) {
                        fail("Order " + order.id + " took too long to go to Signing state");
                        return done();
                    }
                    /** Signing and submit **/
                    var signedTransaction = TestUtils.getHexSignedTransaction(signingOrder.transaction);

                    _this.client.submitSignedOrder(order.id, signedTransaction, function (err, signatureResult) {
                        if (err) {
                            fail("Failed to sign order : " + JSON.stringify(err) );
                            return done();
                        }

                        /** Wait for broadcasting **/
                        waitForOrderState(_this.client, order.id, "Unconfirmed", function (unconfirmedOrder) {
                            if (unconfirmedOrder === null) {
                                fail("Order " + order.id + " took too long to go to Unconfirmed state");
                                return done();
                            }

                            _this.client.cancelOrder(order.id, function (err, result) {
                                if (err) {
                                    expect(err.errorType).toBe(window.metaco.MetacoErrors.ORDER_NOT_CANCELLABLE);
                                } else {
                                    fail("Order " + order.id + " was canceled after broadcast");
                                    return done();
                                }

                                _this.client.getOrders(function (err, ordersList) {
                                    if (err) {
                                        fail("Failed to get all orders : " + JSON.stringify(err) );
                                        return done();
                                    }

                                    if (!orderIsInList(ordersList.orders, order.id)) {
                                        fail("Order " + order.id + " is not present in orders list");
                                        return done();
                                    }

                                    return done();
                                })

                            });
                        });
                    })
                });
        });
    }, 60000);

    it("should be able to cancel an order (Satoshi - created)", function (done) {
        var _this = this;

        this.client.createOrderFromSatoshiAmount(
            "bid",
            "MTC:USD",
            300000,
            TestUtils.getBitcoinAddress(),
            TestUtils.getBitcoinAddress(),
            null,
            null,
            function (err, order) {
                if (err) {
                    fail("Failed to create order : " + JSON.stringify(err));
                    return done();
                }
                expect(order.amount_satoshi).toBe(300000);
                expect(order.ticker).toBe("MTC:USD");

                _this.client.cancelOrder(order.id, function (err, result) {
                    waitForOrderState(_this.client, order.id, "Canceled", function (canceledOrder) {
                        if (canceledOrder === null) {
                            fail("Order " + order.id + " took too long to go to Canceled state");
                            return done();
                        }
                        expect(canceledOrder.cancel_reason).toBe("explicit_cancel");
                        expect(canceledOrder.status).toBe("Canceled");
                        return done();
                    });
                });
            });
    }, 60000);

    function orderIsInList(orders, id) {
        for (var i = 0; i < orders.length; i++) {
            var order = orders[i];
            if (order.id === id) {
                return true;
            }
        }

        return false;
    }

    function waitForOrderState(client, orderId, status, callback)  {
        var remainingTries = 15;
        var orderReady = false;
        var order = null;

        function testOrder() {
            client.getOrder(orderId, function (err, fetchedOrder) {
                order = fetchedOrder;
                if (!err) {
                    if (order.status === status) {
                        orderReady = true;
                    }
                }

                remainingTries--;

                if (remainingTries === 0) {
                    return callback(null);
                }
                if (orderReady) {
                    callback(order);
                } else {
                    setTimeout(testOrder, 2000);
                }
            });
        }

        setTimeout(testOrder, 2000);
    }
});