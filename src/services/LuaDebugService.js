import http from 'axios';

export default {
    sendLuaDebugString(data) {
        return http({
            method: 'post',
            url: '/lua/debug',
            data
        });
    },
}