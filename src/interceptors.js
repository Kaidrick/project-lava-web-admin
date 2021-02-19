import axios from 'axios';
import store from '@/modules/system/store';

export default function setup() {
    axios.interceptors.request.use(config => {
        const token = store.getters.accessToken();
        if (token) {
            config.headers['access_token'] = token;
        }
        return config
    }, error => { return Promise.reject(error)})

    // TODO: response -> if not logged in, router push to login page
}
