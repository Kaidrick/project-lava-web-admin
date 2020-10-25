import http from 'axios';

export default {
    name: 'disciplineService',

    getPlayerList(data) {
        return http({
            method: 'get',
            url: '/player/list',
            data
        });
    },
}