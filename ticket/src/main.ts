import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import '../node_modules/ag-grid-community/dist/styles/ag-theme-material.css';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
