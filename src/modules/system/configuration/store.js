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
    },
    getters: {
        dcsPort: state => state.dcsPort,
        isLoading: state => state.isLoading,
    },
    mutations: {
        setIsLoading: (state, isLoading) => state.isLoading = isLoading,
        setDcsPort: (state, dcsPort) => state.dcsPort = dcsPort,
    },
    actions: {
        getDcsPortConfiguration(context) {
            context.commit('setIsLoading', true);
            connectionService.getDataPortConfig().then(res => {
                context.commit('setDcsPort', res.data.data);
            }).finally(() => context.commit('setIsLoading', false))
        },

        // eslint-disable-next-line no-unused-vars
        initialize ({ dispatch }) {
            console.info('Configuration Module initializing...');
            console.info('Configuration Module initialized.');
        },
    }
}