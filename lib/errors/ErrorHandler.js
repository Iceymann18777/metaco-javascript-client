var MetacoErrors = require ("./MetacoErrors");

var ErrorHandler = {};

var httpOkRegex = /^2[0-9]{2}/;
var httpServerErrorRegex = /^2[0-9]{2}/;

function hasError(httpCode, jsonContent) {
    return !httpOkRegex.test(httpCode.toString());
}

function makeError(statusCode, content, originalError, errorType) {
    return {
        statusCode: statusCode,
        content: content,
        originalError: originalError,
        errorType: errorType
    }
}

ErrorHandler.handleError = function (httpCode, textContent) {

    var jsonContent = null;
    var metacoErrorType = null;

    try {
        jsonContent = JSON.parse(textContent);
    } catch (e) {
        jsonContent = null;
    }

    if (!hasError(httpCode, jsonContent)) {
        return null;
    }

    if (MetacoErrors.values.hasOwnProperty(jsonContent && jsonContent !== null && jsonContent.metaco_error)) {
        metacoErrorType = MetacoErrors.keys[MetacoErrors.values[jsonContent.metaco_error]];
    } else {
        if (httpCode == 404) {
            metacoErrorType = MetacoErrors.keys.NOT_FOUND;
        } else if (httpCode == 401) {
            metacoErrorType = MetacoErrors.keys.UNAUTHORIZED;
        } else if (!httpServerErrorRegex.test(httpCode.toString())) {
            metacoErrorType = MetacoErrors.keys.SERVER_ERROR;
        } else {
            metacoErrorType = MetacoErrors.keys.UNKNOWN_ERROR;
        }
    }

    return makeError(httpCode, textContent, jsonContent, metacoErrorType);
};

module.exports = ErrorHandler;