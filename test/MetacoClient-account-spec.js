var TestUtils = require("./helpers/TestUtils");

describe('MetacoClient (Accounts)', function () {

    beforeEach(function() {
        this.client = TestUtils.getMetacoAnonymousClient()
            .makeClient();
    });

    it("should register and validate account", function (done) {

        var _this = this;

        /** Account registration **/

        this.client.registerAccount("+15005550007", "TestsProvider", function (err, account) {
            if (err) {
                console.log(err);
                fail("Account registration failed : " + JSON.stringify(err));
                return done();
            }

            expect(account.apiId).not.toBe(null);
            expect(account.apiKey).not.toBe(null);

            var code = _this.client.getLatestDebugData();

            var newClient = client = TestUtils.getMetacoAnonymousClient()
                .withApiId(account.apiId)
                .withApiKey(account.apiKey)
                .makeClient();

            /** Account Validation **/

            newClient.confirmPhoneNumber(code, function (err, result) {
                if (err) {
                    console.log(err);
                    fail("Account validation failed : " + JSON.stringify(err));
                    return done();
                }

                /** Account Status Check **/
                newClient.getAccountStatus(function (err, accountStatus) {
                    expect(accountStatus.apiId).toBe(account.apiId);
                    expect(accountStatus.KYC1).toBe(true);
                    expect(accountStatus.KYC2).toBe(false);
                    expect(accountStatus.max_order_chf_value).toBe(50000000);
                    expect(accountStatus.max_yearly_chf_order.remaining).toBe(50000000);
                    expect(accountStatus.max_yearly_chf_order.current).toBe(0);
                    expect(accountStatus.max_yearly_chf_order.max).toBe(50000000);


                    /** Can't double validate account **/
                    newClient.confirmPhoneNumber(code, function (err, result) {
                        if (err) {
                            expect(err.errorType).toBe(window.metaco.MetacoErrors.PHONE_CONFIRMATION_NOT_FOUND);
                            return done();
                        }

                        fail("Account validated two times : " + JSON.stringify(result));
                        return done();
                    });
                });
            });
        });
    }, 10000);

    it("should not be able to register invalid account", function (done) {
        this.client.registerAccount("", function (err, account) {
            if (err) {
                expect(err.errorType).toBe(window.metaco.MetacoErrors.SMS_SENDING_FAILED);
                return done();
            }

            fail("Invalid account registered : " + JSON.stringify(err));
            return done();
        });
    });

    it("should not be able to get the status of an invalid account", function (done) {
        this.client.getAccountStatus(function (err, accountStatus) {
            if (err) {
                expect(err.errorType).toBe(window.metaco.MetacoErrors.UNAUTHORIZED);
                return done();
            }

            fail("Fetched invalid account : " + JSON.stringify(accountStatus));
            return done();
        });
    });
});