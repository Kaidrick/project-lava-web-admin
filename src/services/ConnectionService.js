import http from 'axios';
import qs from 'qs';

export class PortConfig {
    constructor(serverMain, serverPoll, exportMain, exportPoll) {
        this.serverMainPort = serverMain;
        this.serverPollPort = serverPoll;
        this.exportMainPort = exportMain;
        this.exportPollPort = exportPoll;
    }
}

export default {
    name: 'connectionService',

    /**
     * Acquire port configuration for WebGUI and Lava backend communication
     *
     * The Spring Controller returns a PortConfig object converted to JSON object, which contains 4 fields:
     * - serverMainPort
     * - serverPollPort
     * - exportMainPort
     * - exportPollPort
     *
     * @param data PortConfig object
     */
    getDataPortConfig(data) {
        return http({
            method: 'get',
            url: '/config/get',
            data
        });
    },

    setDataPortConfig(data) {
        return http({
            method: 'post',
            url: '/config/port',
            data
        });
    },

    resetDataPortConfig() {
        return http({
            method: 'get',
            url: '/config/port_reset',
        })
    },

    getBackendConnectionStatus() {
        return http({
            method: 'get',
            url: '/status'
        });
    },

    requestWebLogin(username, password) {
        return http({
            method: 'post',
            url: '/token/get',
            data: qs.stringify({
                username: username,
                password: password
            })
        })
    },

    refreshWebLogin(refreshToken) {
        return http({
            method: 'post',
            url: 'token/refresh',
            data: qs.stringify({
                refresh_token: refreshToken
            })
        });
    }

}