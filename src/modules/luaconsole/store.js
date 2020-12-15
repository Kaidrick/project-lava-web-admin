export default {
    namespaced: true,
    state: {
        debugEnvType: 3
    },
    getters: {
        debugEnvType: state => state.debugEnvType
    },
    mutations: {
        setDebugEnvType: (state, type) => state.debugEnvType = type
    },
    actions: {
        changeDebugEnvType(context, type) {
            console.log(type, typeof  type)
          context.commit('setDebugEnvType', type);
        },

        // eslint-disable-next-line no-unused-vars
        initialize ({ dispatch }) {
            console.info('AddonManager initializing...')
            console.info('AddonManager initialized.')
        },
    }
}