export default {
  namespaced: true,
  state: {
    locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  },
  mutations: {
    SET_LOCALE(state, value) {
      state.locale = value;
    },
  },
};
