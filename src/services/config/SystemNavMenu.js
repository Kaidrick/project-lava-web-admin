import http from 'axios';

export default {
    getNavMenus(role) {  // TODO: role based
        return http({
            method: 'get',
            url: '/system/nav-menu/list',
            data: role
        });
    },

    getNavMenusAsTree(role) {  // TODO: role based
        return http({
            method: 'get',
            url: '/system/nav-menu/tree',
            data: role
        });
    },

    addNavMenu({name, path, pid, leaf, ordinal}) {
        return http({
            method: 'post',
            url: '/system/nav-menu/add',
            data: {
                name, path, pid, leaf, ordinal
            }
        });
    },

    updateNavMenu({id, name, path, pid, leaf, ordinal}) {
        return http({
            method: 'post',
            url: '/system/nav-menu/update',
            data: {
                id, name, path, pid, leaf, ordinal
            }
        });
    },

    updateNavMenus(menus) {
        return http({
            method: 'post',
            url: '/system/nav-menu/batch-update',
            data: menus
        });
    },

    deleteNavMenu({id, name, path, pid, leaf, ordinal}) {
        return http({
            method: 'post',
            url: '/system/nav-menu/add',
            data: {
                id, name, path, pid, leaf, ordinal
            }
        });
    }
}