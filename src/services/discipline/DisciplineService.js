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

    punishPlayer(data) {
        return http({
            method: 'post',
            url: '/discipline/punish',
            data
        })
    },

    getDisciplineCategories() {
        return http({
            method: 'get',
            url: '/discipline/category',
        })
    }
}