import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const persistedState = createPersistedState({
  key: 'express24-clone',
  paths: ['currentLocation'],
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
  modules: {},
  plugins: [persistedState],
});
