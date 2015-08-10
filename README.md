# Metaco API Javascript client [![Build Status](https://travis-ci.org/MetacoSA/metaco-javascript-client.svg?branch=master)](https://travis-ci.org/MetacoSA/metaco-java-client)

[Metaco](https://metaco.com) REST API provides a set of services to integrate Metaco into third-party applications. It offers trading and payment facilities as well as wallet management features.

Our Javascript Client implements every single functionality of the API.
You can find a detailed documentation here : [API Documentation](http://docs.metaco.apiary.io/).

This library works in NodeJS and in the Browser. We developped it using the [commonjs](http://www.commonjs.org/specs/modules/1.0/) spec, and we're using [browserify](http://browserify.org/) to bundle the library into a single file usable in the browser.

The NodeJS version uses [Request](https://github.com/request/request) as its only dependency, the Browser version (bundled by us) has no dependency.

Installation
----------------------------------------------

### Using npm (Nodejs)

```sh
npm install metaco-client
```

### Using bower (Browser)

```sh
bower install metaco-client
```

### Manually

For nodejs, you can clone our repository, you will get the latest version available.

For the browser :
* You can download our latest [releases on github](https://github.com/MetacoSA/metaco-javascript-client/releases) or in our [dist folder](https://github.com/MetacoSA/metaco-javascript-client/tree/master/dist).
* You can clone our repository and run gulp buildBrowser to get the latest bundled version.

Usage
----------------------------------------------

You can use our [Unit tests](https://github.com/MetacoSA/metaco-javascript-client/tree/master/test) to learn the basics or the links in the summary of this document.

Testing
----------------------------------------------
The tests requires a testnet environnement to work.

Clone our repository and run :

```sh
npm install
```

Define the following environment variables :
* METACO_ENV_API_ID : Your testnet API ID
* METACO_ENV_API_KEY : Your testnet API Key
* METACO_ENV_API_URL : http://api.testnet.metaco.com/v1/ (Or the endpoint you want to run your tests with)
* METACO_ENV_WALLET_PRIVATE_KEY_HEX : The private key of your testnet wallet (hex-encoded)

Run `npm test`

Contributing
----------------------------------------------
1. Fork this repository and make your changes in your fork
2. Add or Update the tests and run `npm test` to make sure they pass
3. Commit and push your changes to your fork `git push origin master`
4. Submit a pull request and we will handle the rest :)

Known Issues / Gotcha
----------------------------------------------
* The api is still unstable.
* The tests are only on the browser side at the moment.

License
----------------------------------------------
MIT (See LICENSE).
