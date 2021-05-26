import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import i18n from './modules/i18n';

Vue.use(Vuex);

const persistedState = createPersistedState({
  key: 'express24-clone',
  paths: ['currentLocation', 'i18n.locale'],
});

export default new Vuex.Store({
  state: {
    currentLocation: undefined,
  },
  mutations: {
    SET_CURRENT_LOCATION(state, value) {
      state.currentLocation = value;
    },
  },
  actions: {},
  modules: {
    i18n,
  },
  plugins: [persistedState],
});
