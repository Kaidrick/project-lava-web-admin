import Vuex from 'vuex';
import Vue from 'vue';
import PanelNavMenu from "@/views/PanelNavMenu";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        PanelNavMenu
    }
});