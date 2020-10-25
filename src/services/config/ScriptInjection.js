import http from 'axios';

export default {
    getDcsWritePathBranches() {
        return http({
            method: 'get',
            url: '/config/script/branch',
        });
    },

    isBranchConfigured(branchName) {
        return http({
            method: 'post',
            url: `/config/script/branch/${branchName}`
        })
    },

    installDcsScriptToBranch(branchName) {
        return http({
            method: 'get',
            url: `/config/script/install/${branchName}`
        })
    },

    uninstallDcsScriptFromBranch(branchName) {
        return http({
            method: 'get',
            url: `/config/script/uninstall/${branchName}`
        })
    }
}