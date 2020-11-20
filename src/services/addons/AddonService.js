import http from 'axios';

export default {
    name: 'addonService',

    getAddonList() {
        return http({
            method: 'get',
            url: '/addon/list'
        });
    }
}