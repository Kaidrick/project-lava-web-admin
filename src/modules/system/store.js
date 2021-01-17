import Store from '@/store';
import Router from '@/router';

import siteModule from '@/modules/site';
import Configuration from "./configuration";
import MapControl from "@/modules/atlas/";
import dashboardModule from '@/modules/dashboard';
import AddonManager from "@/modules/addons";
import LuaDebugger from "@/modules/luaconsole";

import router from "@/router";

export default {
    namespaced: true,
    state: {
        webConfig: {
            host: 'localhost',
            port: 8080
        },

        configured: false,

        websocketConnected: false,

        systemRouteMap: []
    },
    getters: {
        webConfig: state => state.webConfig,
        configured: state => state.configured,
        websocketConnected: state => state.websocketConnected,
        systemRouteMap: state => state.systemRouteMap
    },
    mutations: {
        setWebConfig: (state, webConfig) => state.webConfig = webConfig,
        setConfigured: (state, configured) => state.configured = configured,
        setWebsocketConnected: (state, websocketConnected) => state.websocketConnected = websocketConnected,
        setSystemRouteMap: (state, systemRouteMap) => state.systemRouteMap = systemRouteMap
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        test(context) {
            console.log("test");

            context.commit('setConfigured', true);
        },

        switchWebSocketConnected(context, boolean) {
            context.commit('setWebsocketConnected', boolean)
        },

        freshSystemRouteMap(context) {
            const map = new Map();
            router.options.routes.forEach(r => {
                let { name, path } = r;
                map.set(name, path);
            });
            context.commit('setSystemRouteMap', map);
        },

        // eslint-disable-next-line no-unused-vars
        initialize ({ dispatch }) {
            console.info('System initializing...');
            console.info('System initialized.');
            dispatch('initializeModule', siteModule);
            dispatch('initializeModule', Configuration);
            dispatch('initializeModule', MapControl);
            dispatch('initializeModule', dashboardModule);
            dispatch('initializeModule', AddonManager);
            dispatch('initializeModule', LuaDebugger);
        },
        initializeModule ({ dispatch }, module) {
            Store.registerModule(module.name, module.store);
            Router.addRoutes(module.routes);
            dispatch(module.name + '/initialize', null, { root: true });
        }
    }
}