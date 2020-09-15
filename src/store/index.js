import Vuex from 'vuex';
import Vue from 'vue';
import ServerInfoPanel from "@/store/modules/ServerInfoPanel";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: [
        ServerInfoPanel
    ]
});