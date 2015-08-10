# Metaco API Javascript client [![Build Status](https://travis-ci.org/MetacoSA/metaco-javascript-client.svg?branch=master)](https://travis-ci.org/MetacoSA/metaco-java-client)

[Metaco](https://metaco.com) REST API provides a set of services to integrate Metaco into third-party applications. It offers trading and payment facilities as well as wallet management features.

Our Javascript Client implements every single functionality of the API.
You can find a detailed documentation here : [API Documentation](http://docs.metaco.apiary.io/).

Installation - NodeJS
----------------------------------------------

### Using npm

To install the latest official version, use NPM:

```sh
npm install metaco-client
```

Installation - Browser
----------------------------------------------

For the browser, we're providing a browserified version of the node-js library, you can find it in our [dist/ folder](https://github.com/MetacoSA/metaco-javascript-client/tree/master/dist)

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
2. Add or Update the tests and run `mvn clean test` to make sure they pass
3. Commit and push your changes to your fork `git push origin master`
4. Submit a pull request and we will handle the rest :)

Known Issues / Gotcha
----------------------------------------------
* The api is still unstable.

License
----------------------------------------------
MIT (See LICENSE).
