import axios from 'axios';
import store from '@/modules/system/store';
import Vue from "vue";
import ConnectionService from "@/services/ConnectionService";

const vm = new Vue();

export default function setup() {
    axios.interceptors.request.use(config => {
        const token = store.getters.accessToken();
        if (token) {
            config.headers['access_token'] = token;
        }
        return config
    }, error => { return Promise.reject(error)})

    axios.interceptors.response.use(response => {
        return response;
    }, reject => {

        // TODO: backend custom exception will provide error code to determine the exact error
        vm.$message.error(`${reject.response.data.status}: ${reject.response.data.message}`);

        // eslint-disable-next-line no-unused-vars
        const status = reject.response.data.status;
        if (status === vm.$dict.statusCode.failure) {
            console.log('failure');
        }

        // check status and error code
        console.log(reject.response.data.errorCode, '<--- error code');
        switch (reject.response.data.errorCode) {
            case vm.$dict.errorCode.INVALID_ACCESS_TOKEN:
                localStorage.removeItem('access_token');
                store.state.configured = false;
                break;

            case vm.$dict.errorCode.ACCESS_TOKEN_EXPIRED:
                // remove current access token
                localStorage.removeItem('access_token');

                // invoke api call to attempt to use refresh token to get a new access token
                ConnectionService.refreshWebLogin(localStorage.getItem('refresh_token'))
                    .then(res => {
                        const {accessToken, refreshToken} = res.data.data;
                        localStorage.setItem('access_token', accessToken);
                        localStorage.setItem('refresh_token', refreshToken);
                        window.location.reload();
                    })
                    .catch(e => {
                        console.log(e)
                    })
                // if attempt failed (such as due to refresh token expired), log out user immediately

                break;

            case vm.$dict.errorCode.REFRESH_TOKEN_EXPIRED:
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');

                window.location.reload();
                break;

            default:
                break;
        }

        return reject.response;
    })
}
