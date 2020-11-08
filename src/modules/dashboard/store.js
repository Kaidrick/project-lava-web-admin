import LuaMemoryUsage from "../../services/telemetry/LuaMemoryUsage";
import DisciplineService from "../../services/discipline/DisciplineService";
import SystemLogService from "@/services/logging/SystemLogService";
import Vue from 'vue';

const orderNetId = (a, b) => a - b;

// eslint-disable-next-line no-unused-vars
const vm = new Vue();

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
        getSystemLogList(context, pageObject) {
            SystemLogService.getSystemLogList(pageObject).then(res => {
                context.commit('setSystemLogData', res.data.data);
                // const subscription = vm.$wsSubscribe('/topic/backend.entry', frame => {
                //     console.log(frame);
                // });
                // console.log(subscription);
            })
        },

        getMoreSystemList(context, pageObject) {
            SystemLogService.getSystemLogList(pageObject).then(res => {
                const data = context.state.systemLogData;
                data.push(...res.data.data);
                context.commit('setSystemLogData', data);
            })
        },

        getDisciplineCategories() {
            return DisciplineService.getDisciplineCategories();
        },

        // eslint-disable-next-line no-unused-vars
        executeDisciplinaryAction(context, actionData) {
            return DisciplineService.punishPlayer(actionData)
        },


        // eslint-disable-next-line no-unused-vars
        initialize ({ dispatch }) {
            console.info('Telemetry initializing...');
            console.info('Telemetry initialized.');
        },
    }
}