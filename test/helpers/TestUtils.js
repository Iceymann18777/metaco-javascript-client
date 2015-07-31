import {MetacoClientBuilder} from "../../src/MetacoClientBuilder"

const METACO_ENV_API_URL_NAME = "METACO_ENV_API_URL";
const METACO_ENV_API_ID_NAME = "METACO_ENV_API_ID";
const METACO_ENV_API_KEY_NAME = "METACO_ENV_API_KEY";
const METACO_ENV_WALLET_PRIVATE_KEY_HEX_NAME = "METACO_ENV_WALLET_PRIVATE_KEY_HEX";
const DEFAULT_API_URL = "http://api.testnet.metaco.com/v1/";

export class TestUtils {
    static getMetacoAnonymousClient() {
        var apiUrl = window.__env__[METACO_ENV_API_URL_NAME];

        var builder = new MetacoClientBuilder();

        return builder
            .withApiUrl(apiUrl)
            .withTestingMode(true)
            .makeClient();
    }

    static getMetacoAuthenticatedClient() {
        var apiUrl = window.__env__[METACO_ENV_API_URL_NAME];
        var apiId = window.__env__[METACO_ENV_API_ID_NAME];
        var apiKey = window.__env__[METACO_ENV_API_KEY_NAME];

        var builder = new MetacoClientBuilder();

        return builder
            .withApiId(apiId)
            .withApiKey(apiKey)
            .withApiUrl(apiUrl)
            .withTestingMode(true)
            .makeClient();
    }

    static getBitcoinAddress() {

    }

    static GetHexSignedTransaction() {

    }
}