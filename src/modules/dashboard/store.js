import LuaMemoryUsage from "../../services/telemetry/LuaMemoryUsage";
import DisciplineService from "../../services/discipline/DisciplineService";
import SystemLogService from "@/services/logging/SystemLogService";

export default {
    namespaced: true,
    state: {
        telemetryData: [],
        playerData: [],
        systemLogData: []
    },
    getters: {
        telemetryData: state => state.telemetryData,
        playerData: state => state.playerData,
        systemLogData: state => state.systemLogData
    },
    mutations: {
        setTelemetryData: (state, telemetry) => state.telemetryData = telemetry,
        setPlayerData: (state, player) => state.playerData = player,
        setSystemLogData: (state, log) => state.systemLogData = log
    },
    actions: {
        getLuaStateTelemetry(context) {
            LuaMemoryUsage.getLuaStateTelemetry().then(res => {
                context.commit('setTelemetryData', res.data.data);
            })
        },

        getPlayerList(context) {
            DisciplineService.getPlayerList().then(res => {
                context.commit('setPlayerData', res.data.data);
            })
        },

        // eslint-disable-next-line no-unused-vars
        getSystemLogList(context) {
            SystemLogService.getSystemLogList().then(res => {
                context.commit('setSystemLogData', res.data.data);
            })
        },

        // eslint-disable-next-line no-unused-vars
        initialize ({ dispatch }) {
            console.info('Telemetry initializing...');
            console.info('Telemetry initialized.');
        },
    }
}