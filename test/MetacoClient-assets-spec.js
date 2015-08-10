var TestUtils = require("./helpers/TestUtils");

describe('MetacoClient (Assets)', function () {

    beforeEach(function() {
        this.client = TestUtils.getMetacoAnonymousClient()
            .makeClient();
    });

    it("should get the assets", function (done) {
        this.client.getAssets(function (err, assets) {
            if (err) {
                fail("Assets fetch failed : " + JSON.stringify(err));
                return done();
            }

            expect(assets[0].definition.ticker).toBe("MTC:USD");
            return done();
        })
    });

    it("should get the asset", function (done) {
        this.client.getAsset("MTC:USD", function (err, asset) {
            if (err) {
                fail("Asset fetch failed : " + JSON.stringify(err));
                return done();
            }
            expect(asset.definition.ticker).toBe("MTC:USD");
            return done();
        })
    });

    it("should not find the asset", function (done) {
        this.client.getAsset("AZE:RTY", function (err, asset) {
            if (err) {
                expect(err.statusCode).toBe(404);
                expect(err.errorType).toBe(window.metaco.MetacoErrors.INVALID_INPUT);
                return done();
            }
            return done();
        })
    });

    it("should get an asset history", function (done) {

        var currentTimestamp = Math.floor(Date.now() / 1000);
        var timestampThirtyMinutesAgo = currentTimestamp - (30 * 60);

        this.client.getAssetHistory(timestampThirtyMinutesAgo, currentTimestamp, "10m", true, "USD", function (err, history) {
            if (err) {
                fail("Asset history fetch failed : " + JSON.stringify(err));
                return done();
            }
            expect(history.assets.length).toBe(1);
            return done();
        })
    });

    it("should not find an asset history", function (done) {

        var currentTimestamp = Math.floor(Date.now() / 1000);
        var timestampThirtyMinutesAgo = currentTimestamp - (30 * 60);

        this.client.getAssetHistory(timestampThirtyMinutesAgo, currentTimestamp, "10m", true, "RTY", function (err, history) {
            if (err) {
                fail("Asset history fetch failed : " + JSON.stringify(err));
                return done();
            }
            expect(history.assets.length).toBe(0);
            return done();
        })
    });
});