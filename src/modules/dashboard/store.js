import LuaMemoryUsage from "../../services/telemetry/LuaMemoryUsage";

export default {
    namespaced: true,
    state: {
        telemetryData: [],
    },
    getters: {
        telemetryData: state => state.telemetryData,
    },
    mutations: {
        setTelemetryData: (state, telemetry) => state.telemetryData = telemetry,
    },
    actions: {
        getLuaStateTelemetry(context) {
            LuaMemoryUsage.getLuaStateTelemetry().then(res => {
                context.commit('setTelemetryData', res.data)
            })
        },

        // eslint-disable-next-line no-unused-vars
        initialize ({ dispatch }) {
            console.info('Telemetry initializing...');
            console.info('Telemetry initialized.');
        },
    }
}