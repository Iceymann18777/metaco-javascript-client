describe('MetacoClientBuilder', function () {
    it("should build a client", function (){
        var builder = new window.metaco.GetClientBuilder();

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