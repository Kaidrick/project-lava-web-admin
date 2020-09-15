import ConnectionService from "@/services/ConnectionService";

const state = {
    status: {
        webGuiStatus: '',
        connectionStatus: '',
        phaseCode: "UNKNOWN",
        timestamp: '',
        theater: 'unknown',  // should only be updated at first connection or at mission restart trigger
        objectCount: 0,
        playerCount: 0
    },
    dcsVersion: '',
};

const getters = {
    status: state => state.status,
    dcsVersion: state => state.dcsVersion
};

const actions = {
    loadBackendConnectionStatus(context) {
        ConnectionService.getBackendConnectionStatus().then(response =>
        {
            const status = response.data;
            context.commit('setWebGuiStatus', 'OK');
            context.commit('setConnectionStatus', status.connected);
            context.commit('setPhaseCode', mapPhaseCode(status.phaseCode));
            context.commit('setTimestamp', new Date(status.timestamp).toLocaleTimeString());
            context.commit('setTheater', status.theater || 'unknown');
            context.commit('setPlayerCount', status.playerCount);
            context.commit('setObjectCount', status.objectCount);
        }).catch(() => {
            context.commit('setWebGuiStatus', 'Disconnected');
        })
    },

    fetchDcsVersion() {
        ConnectionService.getBackendConnectionStatus().then(response => {
            console.log(response.data);
        })
    }
};

const mutations = {
    setStatus: (state, status) => state.status = status,
    setWebGuiStatus: (state, val) => state.status.webGuiStatus = val,
    setConnectionStatus: (state, val) => state.status.connectionStatus = val,
    setPhaseCode: (state, val) => state.status.phaseCode = val,
    setTimestamp: (state, val) => state.status.timestamp = val,
    setTheater: (state, val) => state.status.theater = val,
    setPlayerCount: (state, val) => state.status.theater = val,
    setObjectCount: (state, val) => state.status.theater = val,

};

const mapPhaseCode = phaseCode => {
    switch (phaseCode) {
        case 0:
            return "PREPARING";
        case 1:
            return "LOADING";
        case 2:
            return "STOPPING";
        case 3:
            return "IDLE";
        case 4:
            return "RUNNING";
        default:
            return "UNKNOWN";
        }
}

export default {
    state, getters, actions, mutations
};