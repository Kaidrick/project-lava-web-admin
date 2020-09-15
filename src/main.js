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

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueAxios, axios);

store.registerModule('system', system.store)
router.addRoutes(system.routes);
store.dispatch('system/initialize', null, { root: true })


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
