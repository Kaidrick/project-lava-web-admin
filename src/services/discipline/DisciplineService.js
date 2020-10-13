import http from 'axios';

export default {
    name: 'disciplineService',

    getPlayerList(data) {
        return http({
            method: 'get',
            url: '/api/player/list',
            data
        });
    },
}