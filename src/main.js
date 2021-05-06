import Vue from 'vue';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';
import '@/assets/css/global.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
