const dictionary = {
    errorCode: {
        BAD_LOGIN_CREDENTIALS: 4001,
        ACCESS_TOKEN_EXPIRED: 4002,
        REFRESH_TOKEN_EXPIRED: 4003,
        INVALID_ACCESS_TOKEN: 4004,
        INVALID_REFRESH_TOKEN: 4005,
        INSUFFICIENT_ACCESS_RIGHT: 4006
    },

    statusCode: {
        success: 1,
        failure: 0
    }
};

export default {
    // eslint-disable-next-line no-unused-vars
    install(Vue, options) {
        Vue.prototype.$dict = dictionary;
    }
}