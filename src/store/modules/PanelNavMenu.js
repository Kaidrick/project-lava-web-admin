import axios from 'axios';

const state = {
    panelNavMenu: [
        {
            id: 1,
            title: 'title 1'
        },
        {
            id: 2,
            title: 'title 2'
        },
        {
            id: 3,
            title: 'title 3'
        },

    ]
};

const getters = {
    allPanelNavMenu: state => state.panelNavMenu,
};

const actions = {};

const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations
};