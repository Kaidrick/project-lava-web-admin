import http from 'axios';

export default {
    getSystemLogList() {
        return http({
            method: 'get',
            url: '/syslog'
        });
    },
}