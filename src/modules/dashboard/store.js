import LuaMemoryUsage from "../../services/telemetry/LuaMemoryUsage";
import DisciplineService from "../../services/discipline/DisciplineService";

export default {
    namespaced: true,
    state: {
        telemetryData: [],
        playerData: [],
    },
    getters: {
        telemetryData: state => state.telemetryData,
        playerData: state => state.playerData
    },
    mutations: {
        setTelemetryData: (state, telemetry) => state.telemetryData = telemetry,
        setPlayerData: (state, player) => state.playerData = player
    },
    actions: {
        getLuaStateTelemetry(context) {
            LuaMemoryUsage.getLuaStateTelemetry().then(res => {
                context.commit('setTelemetryData', res.data);
            })
        },

        getPlayerList(context) {
            DisciplineService.getPlayerList().then(res => {
                context.commit('setPlayerData', res.data);
            })
        },

        // eslint-disable-next-line no-unused-vars
        initialize ({ dispatch }) {
            console.info('Telemetry initializing...');
            console.info('Telemetry initialized.');
        },
    }
}