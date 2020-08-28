import http from 'axios';

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
            url: '/api/config/get',
            data
        });
    },

    setDataPortConfig(data) {
        return http({
            method: 'post',
            url: '/api/config/port',
            data
        });
    },

    getBackendConnectionStatus() {
        return http({
            method: 'get',
            url: '/api/status'
        });
    }

}