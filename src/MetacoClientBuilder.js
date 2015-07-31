import {MetacoClient} from './MetacoClient'

export class MetacoClientBuilder {
    constructor() {
        this.metacoApiId = null;
        this.metacoApiKey = null;
        this.metacoApiUrl = null;
        this.metacoTestingMode = null;
    }

    makeClient() {
        return new MetacoClient(this.metacoApiUrl, this.metacoApiId, this.metacoApiKey, this.metacoTestingMode);
    }

    withApiId(apiId) {
        this.metacoApiId = apiId;
        return this;
    }

    withApiKey(apiKey) {
        this.metacoApiKey = apiKey;
        return this;
    }

    withApiUrl(apiUrl) {
        this.metacoApiUrl = apiUrl;
        return this;
    }

    withTestingMode(testingMode) {
        this.metacoTestingMode = testingMode;
        return this;
    }
}