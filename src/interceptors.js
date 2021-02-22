import axios from 'axios';
import store from '@/modules/system/store';
import Vue from "vue";

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
        const status = reject.response.data.status;
        if (status === 400) {
            // ignored
        } else if (status === 403) {
            //
            localStorage.removeItem('access_token');
            store.state.configured = false;
        }
    })
}
