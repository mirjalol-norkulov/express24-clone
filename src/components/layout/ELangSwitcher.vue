<template>
  <e-select v-model="$i18n.locale" :items="locales" item-key="code" item-label="name">
  </e-select>
</template>

<script>
import ESelect from '@/components/ui/ESelect.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'ELangSwitcher',
  components: {
    ESelect,
  },
  watch: {
    '$i18n.locale': {
      handler() {
        this.setLocale(this.$i18n.locale);
      },
    },
  },
  data() {
    return {
      locales: [
        {
          code: 'en',
          name: 'English',
        },
        {
          code: 'ru',
          name: 'Русский',
        },
        {
          code: 'uz',
          name: 'O\'zbekcha',
        },
      ],
    };
  },
  methods: {
    ...mapMutations({
      setLocale: 'i18n/SET_LOCALE',
    }),
  },
};
</script>

<style scoped>

</style>
