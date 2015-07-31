import Request from 'superagent';
import {Promise} from 'es6-promise';

export class HttpClient {
    constructor(metacoApiUrl, metacoApiId, metacoApiKey, metacoTestingMode) {
        this.metacoApiId = metacoApiId;
        this.metacoApiKey = metacoApiKey;
        this.metacoApiUrl = metacoApiUrl;
        this.metacoTestingMode = metacoTestingMode;
    }

    doGet(url) {

        var self = this;

        return new Promise(function (resolve, reject) {
            Request
                .get(self.getUrl(url))
                .set(self.getHeaders())
                .end(function (err, res) {
                    if (res.status === 404) {
                        reject();
                    } else {
                        resolve(JSON.parse(res.text));
                    }
                });
        });
    }

    doPost(url, data) {
        return new Promise(function (resolve, reject) {
            Request
                .post(this.getUrl(url))
                .send(data)
                .set(this.getHeaders())
                .end(function (err, res) {
                    if (res.status === 404) {
                        reject();
                    } else {
                        resolve(JSON.parse(res.text));
                    }
                });
        });
    }

    doDelete(url) {
        return new Promise(function (resolve, reject) {
            Request
                .delete(getUrl(url))
                .set(getHeaders())
                .end(function (err, res) {
                    if (res.status === 404) {
                        reject();
                    } else {
                        resolve(JSON.parse(res.text));
                    }
                });
        });
    }

    getUrl(relativePart) {
        return this.metacoApiUrl + relativePart;
    }

    getHeaders() {
        var headers = {};
        if (this.metacoApiId && this.metacoApiId !== "" &&
            this.metacoApiKey && this.metacoApiKey !== "") {
            headers["X-Metaco-Id"] = this.metacoApiId;
            headers["X-Metaco-Key"] = this.metacoApiKey;
        }

        if (this.metacoTestingMode) {
            headers["X-Metaco-Debug"] = true;
        }

        return headers;
    }
}