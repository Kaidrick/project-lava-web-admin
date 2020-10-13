import http from 'axios';

export default {
    commandServerRestart(data) {
        return http({
            method: 'post',
            url: '/api/config/server/restart',
            data
        });
    }
}