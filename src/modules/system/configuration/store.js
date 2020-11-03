import connectionService from "@/services/ConnectionService";

export default {
    namespaced: true,
    state: {
        isLoading: false,

        dcsPort: {
            serverMainPort: 0,
            serverPollPort: 0,
            exportMainPort: 0,
            exportPollPort: 0
        },

        websocket: null,
        connected: false,

    },
    getters: {
        dcsPort: state => state.dcsPort,
        isLoading: state => state.isLoading,
    },
    mutations: {
        setDcsPort: (state, dcsPort) => state.dcsPort = dcsPort,
    },
    actions: {
        getDcsPortConfiguration(context) {
            return connectionService.getDataPortConfig().then(res => {
                context.commit('setDcsPort', res.data.data);
            });
        },

        setDcsPortConfiguration(context) {
            let {serverMainPort, serverPollPort, exportMainPort, exportPollPort} = context.state.dcsPort;
            return connectionService.setDataPortConfig({
                serverMainPort,
                serverPollPort,
                exportMainPort,
                exportPollPort
            }).then(res => {
                if (res.data.success) {
                    context.commit('setDcsPort', res.data.data);
                }

                return res;
            })
        },

        resetDefaultPortConfiguration(context) {
            return connectionService.resetDataPortConfig().then(res => {
                if (res.data.success) {
                    context.commit('setDcsPort', res.data.data);
                }

                return res;
            })
        },



        // eslint-disable-next-line no-unused-vars
        initialize ({ dispatch }) {
            console.info('Configuration Module initializing...');
            console.info('Configuration Module initialized.');
        },
    }
}