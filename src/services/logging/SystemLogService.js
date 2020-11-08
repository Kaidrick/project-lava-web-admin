import http from 'axios';

export default {
    getSystemLogList(pageObject) {
        return http({
            method: 'post',
            url: '/syslog/current',
            data: pageObject
        });
    },
}