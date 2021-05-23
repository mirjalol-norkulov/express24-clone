import Vue from 'vue';

import '@/plugins/vue-leaflet';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';
// import '@/assets/css/global.scss';
import i18n from './i18n';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
