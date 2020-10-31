import LuaMemoryUsage from "../../services/telemetry/LuaMemoryUsage";
import DisciplineService from "../../services/discipline/DisciplineService";
import SystemLogService from "@/services/logging/SystemLogService";

const orderNetId = (a, b) => a - b;

export default {
    namespaced: true,
    state: {
        telemetryData: [],
        playerData: [],
        systemLogData: [],

        playerTableExpandedRows: [],
    },
    getters: {
        telemetryData: state => state.telemetryData,
        playerData: state => state.playerData,
        systemLogData: state => state.systemLogData,

        playerTableExpandedRows: state => state.playerTableExpandedRows
    },
    mutations: {
        setTelemetryData: (state, telemetry) => state.telemetryData = telemetry,
        setPlayerData: (state, player) => state.playerData = player,
        setSystemLogData: (state, log) => state.systemLogData = log,

        setPlayerTableExpandedRows: (state, rows) => state.playerTableExpandedRows = rows
    },
    actions: {
        getLuaStateTelemetry(context) {
            LuaMemoryUsage.getLuaStateTelemetry().then(res => {
                context.commit('setTelemetryData', res.data.data);
            })
        },

        getPlayerList(context) {
            return DisciplineService.getPlayerList().then(res => {
                context.commit('setPlayerData', res.data.data.sort(orderNetId));
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