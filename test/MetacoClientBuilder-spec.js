import {MetacoClientBuilder} from "../src/MetacoClientBuilder"

describe('MetacoClientBuilder', () => {
    it("should build a client", () => {
        var builder = new MetacoClientBuilder();

        var client = builder
            .withApiId("ID")
            .withApiKey("KEY")
            .withApiUrl("URL")
            .withTestingMode(true)
            .makeClient();

        expect(client.metacoApiId).toBe("ID");
        expect(client.metacoApiKey).toBe("KEY");
        expect(client.metacoApiUrl).toBe("URL");
        expect(client.metacoTestingMode).toBe(true);
    });
});