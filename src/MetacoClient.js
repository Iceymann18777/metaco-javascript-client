import {HttpClient} from "./http/HttpClient"

export class MetacoClient {

    constructor(metacoApiUrl, metacoApiId, metacoApiKey, metacoTestingMode) {
        this.metacoApiId = metacoApiId;
        this.metacoApiKey = metacoApiKey;
        this.metacoApiUrl = metacoApiUrl;
        this.metacoTestingMode = metacoTestingMode;

        this.httpClient = new HttpClient(this.metacoApiUrl, this.metacoApiId, this.metacoApiKey, this.metacoTestingMode);
    }

    registerAccount(request) {

    }
    getAccountStatus() {

    }
    confirmPhoneNumber(request) {

    }
    getAssets() {
        return this.httpClient.doGet("assets")
    }
    getAsset(ticker) {
        return this.httpClient.doGet(`assets/${ticker}`)
    }
    getAssetsHistory(criteria, tickers) {

    }
    createOrder(createOrder) {

    }
    getOrders() {

    }
    getOrder(id) {

    }
    submitSignedOrder(id, rawTransaction) {

    }
    cancelOrder(id) {

    }
    createTransaction(newTransaction) {

    }
    broadcastTransaction(rawTransaction) {

    }
    getWalletDetails(address) {

    }
    getLatestDebugData() {

    }
}