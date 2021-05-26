import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '@/store';
import getBrowserLanguage from '@/utils/locale';

Vue.use(VueI18n);

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys()
    .forEach((key) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i);
      if (matched && matched.length > 1) {
        const locale = matched[1];
        messages[locale] = locales(key);
      }
    });
  return messages;
}

const locale = store.state.i18n.locale || getBrowserLanguage() || process.env.VUE_APP_I18N_LOCALE || 'en';

export default new VueI18n({
  locale,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
});
