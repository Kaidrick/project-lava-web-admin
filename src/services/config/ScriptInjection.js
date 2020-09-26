import http from 'axios';

export default {
    getDcsWritePathBranches() {
        return http({
            method: 'get',
            url: '/api/config/script/branch',
        });
    },

    isBranchConfigured(branchName) {
        return http({
            method: 'post',
            url: `/api/config/script/branch/${branchName}`
        })
    },

    installDcsScriptToBranch(branchName) {
        return http({
            method: 'get',
            url: `/api/config/script/install/${branchName}`
        })
    },

    uninstallDcsScriptFromBranch(branchName) {
        return http({
            method: 'get',
            url: `/api/config/script/uninstall/${branchName}`
        })
    }
}