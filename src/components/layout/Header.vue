<template>
  <nav class="header">
    <div class="container mx-auto flex items-center">
      <router-link to="/">
        <logo class="w-36"/>
      </router-link>
      <div aria-hidden="true" class="flex-1"></div>
      <div class="w-1/3">
        <header-search/>
      </div>
      <header-location-select class="ml-4"/>
      <router-link
        class="header__link font-bold ml-4"
        :to="{name: 'home', query: {modal: 'sign-in'}}">
        {{ $t('auth.signIn') }}
      </router-link>
      <span class="mx-1.5 font-bold">|</span>
      <router-link
        class="header__link"
        :to="{name: 'home', query: {modal: 'sign-up'}}">
        {{ $t('auth.signUp') }}
      </router-link>
    </div>
  </nav>
</template>

<script>
import Logo from '@/components/Logo.vue';
import HeaderSearch from '@/components/layout/HeaderSearch.vue';
import HeaderLocationSelect from '@/components/layout/HeaderLocationSelect.vue';

export default {
  name: 'Header',
  components: {
    HeaderLocationSelect,
    HeaderSearch,
    Logo,
  },
};
</script>

<style lang="scss">
.header {
  @apply px-4 lg:px-0 py-4 border-b border-gray-200;

  &__link {
    @apply block relative text-lg;
    &::after {
      @apply absolute left-0 bottom-0 w-full
      bg-black opacity-0 transition-opacity duration-300;
      content: "";
      height: 1px;
    }

    &:hover::after {
      @apply opacity-100;
    }
  }
}
</style>
