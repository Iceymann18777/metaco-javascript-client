import {MetacoClient} from "../src/MetacoClient"
import {TestUtils} from "./helpers/TestUtils"

describe('MetacoClientBuilder', () => {

    beforeEach(function() {
        this.client = TestUtils.getMetacoAnonymousClient();
    });

    it("should get the assets", function (done) {
        this.client.getAssets()
            .then((result) => {
                expect(result[0].ticker).not.toBe(null);
                done();
            }).catch((error) => {
                fail("The request failed", error);
                done();
            });
    });

    it("should get an asset", function (done) {
        this.client.getAsset("MTC:USD")
            .then((result) => {
                expect(result.ticker).not.toBe(null);
                done();
            }).catch((error) => {
                fail("The request failed", error);
                done();
            });
    });
});