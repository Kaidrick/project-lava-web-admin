import http from 'axios';

export default {
    commandServerRestart(data) {
        return http({
            method: 'post',
            url: '/config/server/restart',
            data
        });
    }
}