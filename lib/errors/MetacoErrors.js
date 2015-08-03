var keys = {

    INVALID_INPUT: "invalid_input",
    API_CALLS_QUOTA_EXCEEDED: "api_calls_quota_exceeded",
    SMS_SENDING_FAILED: "sms_sending_failed",
    PHONE_CONFIRMATION_NOT_FOUND: "phone_confirmation_not_found",
    INVALID_CONFIRMATION_CODE: "invalid_confirmation_code",
    ORDER_NOT_FOUND: "order_not_found",
    NOT_ENOUGH_FUNDS: "not_enough_funds",
    ORDER_TOO_SMALL: "order_too_small",
    ORDER_COUNT_LIMIT_EXCEEDED: "order_count_limit_exceeded",
    YEARLY_TRANSACTION_QUOTA_EXCEEDED: "yearly_transaction_quota_exceeded",
    MAXIMUM_TRANSACTION_AMOUNT_EXCEEDED: "maximum_transaction_amount_exceeded",
    ORDER_NOT_CANCELLABLE: "order_not_cancellable",
    UNAUTHORIZED: "unauthorized",
    NOT_FOUND: "notfound",
    SERVER_ERROR: "servererror",
    UNKNOWN_ERROR: "unknownerror"
};

function reverseKeys(original) {
    var values = {};

    for (var key in keys) {
        if (keys.hasOwnProperty(key)) {
            values[original[key]] = key;
        }
    }

    return values;
}

var values = reverseKeys(keys);

module.exports = {
    keys: keys,
    values: values
};