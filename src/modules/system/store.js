import Store from '@/store';
import Router from '@/router';

import siteModule from '@/modules/site';
import Configuration from "./configuration";
import MapControl from "@/modules/atlas/";
import dashboardModule from '@/modules/dashboard';
import AddonManager from "@/modules/addons";
import LuaDebugger from "@/modules/luaconsole";

import state from "./state";
import mutations from "./mutations";
import getters from "./getters";

import Wizard from "./action-wizard";

import Vue from 'vue';
import i18n from "@/i18n";

const vm = new Vue();

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions: {
        // actions for wizard run
        ...Wizard,

        // eslint-disable-next-line no-unused-vars
        test(context) {
            console.log("test");

            context.commit('setConfigured', true);
        },

        reset(context) {
            context.commit('setConfigured', false);
            vm.$wsDisconnect();
        },

        setWizardRun(context, isEnable) {
            context.commit('setWizardRun', isEnable);
            localStorage.setItem('wizardRun', isEnable);
        },

        updateUserName(context, username) {
            context.commit('setUserName', username);
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
            Router.options.routes.forEach(r => {
                let { name, path } = r;
                map.set(name, path);
            });
            context.commit('setSystemRouteMap', map);
        },

        updateSystemLocale(context, locale) {
            context.commit('setSystemLocale', locale);
            i18n.locale = locale;
            vm.$message.success(i18n.t("Current system locale is set to {0}.").format(locale));
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