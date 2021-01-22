import http from 'axios';

export default {
    getNavMenus(role) {  // TODO: role based
        return http({
            method: 'get',
            url: '/system/nav_menu/list',
            data: role
        });
    },

    getNavMenusAsTree(role) {  // TODO: role based
        return http({
            method: 'get',
            url: '/system/nav_menu/tree',
            data: role
        });
    },

    addNavMenu({name, path, pid, leaf, ordinal}) {
        return http({
            method: 'post',
            url: '/system/nav_menu/add',
            data: {
                name, path, pid, leaf, ordinal
            }
        });
    },

    updateNavMenu({id, name, path, pid, leaf, ordinal}) {
        return http({
            method: 'post',
            url: '/system/nav_menu/update',
            data: {
                id, name, path, pid, leaf, ordinal
            }
        });
    },

    deleteNavMenu({id, name, path, pid, leaf, ordinal}) {
        return http({
            method: 'post',
            url: '/system/nav_menu/add',
            data: {
                id, name, path, pid, leaf, ordinal
            }
        });
    }
}