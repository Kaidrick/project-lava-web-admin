import Store from '@/store';
import Router from '@/router';

import siteModule from '@/modules/site';
import Configuration from "./configuration";
import MapControl from "@/modules/atlas/";

export default {
    namespaced: true,
    state: {
        webConfig: {
            host: 'localhost',
            port: 8080
        },

        configured: false
    },
    getters: {
        webConfig: state => state.webConfig,
        configured: state => state.configured
    },
    mutations: {
        setWebConfig: (state, webConfig) => state.webConfig = webConfig,
        setConfigured: (state, configured) => state.configured = configured
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        test(context) {
            console.log("test");

            context.commit('setConfigured', true);
        },

        // eslint-disable-next-line no-unused-vars
        initialize ({ dispatch }) {
            console.info('System initializing...');
            console.info('System initialized.');
            dispatch('initializeModule', siteModule);
            dispatch('initializeModule', Configuration);
            dispatch('initializeModule', MapControl);
        },
        initializeModule ({ dispatch }, module) {
            Store.registerModule(module.name, module.store);
            Router.addRoutes(module.routes);
            dispatch(module.name + '/initialize', null, { root: true });
        }
    }
}