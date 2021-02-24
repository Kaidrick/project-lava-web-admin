import Store from '@/store';
import Router from '@/router';

import siteModule from '@/modules/site';
import Configuration from "./configuration";
import MapControl from "@/modules/atlas/";
import dashboardModule from '@/modules/dashboard';
import AddonManager from "@/modules/addons";
import LuaDebugger from "@/modules/luaconsole";

import router from "@/router";
import Vue from 'vue';

const vm = new Vue();

export default {
    namespaced: true,
    state: {
        webConfig: {
            host: 'localhost',
            port: 8080
        },

        configured: false,

        websocketConnected: false,

        systemRouteMap: [],

        dataServiceResource: ''
    },
    getters: {
        webConfig: state => state.webConfig,
        configured: state => state.configured,
        websocketConnected: state => state.websocketConnected,
        systemRouteMap: state => state.systemRouteMap,
        dataServiceResource: state => state.dataServiceResource,

        accessToken: () => {
            const token = localStorage.getItem('access_token')
            if (token === 'undefined') {
                localStorage.removeItem('access_token');
                return null;
            } else {
                return token;
            }
        },

        refreshToken: () => {
            const token = localStorage.getItem('refresh_token')
            if (token === 'undefined') {
                localStorage.removeItem('access_token');
                return null;
            } else {
                return token;
            }
        }
    },
    mutations: {
        setWebConfig: (state, webConfig) => state.webConfig = webConfig,
        setConfigured: (state, configured) => state.configured = configured,
        setWebsocketConnected: (state, websocketConnected) => state.websocketConnected = websocketConnected,
        setSystemRouteMap: (state, systemRouteMap) => state.systemRouteMap = systemRouteMap,
        setDataServiceResource: (state, dataServiceResource) => state.dataServiceResource = dataServiceResource,
        setAccessToken: (state, token) => {

            localStorage.setItem('access_token', token)
        },

        setRefreshToken: (state, token) => {
            localStorage.setItem('refresh_token', token)
        }
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        test(context) {
            console.log("test");

            context.commit('setConfigured', true);
        },

        reset(context) {
            context.commit('setConfigured', false);
            vm.$wsDisconnect();
        },

        updateAccessToken(context, token) {
            console.log(token, 'token')
            context.commit('setAccessToken', token);
        },

        updateRefreshToken(context, token) {
            console.log(token, 'refresh token');
            context.commit('setRefreshToken', token);
        },

        switchWebSocketConnected(context, boolean) {
            context.commit('setWebsocketConnected', boolean)
        },

        updateDataServiceResource(context, url) {
            context.commit('setDataServiceResource', url);
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