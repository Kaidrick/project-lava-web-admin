import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import i18n from './i18n';
import store from './store';

import system from '@/modules/system';
import websocket from "@/modules/system/websocket";
import util from "@/util";
// import {option as websocketOption} from './websocket.config';
import interceptorSetup from './interceptors';

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : '/api';
interceptorSetup();

Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(websocket);
Vue.use(util);

store.registerModule('system', system.store)
router.addRoutes(system.routes);
store.dispatch('system/initialize', null, { root: true })


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
